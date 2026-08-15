"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { StorefrontLoading } from "@/components/StorefrontLoading";
import { Category, Product } from "@/lib/types";

type Availability = "all" | "available";

type StorefrontProductSectionsProps = {
  categories: Category[];
  featuredProducts: Product[];
  allProducts: Product[];
  whatsappNumber?: string;
};

type ProductSectionProps = {
  title: string;
  eyebrow: string;
  products: Product[];
  categories: Category[];
  featured: boolean;
  whatsappNumber?: string;
};

function AvailabilityFilter({
  sectionTitle,
  value,
  onChange,
}: {
  sectionTitle: string;
  value: Availability;
  onChange: (value: Availability) => void;
}) {
  return (
    <div className="availability-filter" role="group" aria-label={`${sectionTitle} availability`}>
      {(["all", "available"] as const).map((option) => (
        <button
          aria-pressed={value === option}
          className={value === option ? "is-selected" : ""}
          key={option}
          onClick={() => onChange(option)}
          type="button"
        >
          {option === "all" ? "All" : "Available"}
        </button>
      ))}
    </div>
  );
}

function ProductSection({
  title,
  eyebrow,
  products,
  categories,
  featured,
  whatsappNumber,
}: ProductSectionProps) {
  const [availability, setAvailability] = useState<Availability>("all");
  const [isPending, startTransition] = useTransition();
  const visibleProducts =
    availability === "available"
      ? products.filter((product) => product.stock_status === "in_stock")
      : products;
  const featuredGroups = featured
    ? categories
        .map((category) => ({
          category,
          products: visibleProducts.filter((product) => product.category_id === category.id),
        }))
        .filter((group) => group.products.length > 0)
    : [];

  function handleAvailabilityChange(value: Availability) {
    if (value === availability) return;
    startTransition(() => setAvailability(value));
  }

  if (isPending) {
    return (
      <StorefrontLoading
        label={`Updating ${title.toLowerCase()}`}
        message="Refreshing the products shown here."
      />
    );
  }

  return (
    <section className={`section${featured ? "" : " all-products-section"}`} aria-busy={isPending}>
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
          <div className="section-heading-tools">
            <AvailabilityFilter
              sectionTitle={title}
              value={availability}
              onChange={handleAvailabilityChange}
            />
            <Link className="button button-secondary" href="/products">
              {featured ? "See all products" : "View full catalogue"}
            </Link>
          </div>
        </div>
        {featured ? (
          featuredGroups.length ? (
            <div className="featured-product-groups">
              {featuredGroups.map(({ category, products: groupProducts }) => (
                <div className="featured-product-group" key={category.id}>
                  <div className="category-row-heading">
                    <h3>{category.name}</h3>
                    <Link href={`/categories/${category.slug}`}>View category →</Link>
                  </div>
                  <div className="featured-product-row" aria-label={`${category.name} featured products`}>
                    {groupProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        whatsappNumber={whatsappNumber}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title={availability === "available" ? "No available featured products" : "No featured products yet"}
              message={
                availability === "available"
                  ? "Try All to see every featured product."
                  : "Use the admin dashboard to add products and mark the ones you want visitors to see here."
              }
            />
          )
        ) : visibleProducts.length ? (
          <div className="product-grid all-products-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                compactOnMobile
                key={product.id}
                product={product}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={availability === "available" ? "No available products" : "No products yet"}
            message={
              availability === "available"
                ? "Try All to browse the complete catalogue."
                : "An administrator can add the first product from the dashboard."
            }
          />
        )}
      </div>
    </section>
  );
}

export function StorefrontProductSections({
  categories,
  featuredProducts,
  allProducts,
  whatsappNumber,
}: StorefrontProductSectionsProps) {
  return (
    <>
      <ProductSection
        categories={categories}
        eyebrow="Featured products"
        featured
        products={featuredProducts}
        title="Featured Products"
        whatsappNumber={whatsappNumber}
      />
      <ProductSection
        categories={categories}
        eyebrow="Browse the catalogue"
        featured={false}
        products={allProducts}
        title="All Products"
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}