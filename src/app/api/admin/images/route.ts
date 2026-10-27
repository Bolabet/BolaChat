import { isMarketCode } from "@/config/markets";
import { isAuthorized, unauthorized } from "@/lib/admin/auth";
import { IMAGE_TYPES, getStore, newImagePath, notConfigured, storeFailed } from "@/lib/admin/store";

/**
 * POST /api/admin/images?market=zm (multipart, field "file")
 * Stages an image and returns its public path plus the staging handle the
 * editor sends back on save. Nothing is published until the save.
 */

// Stays under the ~4.5 MB request limit of serverless hosts.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  const market = new URL(request.url).searchParams.get("market") ?? "";
  if (!isMarketCode(market)) return Response.json({ error: "Unknown market" }, { status: 400 });
  const store = getStore();
  if (!store) return notConfigured();

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }
  if (!IMAGE_TYPES[file.type]) {
    return Response.json({ error: "Use a JPG, PNG or WebP image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Image is larger than 4 MB" }, { status: 400 });
  }

  const { repoPath, publicPath } = newImagePath(market, file.type);
  try {
    const staged = await store.stageImage(repoPath, Buffer.from(await file.arrayBuffer()));
    return Response.json({ path: publicPath, staged });
  } catch (error) {
    return storeFailed(error);
  }
}
