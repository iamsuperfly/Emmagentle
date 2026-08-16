import Link from "next/link";
import { formatNaira } from "@/lib/currency";
import { getPublicImageUrl } from "@/lib/images";
import { Product } from "@/lib/types";
import { whatsappHref } from "@/lib/whatsapp";

function statusLabel(status: Product["stock_status"]) {
  if (status === "out_of_stock") return "Out of stock";
  if (status === "on_request") return "Confirm availability";
  return "Available";
}

export function ProductCard({
  compactOnMobile = false,
  product,
  whatsappNumber,
}: {
  compactOnMobile?: boolean;
  product: Product;
  whatsappNumber?: string;
}) {
  const image = product.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0];
  const imageUrl = image ? getPublicImageUrl(image.storage_path) : null;
  const statusClass = product.stock_status === "out_of_stock"
    ? "status status-out"
    : product.stock_status === "on_request"
      ? "status status-request"
      : "status";

  return (
    <article className={`product-card${compactOnMobile ? " product-card-compact-mobile" : ""}`}>
      <Link className="product-image" href={`/products/${product.slug}`}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={image?.alt_text || product.name} />
        ) : (
          <span className="placeholder-image">Product image to be added</span>
        )}
      </Link>
      <div className="product-card-body">
        <p className="eyebrow">{product.categories?.name || "Electrical & hardware"}</p>
        <h3>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-price">{formatNaira(product.price)}</p>
        <p>{product.description || "Product details will be added soon."}</p>
        <span className={statusClass}>{statusLabel(product.stock_status)}</span>
        <div className="button-row">
          <Link className="button button-secondary" href={`/products/${product.slug}`}>
            Details
          </Link>
          <a className="button button-primary" href={whatsappHref(product.name, whatsappNumber)} target="_blank" rel="noreferrer">
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}