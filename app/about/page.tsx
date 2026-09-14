import Link from "next/link";
import { BUSINESS_DEFAULTS } from "@/lib/config";
import { getBusinessSettings } from "@/lib/data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await getBusinessSettings();
  return (
    <section className="section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">{BUSINESS_DEFAULTS.businessName}</p>
          <h1>Shop details</h1>
          <p>Hours, address, and WhatsApp for price checks and stock confirmation.</p>
          <Link className="button button-secondary" href="/">
            Back to stock
          </Link>
        </div>
        <div className="about-grid">
          <div className="panel about-panel" id="about">
            <p className="eyebrow">What we sell</p>
            <h2>Electrical fittings, solar parts, and hardware</h2>
            <p>
              Stock for electricians, builders, and household jobs. Listings show what we currently
              photograph and price. If an item is missing, ask — we can often source it.
            </p>
          </div>
          <div className="panel about-panel" id="location">
            <p className="eyebrow">Counter</p>
            <h2>Find the shop</h2>
            <p>{settings.address}</p>
          </div>
          <div className="panel about-panel" id="contact">
            <p className="eyebrow">Talk to the shop</p>
            <h2>WhatsApp first</h2>
            <p>{settings.whatsapp_number}</p>
            {settings.phone_number ? <p>Phone: {settings.phone_number}</p> : null}
            <a
              className="button button-primary whatsapp-button"
              href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
              Open WhatsApp
            </a>
          </div>
          <div className="panel about-panel" id="hours">
            <p className="eyebrow">When we are open</p>
            <h2>Business hours</h2>
            <p>{settings.opening_hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
