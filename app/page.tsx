import Link from "next/link";
import { StorefrontProductSections } from "@/components/StorefrontProductSections";
import { getBusinessSettings, getCategories, getProducts } from "@/lib/data";
import { IconClock, IconMessageCircle } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, categories, featuredProducts, allProducts] = await Promise.all([
    getBusinessSettings(),
    getCategories(),
    getProducts({ featured: true }),
    getProducts(),
  ]);
  const whatsappDigits = settings.whatsapp_number.replace(/\D/g, "");
  const categoryLabel =
    categories.length === 1 ? "1 category" : `${categories.length} categories`;

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
            <a
              className="button button-secondary"
              href={`https://wa.me/${whatsappDigits}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp the shop
            </a>
          </div>
        </div>
      </section>
      <div className="shell info-strip">
        <div>
          <p className="eyebrow"><IconClock /> Hours</p>
          <p>{settings.opening_hours}</p>
        </div>
        <div>
          <p className="eyebrow"><IconMessageCircle /> WhatsApp</p>
          <p>{settings.whatsapp_number}</p>
        </div>
        <div>
          <p className="eyebrow">Catalogue</p>
          <p>{categoryLabel}</p>
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
