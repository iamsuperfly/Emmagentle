"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (password.length < 8) return setError("Use at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (!isSupabaseConfigured()) return setError("Supabase is not configured yet.");
    const { error: updateError } = await createSupabaseBrowserClient().auth.updateUser({ password });
    if (updateError) setError(updateError.message);
    else setMessage("Password updated. You can now sign in.");
  }

  return (
    <form className="stack" onSubmit={submit}>
      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p className="success-message">{message}</p> : null}
      <label>
        New password
        <input type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <label>
        Confirm password
        <input type="password" minLength={8} required value={confirm} onChange={(event) => setConfirm(event.target.value)} />
      </label>
      <button className="button button-primary" type="submit">Update password</button>
      <Link className="button-link" href="/admin/login">Go to sign in</Link>
    </form>
  );
}