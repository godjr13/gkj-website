"use client";

import "../app/admin/dashboard/page.css";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm({ inviteToken }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault(); setError(""); setMessage("");
    if (!inviteToken) { setError("This page can only be used with an invitation link."); return; }
    const result = await authClient.signUp.email({ ...form, inviteToken });
    if (result.error) { setError("This invitation is invalid, expired, or the email is already registered."); return; }
    const accepted = await fetch("/api/admin/invitations/accept", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: inviteToken }) });
    setMessage(accepted.ok ? "Account created. An existing administrator must approve your access before you can enter the dashboard." : "Account created, but the invitation could not be submitted for approval.");
  }
  return <main className="admin-page auth-page"><form className="product-form" onSubmit={submit}><p className="eyebrow">GKJ PRODUCTIONS / ADMIN</p><h1>Join the admin team.</h1><p className="auth-note">Create your account from the invitation you received. Access stays pending until an administrator approves it.</p><label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label><label>Invited email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label><label>Password<input type="password" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label><button type="submit">Create account</button>{message && <p role="status">{message} <a href="/admin">Return to sign in.</a></p>}{error && <p role="alert">{error}</p>}<a href="/admin">Back to sign in</a></form></main>;
}
