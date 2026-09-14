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
  const whatsappDigits = settings.whatsapp_number.replace(/\D/g, "");
  const categoryLabel =
    categories.length === 1 ? "1 category in stock" : `${categories.length} categories in stock`;

  return (
    <>
      <section className="hero">
        <div className="shell hero-copy">
          <p className="eyebrow">Emmanuel Enterprise · Uli, Anambra</p>
          <h1>Electrical and hardware stock, priced to check before you come.</h1>
          <p>
            Browse what is listed, then confirm price and availability on WhatsApp. This is a
            working catalogue, not an online checkout.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/products">
              Open the catalogue
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
          <p className="eyebrow">Hours</p>
          <p>{settings.opening_hours}</p>
        </div>
        <div>
          <p className="eyebrow">WhatsApp</p>
          <p>{settings.whatsapp_number}</p>
        </div>
        <div>
          <p className="eyebrow">On the shelf</p>
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
