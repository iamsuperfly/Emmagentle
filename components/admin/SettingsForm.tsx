"use client";

import { useActionState } from "react";
import { saveBusinessSettings } from "@/app/admin/actions";
import { BusinessSettings } from "@/lib/config";

export function SettingsForm({ settings }: { settings: BusinessSettings }) {
  const [state, formAction, pending] = useActionState(saveBusinessSettings, {});
  return (
    <form className="panel stack" action={formAction}>
      {state.error ? <p className="error-message">{state.error}</p> : null}
      {state.success ? <p className="success-message">{state.success}</p> : null}
      <div className="form-grid">
        <label>
          Business name
          <input name="business_name" required defaultValue={settings.business_name} />
        </label>
        <label>
          WhatsApp number
          <input name="whatsapp_number" required defaultValue={settings.whatsapp_number} />
        </label>
        <label>
          Phone number
          <input name="phone_number" defaultValue={settings.phone_number} placeholder="Add later" />
        </label>
        <label>
          Opening hours
          <input name="opening_hours" defaultValue={settings.opening_hours} />
        </label>
        <label className="form-field-full">
          Address
          <input name="address" defaultValue={settings.address} placeholder="Add later" />
        </label>
        <label className="form-field-full">
          Logo storage path (optional)
          <input name="logo_path" defaultValue={settings.logo_path} placeholder="Add after uploading a final logo" />
        </label>
      </div>
      <button className="button button-primary" disabled={pending} type="submit">
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}