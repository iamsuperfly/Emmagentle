import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();
  const [{ count: products }, { count: categories }, { count: featured }, { count: unavailable }] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("featured", true),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("stock_status", "out_of_stock"),
  ]);

  const stats = [
    ["Products", products ?? 0, "/admin/products"],
    ["Categories", categories ?? 0, "/admin/categories"],
    ["Featured", featured ?? 0, "/admin/products"],
    ["Out of stock", unavailable ?? 0, "/admin/products"],
  ];

  return (
    <>
      <div className="admin-title-row">
        <div>
          <p className="eyebrow">Dashboard overview</p>
          <h1>Keep the catalogue current.</h1>
        </div>
        <Link className="button button-primary" href="/admin/products/new">Add product</Link>
      </div>
      <div className="category-grid">
        {stats.map(([label, value, href]) => (
          <Link className="category-card" key={label} href={String(href)}>
            <p className="eyebrow">{label}</p>
            <h2>{value}</h2>
          </Link>
        ))}
      </div>
      <div className="panel" style={{ marginTop: "1rem" }}>
        <p className="eyebrow">Foundation checklist</p>
        <h2>Ready for content entry</h2>
        <p>
          Add categories first, then create products and upload images. Public pages update from
          Supabase automatically after each change.
        </p>
      </div>
    </>
  );
}