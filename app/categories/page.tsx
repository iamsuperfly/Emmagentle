import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <section className="section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">Catalogue structure</p>
          <h1>Categories</h1>
          <p>Categories are managed from the admin dashboard and are never fixed in the frontend.</p>
        </div>
        {categories.length ? (
          <div className="category-grid">
            {categories.map((category) => (
              <Link className="category-card" key={category.id} href={`/categories/${category.slug}`}>
                <p className="eyebrow">{category.product_count ?? 0} products</p>
                <h3>{category.name}</h3>
                <p>{category.description || "Browse products in this category."}</p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="No categories yet" message="An administrator can add the first category from the dashboard." />
        )}
      </div>
    </section>
  );
}