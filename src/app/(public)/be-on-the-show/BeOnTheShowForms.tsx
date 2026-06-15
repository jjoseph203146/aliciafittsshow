"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const WEB3FORMS_KEY = "209f024d-8c10-41fc-9c1b-b426d54460de";
const PF = "var(--font-playfair), serif";
const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid #E6E1EC", borderRadius: 10, padding: "13px 15px", fontSize: 14.5, boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#4A2A6B", marginBottom: 7 };

export default function BeOnTheShowForms() {
  const supabase = createClient();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [story, setStory] = useState("");
  const [heard, setHeard] = useState("Social Media");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: dbErr } = await supabase.from("submissions").insert({
      full_name: fullName,
      email,
      phone: phone || null,
      org: org || null,
      story,
      heard_from: heard || null,
    });

    if (dbErr) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // Email notification via Web3Forms (fire-and-forget — don't block success on it)
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New Be on the Show Submission",
          from_name: "Good News in the CSRA Website",
          name: fullName,
          email,
          phone: phone || "Not provided",
          organization: org || "Not provided",
          story,
          heard_from: heard,
        }),
      });
    } catch {
      // silently ignore email errors — record already saved to Supabase
    }

    setDone(true);
    setLoading(false);
  }

  function reset() {
    setDone(false);
    setFullName(""); setEmail(""); setPhone(""); setOrg(""); setStory(""); setHeard("Social Media");
  }

  if (done) {
    return (
      <div style={{ background: "#fff", border: "1px solid #F0EAF6", borderRadius: 20, padding: "56px 40px", textAlign: "center", boxShadow: "0 20px 52px rgba(74,42,107,0.1)" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E4F4EC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontSize: 28, color: "#2E8B62" }}>✓</div>
        <h2 style={{ fontFamily: PF, fontWeight: 800, fontSize: 30, color: "#4A2A6B", margin: "0 0 12px" }}>Your story is on its way!</h2>
        <p style={{ fontSize: 16, color: "#6B6473", margin: "0 0 26px" }}>Thank you for sharing. Alicia personally reviews every submission — you&apos;ll hear from the team soon.</p>
        <button onClick={reset} style={{ background: "transparent", color: "#5B2D8E", border: "1.5px solid #5B2D8E", borderRadius: 999, padding: "13px 28px", fontSize: 14.5, fontWeight: 600, cursor: "pointer" }}>
          Submit another story
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1px solid #EFE6F5", borderRadius: 20, padding: 40, boxShadow: "0 20px 52px rgba(74,42,107,0.1)" }}>
      <h2 style={{ fontFamily: PF, fontWeight: 800, fontSize: 28, color: "#4A2A6B", margin: "0 0 6px" }}>Tell Us About Yourself</h2>
      <p style={{ fontSize: 14.5, color: "#9189A0", margin: "0 0 28px" }}>Fields marked with * are required.</p>
      <div className="rsp-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input required value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Phone Number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Organization or Business</label>
          <input value={org} onChange={(e) => setOrg(e.target.value)} style={inputStyle} />
        </div>
      </div>
      <div style={{ marginTop: 18 }}>
        <label style={labelStyle}>Tell us what you&apos;d like to share *</label>
        <textarea required rows={5} value={story} onChange={(e) => setStory(e.target.value)} style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-dm-sans), sans-serif" }} />
      </div>
      <div style={{ marginTop: 18 }}>
        <label style={labelStyle}>How did you hear about us?</label>
        <select value={heard} onChange={(e) => setHeard(e.target.value)} style={{ ...inputStyle, background: "#fff", color: "#3A2A4D" }}>
          <option>Social Media</option>
          <option>Google</option>
          <option>Friend or Family</option>
          <option>Previous Guest</option>
          <option>Other</option>
        </select>
      </div>
      {error && <p style={{ color: "#E11D48", fontSize: 14, marginTop: 14 }}>{error}</p>}
      <button type="submit" disabled={loading} style={{ marginTop: 26, width: "100%", background: "#E91E8C", color: "#fff", border: "none", borderRadius: 12, padding: 17, fontSize: 16, fontWeight: 600, cursor: "pointer", boxShadow: "0 10px 28px rgba(233,30,140,0.3)", opacity: loading ? 0.7 : 1, minHeight: 54 }}>
        {loading ? "Submitting…" : "Submit My Story"}
      </button>
    </form>
  );
}
