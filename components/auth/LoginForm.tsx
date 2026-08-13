"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function LoginForm({ message }: { message?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(message || "");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured. Add the environment variables before signing in.");
      setPending(false);
      return;
    }
    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setPending(false);
      return;
    }
    router.push("/admin");
  }

  return (
    <form className="stack" onSubmit={submit}>
      {error ? <p className="error-message">{error}</p> : null}
      <label>
        Email
        <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password
        <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button className="button button-primary" disabled={pending} type="submit">
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <Link className="button-link" href="/admin/forgot-password">Forgot your password?</Link>
    </form>
  );
}