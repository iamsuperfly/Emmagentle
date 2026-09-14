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
          <p className="eyebrow">Dashboard</p>
          <h1>Catalogue desk</h1>
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
      <div className="panel foundation-checklist">
        <p className="eyebrow">Desk checklist</p>
        <h2>Keep listings accurate</h2>
        <p>
          Add categories first, then products and photos. Public pages pick up each save. Mark
          out-of-stock items instead of leaving stale prices.
        </p>
      </div>
    </>
  );
}
