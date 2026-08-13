"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { ActionState } from "@/lib/types";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function validImage(file: FormDataEntryValue | null): file is File {
  return file instanceof File && file.size > 0;
}

async function uniqueSlug(supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"], name: string, id?: string) {
  const base = slugify(name) || `product-${Date.now()}`;
  let candidate = base;
  for (let index = 2; index < 100; index += 1) {
    const query = supabase.from("products").select("id").eq("slug", candidate);
    const { data } = id
      ? await query.neq("id", id).maybeSingle()
      : await query.maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${index}`;
  }
  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}

export async function signOut() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveCategory(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const name = text(formData, "name");
  const description = text(formData, "description");
  if (!name) return { error: "Category name is required." };

  const payload = { name, slug: slugify(name), description: description || null };
  const result = id
    ? await supabase.from("categories").update(payload).eq("id", id)
    : await supabase.from("categories").insert(payload);
  if (result.error) return { error: result.error.message };

  revalidatePath("/categories");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;

  const { count } = await supabase.from("products").select("id", { count: "exact", head: true }).eq("category_id", id);
  if (count && count > 0) {
    redirect(`/admin/categories?error=${encodeURIComponent("Reassign the products in this category before deleting it.")}`);
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) redirect(`/admin/categories?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/categories");
  revalidatePath("/products");
  redirect("/admin/categories");
}

export async function saveProduct(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const name = text(formData, "name");
  const description = text(formData, "description");
  const categoryId = text(formData, "category_id") || null;
  const priceValue = text(formData, "price");
  const status = text(formData, "stock_status");
  const featured = formData.get("featured") === "on";
  const image = formData.get("image");

  if (!name) return { error: "Product name is required." };
  if (!["in_stock", "out_of_stock", "on_request"].includes(status)) {
    return { error: "Choose a valid availability status." };
  }
  if (priceValue && !Number.isFinite(Number(priceValue))) return { error: "Price must be a valid number." };
  if (validImage(image) && (!image.type.startsWith("image/") || image.size > 5 * 1024 * 1024)) {
    return { error: "Images must be an image file smaller than 5 MB." };
  }

  const payload = {
    name,
    description,
    category_id: categoryId,
    price: priceValue ? Number(priceValue) : null,
    stock_status: status as "in_stock" | "out_of_stock" | "on_request",
    featured,
    slug: await uniqueSlug(supabase, name, id || undefined),
  };

  const result = id
    ? await supabase.from("products").update(payload).eq("id", id).select("id").single()
    : await supabase.from("products").insert(payload).select("id").single();
  if (result.error || !result.data) return { error: result.error?.message || "Could not save product." };

  if (validImage(image)) {
    const safeFileName = image.name.toLowerCase().replace(/[^a-z0-9.-]/g, "-");
    const path = `${result.data.id}/${crypto.randomUUID()}-${safeFileName}`;
    const upload = await supabase.storage.from("product-images").upload(path, image, {
      cacheControl: "3600",
      upsert: false,
      contentType: image.type,
    });
    if (upload.error) return { error: upload.error.message };

    const oldImages = id
      ? await supabase.from("product_images").select("id, storage_path").eq("product_id", result.data.id)
      : { data: [] };
    const imageInsert = await supabase.from("product_images").insert({
      product_id: result.data.id,
      storage_path: path,
      alt_text: name,
      sort_order: 0,
    });
    if (imageInsert.error) return { error: imageInsert.error.message };

    if (oldImages.data?.length) {
      await supabase.storage.from("product-images").remove(oldImages.data.map((item) => item.storage_path));
      await supabase.from("product_images").delete().eq("product_id", result.data.id).neq("storage_path", path);
    }
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${payload.slug}`);
  revalidatePath("/categories");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;

  const { data: images } = await supabase.from("product_images").select("storage_path").eq("product_id", id);
  if (images?.length) {
    await supabase.storage.from("product-images").remove(images.map((image) => image.storage_path));
  }
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) redirect(`/admin/products?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function saveBusinessSettings(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const payload = {
    id: 1,
    business_name: text(formData, "business_name"),
    whatsapp_number: text(formData, "whatsapp_number"),
    phone_number: text(formData, "phone_number"),
    opening_hours: text(formData, "opening_hours"),
    address: text(formData, "address"),
    logo_path: text(formData, "logo_path"),
  };
  if (!payload.business_name || !payload.whatsapp_number) {
    return { error: "Business name and WhatsApp number are required." };
  }
  const { error } = await supabase.from("business_settings").upsert(payload);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/admin/settings");
  return { success: "Business settings saved." };
}