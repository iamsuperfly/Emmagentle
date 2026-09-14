import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { BUSINESS_DEFAULTS, PUBLIC_LOGO_PATH } from "@/lib/config";
import { getBusinessSettings } from "@/lib/data";
import "./globals.css";

export const metadata = {
  title: "EMMA GENTLE | Electrical & Hardware Supplies",
  description: "Electrical and hardware supplies from EMMA GENTLE. Browse stock and confirm availability on WhatsApp.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getBusinessSettings();
  const whatsappDigits = settings.whatsapp_number.replace(/\D/g, "");

  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="brand-logo" src={PUBLIC_LOGO_PATH} alt="" />
              <span className="brand-text">
                <span className="brand-name">{BUSINESS_DEFAULTS.businessName}</span>
                <span className="brand-tag">Electrical & hardware</span>
              </span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/products">Catalogue</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/about">Hours & location</Link>
              <a
                className="header-whatsapp"
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </nav>
            <MobileMenu
              className="public-mobile-menu"
              items={[
                { href: "/products", label: "Catalogue" },
                { href: "/categories", label: "Categories" },
                { href: "/about#hours", label: "Hours" },
                { href: "/about#contact", label: "Contact" },
                { href: "/about#location", label: "Location" },
              ]}
            />
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <p className="eyebrow">{BUSINESS_DEFAULTS.businessName}</p>
              <p>Trade counter for electrical fittings, solar parts, and hardware stock.</p>
            </div>
            <div>
              <p className="eyebrow">Opening hours</p>
              <p>{settings.opening_hours}</p>
            </div>
            <div>
              <p className="eyebrow">Shop contact</p>
              <p>{settings.whatsapp_number}</p>
              <p>{settings.address}</p>
              <a
                className="footer-whatsapp"
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noreferrer"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
