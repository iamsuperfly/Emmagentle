import { BUSINESS_DEFAULTS, BusinessSettings } from "./config";
import { Category, Product } from "./types";
import { isSupabaseConfigured } from "./supabase/env";
import { createSupabaseServerClient } from "./supabase/server";

const productSelect =
  "*, categories(id, name, slug, description, created_at, updated_at), product_images(id, product_id, storage_path, alt_text, sort_order, created_at)";

export async function getBusinessSettings(): Promise<BusinessSettings> {
  if (!isSupabaseConfigured()) {
    return {
      business_name: BUSINESS_DEFAULTS.businessName,
      whatsapp_number: BUSINESS_DEFAULTS.whatsappNumber,
      phone_number: BUSINESS_DEFAULTS.phoneNumber,
      opening_hours: BUSINESS_DEFAULTS.openingHours,
      address: BUSINESS_DEFAULTS.address,
      logo_path: BUSINESS_DEFAULTS.logoPath,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("business_settings").select("*").eq("id", 1).maybeSingle();
  return data ?? {
    business_name: BUSINESS_DEFAULTS.businessName,
    whatsapp_number: BUSINESS_DEFAULTS.whatsappNumber,
    phone_number: BUSINESS_DEFAULTS.phoneNumber,
    opening_hours: BUSINESS_DEFAULTS.openingHours,
    address: BUSINESS_DEFAULTS.address,
    logo_path: BUSINESS_DEFAULTS.logoPath,
  };
}

export async function getCategories() {
  if (!isSupabaseConfigured()) return [] as Category[];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("categories").select("*").order("name");
  const categories = (data ?? []) as Category[];
  return Promise.all(
    categories.map(async (category) => {
      const { count } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("category_id", category.id);
      return { ...category, product_count: count ?? 0 };
    }),
  );
}

export async function getProducts(options?: {
  search?: string;
  categorySlug?: string;
  categoryId?: string;
  featured?: boolean;
}) {
  if (!isSupabaseConfigured()) return [] as Product[];
  const supabase = await createSupabaseServerClient();
  const search = options?.search?.trim();
  let query = supabase.from("products").select(productSelect).order("created_at", { ascending: false });

  if (search) {
    const { data, error } = await supabase.rpc("search_products" as never, { search_term: search } as never);
    if (error) throw new Error(error.message);
    return (data ?? []) as Product[];
  }

  if (options?.categorySlug) {
    query = query.eq("categories.slug", options.categorySlug);
  }
  if (options?.categoryId) {
    query = query.eq("category_id", options.categoryId);
  }
  if (options?.featured !== undefined) {
    query = query.eq("featured", options.featured);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Product[];
}

export async function getProductBySlug(slug: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as Product | null;
}
