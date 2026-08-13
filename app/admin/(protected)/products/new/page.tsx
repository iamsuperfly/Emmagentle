import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/auth";
import { getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await getCategories();
  return (
    <>
      <div className="admin-title-row">
        <div>
          <p className="eyebrow">Catalogue management</p>
          <h1>Add product</h1>
        </div>
        <Link className="button button-secondary" href="/admin/products">Back to products</Link>
      </div>
      <ProductForm categories={categories} />
    </>
  );
}