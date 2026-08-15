import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { getBusinessSettings, getCategories, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const search = params.q?.trim() || "";
  const [settings, categories, products] = await Promise.all([
    getBusinessSettings(),
    getCategories(),
    getProducts({ search }),
  ]);

  return (
    <section className="section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">Product catalogue</p>
          <h1>{search ? `Search results for “${search}”` : "Products"}</h1>
          <p>Search the live catalogue by product name, description, or category.</p>
        </div>
        <form className="search-bar" action="/products" role="search">
          <input name="q" defaultValue={search} placeholder="Try bulb, solar, socket, 50w…" aria-label="Search products" />
          <button className="button button-primary" type="submit">
            <svg className="button-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
            Search
          </button>
          {search ? <Link className="button button-secondary" href="/products">Clear</Link> : null}
        </form>
        {categories.length ? (
          <div className="button-row" style={{ marginTop: 0, marginBottom: "1.5rem" }}>
            <span className="eyebrow">Browse categories</span>
            {categories.map((category) => (
              <Link className="button button-secondary" key={category.id} href={`/categories/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </div>
        ) : null}
        {products.length ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} whatsappNumber={settings.whatsapp_number} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={search ? "No matching products" : "The catalogue is empty"}
            message={
              search
                ? "Try a broader search term or browse a category."
                : "Products added by an administrator will appear here."
            }
          />
        )}
      </div>
    </section>
  );
}