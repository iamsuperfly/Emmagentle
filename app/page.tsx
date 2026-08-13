import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { getBusinessSettings, getCategories, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, categories, products] = await Promise.all([
    getBusinessSettings(),
    getCategories(),
    getProducts({ featured: true }),
  ]);

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
              <h2>Start with what is available.</h2>
            </div>
            <Link className="button button-secondary" href="/products">
              See all products
            </Link>
          </div>
          {products.length ? (
            <div className="product-grid">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} whatsappNumber={settings.whatsapp_number} />
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
    </>
  );
}