import { supabase } from "@/lib/supabase";

export async function uploadSiteMedia(
  path: string,
  file: File
): Promise<string> {
  if (!supabase) {
    throw new Error("Supabase не настроен.");
  }

  const { error } = await supabase.storage
    .from("site-media")
    .upload(path, file, { upsert: true });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  return data.publicUrl;
}

export function fileExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName;
  return "jpg";
}
