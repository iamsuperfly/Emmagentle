import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "../actions";

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { adminUser } = await requireAdmin();
  return (
    <div className="admin-shell shell">
      <div className="admin-layout">
        <aside className="admin-sidebar" aria-label="Admin navigation">
          <p className="eyebrow">Admin area</p>
          <strong>{adminUser.display_name || "Administrator"}</strong>
          <Link href="/admin">Overview</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/categories">Categories</Link>
          <Link href="/admin/settings">Business settings</Link>
          <form action={signOut}>
            <button className="button-link" type="submit">Log out</button>
          </form>
        </aside>
        <section className="admin-main">{children}</section>
      </div>
    </div>
  );
}