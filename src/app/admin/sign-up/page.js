"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AdminSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    const result = await authClient.signUp.email({ name, email, password });
    if (result.error) {
      setError("Unable to create this account. Check the details and try again.");
      return;
    }
    setCreated(true);
  }

  if (created) {
    return <main className="admin-page auth-page"><section className="product-form"><p className="eyebrow">GKJ PRODUCTIONS / ADMIN</p><h1>Account created</h1><p>Your admin account is ready. Sign in to manage inventory.</p><a href="/admin">Go to sign in</a></section></main>;
  }

  return <main className="admin-page auth-page"><form className="product-form" onSubmit={submit}><p className="eyebrow">GKJ PRODUCTIONS / ADMIN</p><h1>Create account</h1><label>Name<input value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Password<input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label><button type="submit">Create admin account</button>{error && <p role="alert">{error}</p>}<a href="/admin">Already have an account? Sign in</a></form></main>;
}
