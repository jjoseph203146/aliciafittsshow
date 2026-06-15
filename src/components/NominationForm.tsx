"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const WEB3FORMS_KEY = "209f024d-8c10-41fc-9c1b-b426d54460de";
const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid #E6E1EC", borderRadius: 10, padding: "14px 16px", fontSize: 14.5, boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#4A2A6B", marginBottom: 7 };

export default function NominationForm() {
  const supabase = createClient();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [nominee, setNominee] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await supabase.from("nominations").insert({
      nominator_name: yourName,
      email: yourEmail,
      nominee_name: nominee,
      reason: "",
    });

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New Spotlight Nomination",
          from_name: "Good News in the CSRA Website",
          nominator_name: yourName,
          email: yourEmail,
          nominee,
        }),
      });
    } catch {
      // silently ignore — nomination already saved to Supabase
    }

    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(59,167,118,0.15)", border: "1px solid rgba(59,167,118,0.5)", color: "#7FE3B0", borderRadius: 14, padding: "18px 28px", fontSize: 15, fontWeight: 600 }}>
        ✓ Thank you — your nomination has been received.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 18, padding: 30, textAlign: "left", boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>
      <div className="rsp-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelStyle}>Your Name</label>
          <input required placeholder="Jane Doe" value={yourName} onChange={(e) => setYourName(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Your Email</label>
          <input required type="email" placeholder="jane@email.com" value={yourEmail} onChange={(e) => setYourEmail(e.target.value)} style={inputStyle} />
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <label style={labelStyle}>Who are you nominating?</label>
        <input required placeholder="Person, business, or organization" value={nominee} onChange={(e) => setNominee(e.target.value)} style={inputStyle} />
      </div>
      <button type="submit" disabled={loading} style={{ marginTop: 20, width: "100%", background: "#E91E8C", color: "#fff", border: "none", borderRadius: 10, padding: 15, fontSize: 15, fontWeight: 600, cursor: "pointer", minHeight: 52 }}>
        {loading ? "Submitting…" : "Nominate Someone"}
      </button>
    </form>
  );
}
