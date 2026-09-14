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
          <p className="eyebrow">Browse by aisle</p>
          <h1>Categories</h1>
          <p>Open a group to see the stock currently listed under it.</p>
        </div>
        {categories.length ? (
          <div className="category-grid">
            {categories.map((category) => (
              <Link className="category-card" key={category.id} href={`/categories/${category.slug}`}>
                <p className="eyebrow">{category.product_count ?? 0} listed</p>
                <h3>{category.name}</h3>
                <p>{category.description || "Open this aisle."}</p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="No categories yet" message="Add the first aisle from the admin dashboard." />
        )}
      </div>
    </section>
  );
}
