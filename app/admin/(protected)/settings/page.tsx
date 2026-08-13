import { PasswordForm } from "@/components/admin/PasswordForm";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/auth";
import { getBusinessSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const settings = await getBusinessSettings();
  return (
    <>
      <div className="admin-title-row">
        <div>
          <p className="eyebrow">Business configuration</p>
          <h1>Business settings</h1>
        </div>
      </div>
      <SettingsForm settings={settings} />
      <div className="panel">
        <p className="eyebrow">Account security</p>
        <h2>Change password</h2>
        <PasswordForm />
      </div>
    </>
  );
}