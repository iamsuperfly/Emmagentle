import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { BUSINESS_DEFAULTS, PUBLIC_LOGO_PATH } from "@/lib/config";
import { getBusinessSettings } from "@/lib/data";
import "./globals.css";

export const metadata = {
  title: "EMMA GENTLE | Electrical & Hardware Supplies",
  description: "Browse electrical and hardware supplies from EMMA GENTLE.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getBusinessSettings();

  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="brand-logo" src={PUBLIC_LOGO_PATH} alt="EMMA GENTLE logo" />
              <span>{BUSINESS_DEFAULTS.businessName}</span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/products">Products</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/about">About & Contact</Link>
            </nav>
            <MobileMenu
              className="public-mobile-menu"
              items={[
                { href: "/about#about", label: "About" },
                { href: "/about#contact", label: "Contact" },
                { href: "/products", label: "Products" },
                { href: "/categories", label: "Categories" },
              ]}
            />
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <p className="eyebrow">{BUSINESS_DEFAULTS.businessName}</p>
              <p>Electrical and hardware supplies for everyday projects and professional work.</p>
            </div>
            <div>
              <p className="eyebrow">Opening hours</p>
              <p>{settings.opening_hours}</p>
            </div>
            <div>
              <p className="eyebrow">Contact</p>
              <p>{settings.whatsapp_number}</p>
              <p>{settings.address}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}