const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp"] as const);
export type AvatarContentType = "image/png" | "image/jpeg" | "image/webp";

export const AVATAR_MAX_BYTES = 2 * 1024 * 1024;
export const AVATAR_BUCKET = "avatars";

const EXT: Record<AvatarContentType, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export function extensionForAvatarType(type: AvatarContentType) {
  return EXT[type];
}

export function sniffAvatarType(bytes: Uint8Array): AvatarContentType | null {
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

export function isAllowedAvatarMime(value: string): value is AvatarContentType {
  return ALLOWED.has(value as AvatarContentType);
}

export function avatarObjectPath(userId: string, type: AvatarContentType) {
  return `${userId}/avatar.${extensionForAvatarType(type)}`;
}

export function publicAvatarUrl(storagePath: string, version: number | string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return null;
  return `${base}/storage/v1/object/public/${AVATAR_BUCKET}/${storagePath}?v=${version}`;
}
