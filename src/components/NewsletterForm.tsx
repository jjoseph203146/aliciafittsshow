"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(59,167,118,0.15)",
          border: "1px solid rgba(59,167,118,0.5)",
          color: "#7FE3B0",
          borderRadius: 999,
          padding: "15px 28px",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        ✓ You're subscribed — welcome to the good news.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: 12,
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.95)",
          border: "none",
          borderRadius: 999,
          padding: "16px 22px",
          fontSize: 15,
          color: "#3A2A4D",
        }}
      />
      <button
        type="submit"
        style={{
          background: "#E91E8C",
          color: "#fff",
          border: "none",
          borderRadius: 999,
          padding: "16px 30px",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
