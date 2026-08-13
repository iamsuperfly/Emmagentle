import { LoginForm } from "@/components/auth/LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message = error === "not-authorized"
    ? "Your account is signed in but is not listed as an authorized administrator."
    : undefined;

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">Emmanuel Enterprise</p>
        <h1>Admin sign in</h1>
        <p>Manage the catalogue, categories, images, and business information.</p>
        <LoginForm message={message} />
      </div>
    </section>
  );
}