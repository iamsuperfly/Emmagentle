export function getPublicImageUrl(storagePath: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl || !storagePath) return null;
  return `${baseUrl}/storage/v1/object/public/product-images/${storagePath}`;
}