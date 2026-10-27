import { isMarketCode } from "@/config/markets";
import { powerPlaysFilePath } from "@/content/powerplays";
import { isAuthorized, unauthorized } from "@/lib/admin/auth";
import {
  ConflictError,
  STAGED_IMAGE_PATH,
  getStore,
  notConfigured,
  storeFailed,
  type StagedImage,
} from "@/lib/admin/store";
import { parsePowerPlaysContent } from "@/types/powerplays";

/**
 * GET  /api/admin/powerplays?market=zm  -> { content, sha }
 * PUT  /api/admin/powerplays?market=zm  { content, sha, images } -> commits it
 *
 * Reads always come from the store (GitHub), not the deployed build, so the
 * editor shows the latest saved version even before its deploy finishes.
 */

function marketFrom(request: Request) {
  const code = new URL(request.url).searchParams.get("market") ?? "";
  return isMarketCode(code) ? code : null;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  const market = marketFrom(request);
  if (!market) return Response.json({ error: "Unknown market" }, { status: 400 });
  const store = getStore();
  if (!store) return notConfigured();

  try {
    const file = await store.read(powerPlaysFilePath(market));
    return Response.json({ content: JSON.parse(file.content), sha: file.sha });
  } catch (error) {
    return storeFailed(error);
  }
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  const market = marketFrom(request);
  if (!market) return Response.json({ error: "Unknown market" }, { status: 400 });
  const store = getStore();
  if (!store) return notConfigured();

  const body = (await request.json().catch(() => null)) as {
    content?: unknown;
    sha?: unknown;
    images?: unknown;
  } | null;
  if (!body || typeof body.sha !== "string") {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  let content;
  try {
    content = parsePowerPlaysContent(body.content);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }

  // Only commit staged images that the saved content actually uses.
  const used = new Set(
    [content.backgroundImage, ...content.items.map((item) => item.image)]
      .filter(Boolean)
      .map((path) => `public${path}`)
  );
  const images = (Array.isArray(body.images) ? body.images : []).filter(
    (image): image is StagedImage =>
      typeof image?.repoPath === "string" &&
      typeof image?.blobSha === "string" &&
      STAGED_IMAGE_PATH.test(image.repoPath) &&
      used.has(image.repoPath)
  );

  const json = `${JSON.stringify(content, null, 2)}\n`;
  const count = content.items.length;
  try {
    await store.write(
      powerPlaysFilePath(market),
      json,
      body.sha,
      images,
      `PowerPlays (${market}): ${count} ${count === 1 ? "play" : "plays"} via admin`
    );
  } catch (error) {
    if (error instanceof ConflictError) {
      return Response.json(
        { error: "Someone else saved changes since you loaded this page. Reload to get the latest version." },
        { status: 409 }
      );
    }
    return storeFailed(error);
  }

  try {
    const saved = await store.read(powerPlaysFilePath(market));
    return Response.json({ content, sha: saved.sha });
  } catch (error) {
    return storeFailed(error);
  }
}
