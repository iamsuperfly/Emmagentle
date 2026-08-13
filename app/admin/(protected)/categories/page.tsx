import { CategoryForm } from "@/components/admin/CategoryForm";
import { requireAdmin } from "@/lib/auth";
import { getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const categories = await getCategories();

  return (
    <>
      <div className="admin-title-row">
        <div>
          <p className="eyebrow">Catalogue structure</p>
          <h1>Categories</h1>
        </div>
      </div>
      {params.error ? <p className="error-message">{params.error}</p> : null}
      <div className="panel">
        <p className="eyebrow">Create category</p>
        <p>Categories are database records, so future additions do not require a code change.</p>
        <CategoryForm />
      </div>
      <div style={{ marginTop: "1rem" }}>
        {categories.map((category) => (
          <CategoryForm key={category.id} category={category} />
        ))}
        {!categories.length ? <p>No categories yet.</p> : null}
      </div>
    </>
  );
}