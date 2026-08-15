import Link from "next/link";
import { getBusinessSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await getBusinessSettings();
  return (
    <section className="section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">Emmanuel Enterprise</p>
          <h1>About & contact</h1>
          <p>
            This page is intentionally simple during the foundation stage. The details below are
            controlled from Business Settings so the final design can grow without moving business data.
          </p>
          <Link className="button button-secondary" href="/">
            ← Back to home
          </Link>
        </div>
        <div className="info-strip" style={{ marginTop: "1.5rem" }}>
          <div>
            <p className="eyebrow">Business name</p>
            <p>{settings.business_name}</p>
          </div>
          <div>
            <p className="eyebrow">Opening hours</p>
            <p>{settings.opening_hours}</p>
          </div>
          <div>
            <p className="eyebrow">Address</p>
            <p>{settings.address}</p>
          </div>
        </div>
        <div className="panel" style={{ marginTop: "1rem" }}>
          <p className="eyebrow">WhatsApp enquiries</p>
          <p>Ask about product availability, pricing, or a specific item directly.</p>
          <a
            className="button button-primary"
            href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
          >
            Message {settings.whatsapp_number}
          </a>
        </div>
      </div>
    </section>
  );
}