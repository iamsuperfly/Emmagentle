import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { getBusinessSettings, getCategories, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, categories, featuredProducts, allProducts] = await Promise.all([
    getBusinessSettings(),
    getCategories(),
    getProducts({ featured: true }),
    getProducts(),
  ]);
  const featuredGroups = categories
    .map((category) => ({
      category,
      products: featuredProducts.filter((product) => product.category_id === category.id),
    }))
    .filter((group) => group.products.length > 0);

  return (
    <>
      <section className="hero">
        <div className="shell hero-copy">
          <p className="eyebrow">Electrical & hardware supplies</p>
          <h1>Practical products for the work in front of you.</h1>
          <p>
            Browse Emmanuel Enterprise products and contact us directly when you need to confirm
            availability or ask a question.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/products">
              Browse products
            </Link>
            <Link className="button button-secondary" href="/about">
              Contact the business
            </Link>
          </div>
        </div>
      </section>
      <div className="shell info-strip">
        <div>
          <p className="eyebrow">Hours</p>
          <p>{settings.opening_hours}</p>
        </div>
        <div>
          <p className="eyebrow">WhatsApp</p>
          <p>{settings.whatsapp_number}</p>
        </div>
        <div>
          <p className="eyebrow">Catalogue</p>
          <p>{categories.length} dynamic categories</p>
        </div>
      </div>
      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured products</p>
              <h2>Featured Products</h2>
            </div>
            <Link className="button button-secondary" href="/products">
              See all products
            </Link>
          </div>
          {featuredGroups.length ? (
            <div className="featured-product-groups">
              {featuredGroups.map(({ category, products }) => (
                <div className="featured-product-group" key={category.id}>
                  <div className="category-row-heading">
                    <h3>{category.name}</h3>
                    <Link href={`/categories/${category.slug}`}>View category →</Link>
                  </div>
                  <div className="featured-product-row" aria-label={`${category.name} featured products`}>
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        whatsappNumber={settings.whatsapp_number}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No featured products yet"
              message="Use the admin dashboard to add products and mark the ones you want visitors to see here."
            />
          )}
        </div>
      </section>
      <section className="section all-products-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Browse the catalogue</p>
              <h2>All Products</h2>
            </div>
            <Link className="button button-secondary" href="/products">
              View full catalogue
            </Link>
          </div>
          {allProducts.length ? (
            <div className="product-grid">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} whatsappNumber={settings.whatsapp_number} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No products yet"
              message="An administrator can add the first product from the dashboard."
            />
          )}
        </div>
      </section>
    </>
  );
}
