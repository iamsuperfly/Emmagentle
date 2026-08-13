import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <section className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">Account recovery</p>
        <h1>Choose a new password</h1>
        <ResetPasswordForm />
      </div>
    </section>
  );
}