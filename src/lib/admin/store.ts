import { createHash, randomBytes } from "node:crypto";

/**
 * Where the admin panel reads and writes content.
 *
 * - Production: the GitHub repo (ADMIN_GITHUB_TOKEN, ADMIN_GITHUB_REPO,
 *   ADMIN_GITHUB_BRANCH).
 *   Each "Save & publish" is one commit, which triggers the normal deploy.
 * - Local dev without ADMIN_GITHUB_TOKEN: the files in this working copy.
 *
 * Image uploads are staged first (a git blob, or a file on disk locally) and
 * only become part of the site when the content that references them is saved.
 */

export interface StoredFile {
  content: string;
  /** Version marker used to detect someone else saving in the meantime. */
  sha: string;
}

export interface StagedImage {
  /** Repo path, e.g. "public/images/powerplays/zm-1730000000-ab12.jpg". */
  repoPath: string;
  /** GitHub blob sha (empty for the local store, where the file is already written). */
  blobSha: string;
}

export class ConflictError extends Error {}

interface Store {
  read(path: string): Promise<StoredFile>;
  stageImage(repoPath: string, data: Buffer): Promise<StagedImage>;
  write(
    path: string,
    content: string,
    expectedSha: string,
    images: StagedImage[],
    message: string
  ): Promise<void>;
}

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** Builds a unique repo path + public URL for an uploaded image. */
export function newImagePath(prefix: string, mimeType: string) {
  const ext = IMAGE_TYPES[mimeType];
  const name = `${prefix}-${Date.now()}-${randomBytes(3).toString("hex")}.${ext}`;
  return {
    repoPath: `public/images/powerplays/${name}`,
    publicPath: `/images/powerplays/${name}`,
  };
}

export const STAGED_IMAGE_PATH = /^public\/images\/powerplays\/[a-z0-9-]+\.(jpg|png|webp)$/;

function contentHash(content: string): string {
  return createHash("sha1").update(content).digest("hex");
}

/* ---------------------------------------------------------------- GitHub */

function githubStore(token: string, repo: string, branch: string): Store {
  const api = `https://api.github.com/repos/${repo}`;

  async function gh<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${api}${path}`, {
      ...init,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
      },
      cache: "no-store",
    });
    if (!response.ok) {
      const detail = await response.text();
      const error = new Error(`GitHub ${response.status}: ${detail.slice(0, 300)}`);
      if (response.status === 409 || response.status === 422) {
        throw Object.assign(error, { status: response.status });
      }
      throw error;
    }
    return response.json() as Promise<T>;
  }

  return {
    async read(path) {
      const file = await gh<{ content: string; sha: string }>(
        `/contents/${path}?ref=${encodeURIComponent(branch)}`
      );
      return { content: Buffer.from(file.content, "base64").toString("utf8"), sha: file.sha };
    },

    async stageImage(repoPath, data) {
      const blob = await gh<{ sha: string }>("/git/blobs", {
        method: "POST",
        body: JSON.stringify({ content: data.toString("base64"), encoding: "base64" }),
      });
      return { repoPath, blobSha: blob.sha };
    },

    async write(path, content, expectedSha, images, message) {
      const current = await this.read(path);
      if (current.sha !== expectedSha) throw new ConflictError();

      const ref = await gh<{ object: { sha: string } }>(
        `/git/ref/heads/${encodeURIComponent(branch)}`
      );
      const parent = await gh<{ tree: { sha: string } }>(
        `/git/commits/${ref.object.sha}`
      );
      const tree = await gh<{ sha: string }>("/git/trees", {
        method: "POST",
        body: JSON.stringify({
          base_tree: parent.tree.sha,
          tree: [
            { path, mode: "100644", type: "blob", content },
            ...images.map((image) => ({
              path: image.repoPath,
              mode: "100644",
              type: "blob",
              sha: image.blobSha,
            })),
          ],
        }),
      });
      const commit = await gh<{ sha: string }>("/git/commits", {
        method: "POST",
        body: JSON.stringify({ message, tree: tree.sha, parents: [ref.object.sha] }),
      });
      try {
        await gh(`/git/refs/heads/${encodeURIComponent(branch)}`, {
          method: "PATCH",
          body: JSON.stringify({ sha: commit.sha, force: false }),
        });
      } catch (error) {
        // Not a fast-forward: someone pushed between our read and our write.
        if ((error as { status?: number }).status === 422) throw new ConflictError();
        throw error;
      }
    },
  };
}

/* ----------------------------------------------------------------- Local */

function localStore(): Store {
  const root = process.cwd();

  return {
    async read(path) {
      const { readFile } = await import("node:fs/promises");
      const content = await readFile(/* turbopackIgnore: true */ `${root}/${path}`, "utf8");
      return { content, sha: contentHash(content) };
    },

    async stageImage(repoPath, data) {
      const { writeFile } = await import("node:fs/promises");
      await writeFile(/* turbopackIgnore: true */ `${root}/${repoPath}`, data);
      return { repoPath, blobSha: "" };
    },

    async write(path, content, expectedSha) {
      const { writeFile } = await import("node:fs/promises");
      const current = await this.read(path);
      if (current.sha !== expectedSha) throw new ConflictError();
      await writeFile(/* turbopackIgnore: true */ `${root}/${path}`, content);
    },
  };
}

export function getStore(): Store | null {
  const token = process.env.ADMIN_GITHUB_TOKEN;
  if (token) {
    return githubStore(
      token,
      process.env.ADMIN_GITHUB_REPO || "Bolabet/BolaChat",
      process.env.ADMIN_GITHUB_BRANCH || "main"
    );
  }
  return process.env.NODE_ENV === "development" ? localStore() : null;
}

export function notConfigured(): Response {
  return Response.json(
    { error: "Publishing is not configured (ADMIN_GITHUB_TOKEN is missing)." },
    { status: 503 }
  );
}

/** Turns an unexpected store failure (e.g. a bad GitHub token) into a readable error. */
export function storeFailed(error: unknown): Response {
  console.error(error);
  return Response.json(
    { error: `Could not reach the content store - ${(error as Error).message}` },
    { status: 502 }
  );
}
