import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <section className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">Account recovery</p>
        <h1>Reset your password</h1>
        <p>Enter the authorized admin email address to receive a reset link.</p>
        <ForgotPasswordForm />
      </div>
    </section>
  );
}