export const EXHIBITOR_LOGO_MAX_BYTES = 5 * 1024 * 1024;
export const EXHIBITOR_LOGO_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
export type UploadedExhibitorLogo = { url: string; publicId: string };

export function validateExhibitorLogo(file: { type: string; size: number }): string | null {
  if (!EXHIBITOR_LOGO_TYPES.includes(file.type)) return "Choose a PNG, JPG, WEBP or GIF image.";
  if (!file.size) return "The selected image is empty.";
  if (file.size > EXHIBITOR_LOGO_MAX_BYTES) return "The company logo must be 5 MB or smaller.";
  return null;
}

export function getExhibitorLogoUrl(data: { logoUrl?: unknown; metadata?: unknown }): string {
  if (typeof data.logoUrl === "string" && data.logoUrl.trim()) return data.logoUrl;
  let metadata = data.metadata;
  if (typeof metadata === "string") {
    try { metadata = JSON.parse(metadata); } catch { return ""; }
  }
  if (metadata && typeof metadata === "object" && "logoUrl" in metadata && typeof metadata.logoUrl === "string") return metadata.logoUrl;
  return "";
}
