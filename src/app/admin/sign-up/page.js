"use client";

import "../dashboard/page.css";
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
      setError("Unable to create this account. The email may already be registered.");
      return;
    }
    setCreated(true);
  }

  return (
    <main className="admin-page auth-page">
      <form className="product-form" onSubmit={submit}>
        <p className="eyebrow">GKJ PRODUCTIONS / ADMIN</p>
        <h1>Create the first account.</h1>
        <p className="auth-note">Use this once to create your account, then disable public sign-up again.</p>
        <label>Name<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Password<input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        <button type="submit">Create account</button>
        {created ? <p role="status">Account created. <a href="/admin">Sign in here.</a></p> : null}
        {error ? <p role="alert">{error}</p> : null}
        <a href="/admin">Back to sign in</a>
      </form>
    </main>
  );
}
