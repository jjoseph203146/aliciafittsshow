import type { Metadata } from "next";
import BeOnTheShowForms from "./BeOnTheShowForms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Be on the Show | Good News in the CSRA",
  description: "Share your story or nominate a community hero for Good News in the CSRA with Alicia Fitts.",
};

const PF = "var(--font-playfair), serif";

const steps = [
  { n: "1", t: "Submit Your Story", d: "Fill out the form below and tell us about yourself and the story you'd like to share." },
  { n: "2", t: "We Review It", d: "Alicia personally reviews every submission and our team will follow up within a week." },
  { n: "3", t: "You're on the Show", d: "If it's a great fit, we'll schedule a recording and you'll be featured on Good News in the CSRA." },
];

const testimonials = [
  { quote: "Being on the show changed everything for our nonprofit. The exposure we got was incredible — we doubled our volunteers in a month.", name: "Marcus Reed", org: "CSRA Food Network" },
  { quote: "Alicia made me feel so comfortable. It didn't feel like an interview — it felt like a real conversation with someone who genuinely cared.", name: "Tasha Boyd", org: "Community Garden Co-op" },
];

export default function BeOnTheShowPage() {
  return (
    <>
      {/* ── Header ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 32px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "#E91E8C", marginBottom: 16 }}>JOIN US</div>
          <h1 style={{ fontFamily: PF, fontWeight: 800, fontSize: 54, color: "#4A2A6B", margin: "0 0 12px", letterSpacing: "-0.01em" }}>Be on the Show</h1>
          <p style={{ fontSize: 18, color: "#6B6473", margin: 0 }}>Have a story worth sharing? Alicia wants to hear it.</p>
        </div>
      </section>

      {/* ── Intro + Photo ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "76px 32px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 54, alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: PF, fontWeight: 800, fontSize: 36, color: "#4A2A6B", margin: "0 0 18px" }}>Share Your Story</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "#6B6473", margin: "0 0 26px" }}>Alicia is always looking for genuine stories of impact — the business owner who gives back, the volunteer who shows up, the nonprofit quietly changing lives. If that sounds like you or someone you know, we&apos;d love to talk.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Your story matters to the CSRA community", "No experience required — just a good story", "Alicia personally reviews every submission"].map((b) => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#E91E8C", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12 }}>✓</div>
                  <div style={{ fontSize: 15.5, color: "#4A2A6B", fontWeight: 500 }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 56px rgba(74,42,107,0.18)", aspectRatio: "4/3", background: "linear-gradient(150deg,#6B3F8F,#3A2456)" }} />
        </div>
      </section>

      {/* ── Form ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "70px 32px" }}>
          <BeOnTheShowForms />
        </div>
      </section>

      {/* ── What Happens Next ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "76px 32px" }}>
          <h2 style={{ fontFamily: PF, fontWeight: 800, fontSize: 36, color: "#4A2A6B", margin: "0 0 48px", textAlign: "center" }}>What Happens Next</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 30, position: "relative" }}>
            <div style={{ position: "absolute", top: 26, left: "16%", right: "16%", height: 2, background: "linear-gradient(90deg,#E91E8C,#F8A5C8)" }} />
            {steps.map((st) => (
              <div key={st.n} style={{ textAlign: "center", position: "relative" }}>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#E91E8C", color: "#fff", fontFamily: PF, fontWeight: 700, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 22px rgba(233,30,140,0.32)", position: "relative", zIndex: 1 }}>{st.n}</div>
                <h3 style={{ fontFamily: PF, fontWeight: 700, fontSize: 20, color: "#4A2A6B", margin: "0 0 8px" }}>{st.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#6B6473", margin: 0 }}>{st.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "70px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#fff", borderRadius: 18, padding: 32, boxShadow: "0 12px 32px rgba(74,42,107,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(150deg,#6B3F8F,#3A2456)", flexShrink: 0 }} />
                <div style={{ color: "#E91E8C", fontSize: 15, letterSpacing: 2 }}>★★★★★</div>
              </div>
              <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: 18, lineHeight: 1.5, color: "#4A2A6B", margin: "0 0 18px" }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ fontWeight: 700, color: "#4A2A6B", fontSize: 15 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: "#E91E8C", fontWeight: 600 }}>{t.org}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
