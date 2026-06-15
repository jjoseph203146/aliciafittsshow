"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const PF = "var(--font-playfair), serif";
const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid #E6E1EC", borderRadius: 10, padding: "14px 16px", fontSize: 14.5, marginBottom: 18, boxSizing: "border-box" };

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1A0A2E", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 22, border: "1px solid rgba(155,111,184,0.3)", padding: "44px 38px", boxShadow: "0 30px 80px rgba(0,0,0,0.5)", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-pinyon-script), cursive", fontSize: 54, lineHeight: 0.8, color: "#E91E8C", marginBottom: 6 }}>Af</div>
        <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", color: "#5B2D8E", marginBottom: 30 }}>ALICIA FITTS SHOW</div>
        <h1 style={{ fontFamily: PF, fontWeight: 800, fontSize: 28, color: "#4A2A6B", margin: "0 0 6px" }}>Admin Login</h1>
        <p style={{ fontSize: 14, color: "#9189A0", margin: "0 0 28px" }}>Invite only — not for public access.</p>
        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#4A2A6B", marginBottom: 7 }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@example.com" style={inputStyle} />
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#4A2A6B", marginBottom: 7 }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
          {error && <p style={{ color: "#E11D48", fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: "100%", background: "#E91E8C", color: "#fff", border: "none", borderRadius: 11, padding: 16, fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 10px 28px rgba(233,30,140,0.3)", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <div style={{ fontSize: 12.5, fontStyle: "italic", color: "#A89FB0", marginTop: 20 }}>Having trouble? Contact your developer.</div>
        <Link href="/" style={{ display: "inline-block", marginTop: 18, fontSize: 13, color: "#9189A0", textDecoration: "none" }}>← Back to site</Link>
      </div>
    </div>
  );
}
