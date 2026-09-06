import { supabase } from "@/lib/supabase";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

export function fileExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName === "jpeg") return "jpg";
  if (fromName && ["jpg", "png", "webp"].includes(fromName)) return fromName;
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

export function assertSafeImage(file: File) {
  if (file.size > MAX_SIZE) {
    throw new Error("Файл больше 5 МБ.");
  }
  const typeOk =
    ALLOWED_TYPES.includes(file.type) ||
    /\.(jpe?g|png|webp)$/i.test(file.name);
  if (!typeOk) {
    throw new Error("Допустимы только JPG, PNG и WEBP.");
  }
}

export async function uploadSiteMedia(
  path: string,
  file: File
): Promise<string> {
  if (!supabase) {
    throw new Error("Supabase не настроен.");
  }

  assertSafeImage(file);

  const ext = fileExtension(file);
  const safePath = path.replace(/[^a-zA-Z0-9/_-]/g, "-");
  const finalPath = safePath.endsWith(`.${ext}`)
    ? safePath
    : `${safePath}.${ext}`;

  const { error } = await supabase.storage
    .from("site-media")
    .upload(finalPath, file, {
      upsert: true,
      contentType: file.type || `image/${ext}`
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("site-media").getPublicUrl(finalPath);
  return data.publicUrl;
}
