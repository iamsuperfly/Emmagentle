"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured yet.");
      return;
    }
    const redirectTo = `${window.location.origin}/admin/reset-password`;
    const { error: resetError } = await createSupabaseBrowserClient().auth.resetPasswordForEmail(email, { redirectTo });
    if (resetError) setError(resetError.message);
    else setMessage("If that email exists, a password reset link has been sent.");
  }

  return (
    <form className="stack" onSubmit={submit}>
      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p className="success-message">{message}</p> : null}
      <label>
        Admin email
        <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <button className="button button-primary" type="submit">Send reset link</button>
      <Link className="button-link" href="/admin/login">Back to sign in</Link>
    </form>
  );
}