import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Good News in the CSRA",
  description: "Meet Alicia Fitts — speaker, consultant, and community advocate behind Good News in the CSRA.",
};

const PF = "var(--font-playfair), serif";

export default function AboutPage() {
  return (
    <>
      {/* ── Header ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 32px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "#E91E8C", marginBottom: 16 }}>OUR STORY</div>
          <h1 style={{ fontFamily: PF, fontWeight: 800, fontSize: 54, color: "#4A2A6B", margin: "0 0 12px", letterSpacing: "-0.01em" }}>Meet Alicia Fitts</h1>
          <p style={{ fontSize: 18, color: "#6B6473", margin: 0 }}>Speaker. Consultant. Community Advocate.</p>
        </div>
      </section>

      {/* ── Bio ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 32px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "start" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", border: "6px solid #F4ECF8", boxShadow: "0 24px 56px rgba(74,42,107,0.16)", aspectRatio: "3/4", background: "linear-gradient(150deg,#6B3F8F,#3A2456)" }} />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "#E91E8C", marginBottom: 16 }}>ABOUT YOUR HOST</div>
            <h2 style={{ fontFamily: PF, fontWeight: 800, fontSize: 40, color: "#4A2A6B", margin: "0 0 22px" }}>Alicia Fitts</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.72, color: "#6B6473", margin: "0 0 16px" }}>For years, Alicia helped families and small businesses across the CSRA make sense of their finances. Along the way, she kept meeting people doing extraordinary, quiet good — stories that never made the evening news.</p>
            <p style={{ fontSize: 16.5, lineHeight: 1.72, color: "#6B6473", margin: "0 0 16px" }}>So she built a show for them. <em>Good News in the CSRA</em> is her answer to a media landscape that too often overlooks the generosity, grit, and goodness already here in Augusta and beyond.</p>
            <p style={{ fontSize: 16.5, lineHeight: 1.72, color: "#6B6473", margin: "0 0 26px" }}>When she isn&apos;t behind the camera, Alicia speaks and consults on financial empowerment, helping people build the kind of stability that lets them give back.</p>
            <div style={{ background: "#F7F2FB", borderLeft: "4px solid #E91E8C", borderRadius: "0 14px 14px 0", padding: "22px 26px", marginBottom: 26 }}>
              <div style={{ fontFamily: PF, fontStyle: "italic", fontSize: 21, lineHeight: 1.4, color: "#4A2A6B" }}>&ldquo;The CSRA deserves to hear its own good news.&rdquo;</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#C2557A", marginTop: 10 }}>— Alicia Fitts</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["FB", "IG", "YT", "LI"].map((s) => (
                <div key={s} style={{ width: 42, height: 42, borderRadius: "50%", background: "#FBE9F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#E91E8C" }}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About the Show ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "78px 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 46px" }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "#E91E8C", marginBottom: 14 }}>THE SHOW</div>
            <h2 style={{ fontFamily: PF, fontWeight: 800, fontSize: 40, color: "#4A2A6B", margin: 0, letterSpacing: "-0.01em" }}>About Good News in the CSRA</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center" }}>
            <div>
              <h3 style={{ fontFamily: PF, fontWeight: 700, fontSize: 24, color: "#4A2A6B", margin: "0 0 10px" }}>Our Mission</h3>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#6B6473", margin: "0 0 28px" }}>To bring the positive stories of our region forward — the people, nonprofits, and small businesses making the CSRA a better place to live, work, and grow.</p>
              <h3 style={{ fontFamily: PF, fontWeight: 700, fontSize: 24, color: "#4A2A6B", margin: "0 0 10px" }}>Who We Feature</h3>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#6B6473", margin: 0 }}>Community leaders, business owners, nonprofits, educators, and everyday neighbors whose work deserves a wider audience. If they&apos;re doing good, we want to know.</p>
            </div>
            <div>
              <div style={{ aspectRatio: "16/9", borderRadius: 18, background: "linear-gradient(135deg,#3A2456,#1A0A2E)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 20px 48px rgba(36,27,51,0.3)" }}>
                <div style={{ width: 66, height: 66, borderRadius: "50%", background: "rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                  <div style={{ width: 0, height: 0, borderLeft: "18px solid #fff", borderTop: "11px solid transparent", borderBottom: "11px solid transparent", marginLeft: 4 }} />
                </div>
              </div>
              <div style={{ fontSize: 13.5, fontStyle: "italic", color: "#C2557A", marginTop: 12, textAlign: "center" }}>Watch our latest episode</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "78px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
            {[
              { t: "Authenticity", d: "Real stories, real people. We don't manufacture good news — we find it." },
              { t: "Community", d: "The CSRA is our home. Every story we tell serves our neighbors first." },
              { t: "Empowerment", d: "Good stories inspire action. We want you to leave every episode ready to do something." },
              { t: "Generosity", d: "We believe the best communities are built by people who give more than they take." },
            ].map((v) => (
              <div key={v.t} style={{ background: "#F7F2FB", borderTop: "3px solid #C2557A", borderRadius: "4px 4px 16px 16px", padding: "26px 22px" }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: "#FBE9F2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 5, background: "#E91E8C" }} />
                </div>
                <h3 style={{ fontFamily: PF, fontWeight: 700, fontSize: 19, color: "#4A2A6B", margin: "0 0 8px" }}>{v.t}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#6B6473", margin: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Speaker / Consultant ── */}
      <section style={{ background: "#1A0A2E" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, marginBottom: 44 }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>SPEAKER</div>
              <div style={{ borderRadius: 18, overflow: "hidden", marginBottom: 22, boxShadow: "0 24px 56px rgba(0,0,0,0.4)", aspectRatio: "4/3", background: "linear-gradient(150deg,#6B3F8F,#1A0A2E)" }} />
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#CBBDD8", margin: 0 }}>Alicia brings warmth and clarity to every stage — from community keynotes to financial literacy workshops, she helps audiences feel both seen and equipped.</p>
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>CONSULTANT</div>
              <div style={{ borderRadius: 18, overflow: "hidden", marginBottom: 22, boxShadow: "0 24px 56px rgba(0,0,0,0.4)", aspectRatio: "4/3", background: "linear-gradient(150deg,#3A2456,#1A0A2E)" }} />
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#CBBDD8", margin: 0 }}>Through one-on-one consulting, Alicia partners with individuals and organizations to build financial systems that last — turning good intentions into real stability.</p>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/be-on-the-show" style={{ background: "#E91E8C", color: "#fff", border: "none", borderRadius: 999, padding: "16px 34px", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 10px 28px rgba(233,30,140,0.35)", textDecoration: "none", display: "inline-block" }}>
              Work With Alicia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
