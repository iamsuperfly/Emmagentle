import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { getBusinessSettings, getCategories, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [categories, settings] = await Promise.all([getCategories(), getBusinessSettings()]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const products = await getProducts({ categoryId: category.id });

  return (
    <section className="section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">Category</p>
          <h1>{category.name}</h1>
          <p>{category.description || "Products assigned to this category."}</p>
          <Link className="button button-secondary" href="/categories">All categories</Link>
        </div>
        {products.length ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} whatsappNumber={settings.whatsapp_number} />
            ))}
          </div>
        ) : (
          <EmptyState title="No products in this category" message="An administrator can assign products here from the dashboard." />
        )}
      </div>
    </section>
  );
}