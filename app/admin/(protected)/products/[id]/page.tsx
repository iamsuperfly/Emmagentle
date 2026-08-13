import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/auth";
import { getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: product }, categories] = await Promise.all([
    supabase.from("products").select("*, categories(*), product_images(*)").eq("id", id).maybeSingle(),
    getCategories(),
  ]);
  if (!product) notFound();

  return (
    <>
      <div className="admin-title-row">
        <div>
          <p className="eyebrow">Catalogue management</p>
          <h1>Edit product</h1>
        </div>
        <Link className="button button-secondary" href="/admin/products">Back to products</Link>
      </div>
      <ProductForm product={product} categories={categories} />
    </>
  );
}