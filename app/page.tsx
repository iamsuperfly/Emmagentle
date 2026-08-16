import Link from "next/link";
import { StorefrontProductSections } from "@/components/StorefrontProductSections";
import { getBusinessSettings, getCategories, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, categories, featuredProducts, allProducts] = await Promise.all([
    getBusinessSettings(),
    getCategories(),
    getProducts({ featured: true }),
    getProducts(),
  ]);
  return (
    <>
      <section className="hero">
        <div className="shell hero-copy">
          <p className="eyebrow">Electrical & hardware supplies</p>
          <h1>Practical products for the work in front of you.</h1>
          <p>
            Browse EMMA GENTLE products and contact us directly when you need to confirm
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
      <StorefrontProductSections
        allProducts={allProducts}
        categories={categories}
        featuredProducts={featuredProducts}
        whatsappNumber={settings.whatsapp_number}
      />
    </>
  );
}
