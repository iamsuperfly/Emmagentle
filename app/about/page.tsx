import Link from "next/link";
import { BUSINESS_DEFAULTS } from "@/lib/config";
import { getBusinessSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await getBusinessSettings();
  return (
    <section className="section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">{BUSINESS_DEFAULTS.businessName}</p>
          <h1>About & contact</h1>
          <p>Find the current business information and get in touch about products, pricing, or availability.</p>
          <Link className="button button-secondary" href="/">
            ← Back to home
          </Link>
        </div>
        <div className="about-grid">
          <div className="panel about-panel" id="about">
            <p className="eyebrow">What we do / what we sell</p>
            <h2>Electrical & hardware supplies</h2>
            <p>Electrical and hardware supplies for everyday projects and professional work.</p>
          </div>
          <div className="panel about-panel" id="location">
            <p className="eyebrow">Location</p>
            <p>{settings.address}</p>
          </div>
          <div className="panel about-panel" id="contact">
            <p className="eyebrow">Contact</p>
            <p>WhatsApp: {settings.whatsapp_number}</p>
            {settings.phone_number ? <p>Phone: {settings.phone_number}</p> : null}
            <a
              className="button button-primary whatsapp-button"
              href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <div className="panel about-panel" id="hours">
            <p className="eyebrow">Business hours</p>
            <p>{settings.opening_hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}