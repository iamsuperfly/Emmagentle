"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function PasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    if (password.length < 8) return setError("Use at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    const { error: updateError } = await createSupabaseBrowserClient().auth.updateUser({ password });
    if (updateError) setError(updateError.message);
    else {
      setPassword("");
      setConfirm("");
      setMessage("Password changed.");
    }
  }

  return (
    <form className="stack" onSubmit={submit}>
      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p className="success-message">{message}</p> : null}
      <label>
        New password
        <input type="password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <label>
        Confirm new password
        <input type="password" required minLength={8} value={confirm} onChange={(event) => setConfirm(event.target.value)} />
      </label>
      <button className="button button-secondary" type="submit">Change password</button>
    </form>
  );
}