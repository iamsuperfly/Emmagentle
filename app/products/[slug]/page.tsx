import Link from "next/link";
import { notFound } from "next/navigation";
import { formatNaira } from "@/lib/currency";
import { getBusinessSettings, getProductBySlug } from "@/lib/data";
import { getPublicImageUrl } from "@/lib/images";
import { Product } from "@/lib/types";
import { whatsappHref } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

function statusLabel(status: Product["stock_status"]) {
  if (status === "out_of_stock") return "Out of stock";
  if (status === "on_request") return "Confirm availability";
  return "Available";
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProductBySlug(slug), getBusinessSettings()]);
  if (!product) notFound();

  const image = product.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0];
  const imageUrl = image ? getPublicImageUrl(image.storage_path) : null;
  const statusClass = product.stock_status === "out_of_stock"
    ? "status status-out"
    : product.stock_status === "on_request"
      ? "status status-request"
      : "status";

  return (
    <section className="shell detail-layout">
      <div className="product-image detail-image">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={image?.alt_text || product.name} />
        ) : (
          <span className="placeholder-image">Product image to be added</span>
        )}
      </div>
      <div className="detail-copy">
        <p className="eyebrow">{product.categories?.name || "Electrical & hardware"}</p>
        <h1>{product.name}</h1>
        <p className={`product-price product-price-detail${product.price === null ? " product-price-unavailable" : ""}`}>
          {formatNaira(product.price)}
        </p>
        <p className="price-note">Prices may change without prior notice.</p>
        <span className={statusClass}>{statusLabel(product.stock_status)}</span>
        <p className="description">{product.description || "Product details will be added soon."}</p>
        <div className="button-row">
          <a
            className="button button-primary whatsapp-button"
            href={whatsappHref(product.name, settings.whatsapp_number)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ask about ${product.name} on WhatsApp`}
          >
            WhatsApp
          </a>
          <Link className="button button-secondary" href="/products">← Back to products</Link>
        </div>
      </div>
    </section>
  );
}