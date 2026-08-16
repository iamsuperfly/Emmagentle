import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "../actions";

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { adminUser } = await requireAdmin();
  return (
    <div className="admin-shell shell">
      <MobileMenu
        className="admin-mobile-menu"
        items={[
          { href: "/admin", label: "Overview" },
          { href: "/admin/products", label: "Products" },
          { href: "/admin/categories", label: "Categories" },
          { href: "/admin/settings", label: "Business settings" },
        ]}
      >
        <form action={signOut}>
          <button className="button-link" type="submit">Logout</button>
        </form>
      </MobileMenu>
      <div className="admin-layout">
        <aside className="admin-sidebar" aria-label="Admin navigation">
          <p className="eyebrow">Admin area</p>
          <strong>{adminUser.display_name || "Administrator"}</strong>
          <Link href="/admin">Overview</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/categories">Categories</Link>
          <Link href="/admin/settings">Business settings</Link>
          <form action={signOut}>
            <button className="button-link" type="submit">Logout</button>
          </form>
        </aside>
        <section className="admin-main">{children}</section>
      </div>
    </div>
  );
}