import Link from "next/link";
import { getBusinessSettings } from "@/lib/data";
import "./globals.css";

export const metadata = {
  title: "Emmanuel Enterprise | Electrical & Hardware Supplies",
  description: "Browse electrical and hardware supplies from Emmanuel Enterprise.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getBusinessSettings();

  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/">
              <span className="brand-mark">EE</span>
              <span>{settings.business_name}</span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/products">Products</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/about">About & Contact</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <p className="eyebrow">Emmanuel Enterprise</p>
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