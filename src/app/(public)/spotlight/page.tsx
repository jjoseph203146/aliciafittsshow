import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Spotlight } from "@/lib/types";
import NominationForm from "@/components/NominationForm";

export const metadata: Metadata = {
  title: "Community Spotlight | Good News in the CSRA",
  description: "Meet the everyday heroes of the CSRA — community spotlights featured on Good News in the CSRA with Alicia Fitts.",
};

export const dynamic = "force-dynamic";

const PF = "var(--font-playfair), serif";

export default async function SpotlightPage() {
  const supabase = await createClient();
  const { data: spotlights } = await supabase
    .from("spotlights")
    .select("*")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  const featured = spotlights?.find((s: Spotlight) => s.is_featured) ?? spotlights?.[0] ?? null;
  const grid = spotlights?.filter((s: Spotlight) => s.id !== featured?.id) ?? [];

  return (
    <>
      {/* ── Header ── */}
      <section style={{ background: "#1A0A2E" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 32px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "#E91E8C", marginBottom: 16 }}>COMMUNITY</div>
          <h1 style={{ fontFamily: PF, fontWeight: 800, fontSize: 54, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.01em" }}>CSRA Spotlight</h1>
          <p style={{ fontSize: 18, color: "#F8A5C8", margin: 0, maxWidth: 620 }}>Celebrating the people and organizations making a difference in our community.</p>
        </div>
      </section>

      {/* ── Featured ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "66px 32px" }}>
          <div style={{ border: "1px solid #F0EAF6", borderRadius: 22, overflow: "hidden", display: "grid", gridTemplateColumns: "0.95fr 1.05fr", boxShadow: "0 20px 52px rgba(74,42,107,0.1)" }}>
            <div style={{ background: "linear-gradient(150deg,#6B3F8F,#241B33)", minHeight: 420, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {featured?.photo_url ? (
                <img src={featured.photo_url} alt={featured.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
              ) : (
                <div style={{ width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(248,165,200,0.5)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 60%,rgba(36,27,51,0.55))" }} />
            </div>
            <div style={{ padding: "46px 44px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "#E91E8C", marginBottom: 14 }}>FEATURED SPOTLIGHT</div>
              <h2 style={{ fontFamily: PF, fontWeight: 800, fontSize: 34, color: "#4A2A6B", margin: "0 0 8px" }}>{featured?.name ?? "Community Leader"}</h2>
              {featured?.org && <div style={{ fontSize: 14, fontWeight: 600, color: "#E91E8C", marginBottom: 22 }}>{featured.title ? `${featured.title} · ` : ""}{featured.org}</div>}
              {featured?.impact && <p style={{ fontSize: 16, lineHeight: 1.7, color: "#6B6473", margin: "0 0 22px" }}>{featured.impact}</p>}
              {featured?.bio && (
                <div style={{ marginBottom: 26 }}>
                  <span style={{ fontWeight: 700, color: "#4A2A6B", fontSize: 15 }}>About: </span>
                  <span style={{ fontSize: 15, color: "#6B6473" }}>{featured.bio}</span>
                </div>
              )}
              <button style={{ background: "#E91E8C", color: "#fff", border: "none", borderRadius: 999, padding: "15px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 10px 28px rgba(233,30,140,0.3)" }}>
                Read Full Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "70px 32px" }}>
          {grid.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
              {grid.map((sp: Spotlight) => (
                <div key={sp.id} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 12px 32px rgba(74,42,107,0.07)" }}>
                  <div style={{ aspectRatio: "1/1", background: "linear-gradient(150deg,#6B3F8F,#3A2456)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {sp.photo_url ? (
                      <img src={sp.photo_url} alt={sp.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                    ) : (
                      <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.13)", border: "1.5px solid rgba(248,165,200,0.5)" }} />
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 60%,rgba(36,27,51,0.5))" }} />
                  </div>
                  <div style={{ padding: "22px 22px 24px" }}>
                    <h3 style={{ fontFamily: PF, fontWeight: 700, fontSize: 19, color: "#4A2A6B", margin: "0 0 4px" }}>{sp.name}</h3>
                    {sp.org && <div style={{ fontSize: 12.5, fontWeight: 600, color: "#E91E8C", marginBottom: 12 }}>{sp.org}</div>}
                    {sp.impact && <p style={{ fontSize: 14, lineHeight: 1.55, color: "#6B6473", margin: "0 0 14px" }}>{sp.impact}</p>}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {sp.category && <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: "#C2557A", background: "#FBE9F2", borderRadius: 999, padding: "5px 11px" }}>{sp.category}</span>}
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#4A2A6B" }}>Read Their Story →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontFamily: PF, fontSize: 22, color: "#4A2A6B", marginBottom: 8 }}>More spotlights coming soon</div>
              <div style={{ fontSize: 15, color: "#9189A0" }}>Know someone who deserves recognition? Nominate them below.</div>
            </div>
          )}
        </div>
      </section>

      {/* ── Nomination CTA ── */}
      <section style={{ background: "#1A0A2E" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "76px 32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: PF, fontWeight: 800, fontSize: 38, lineHeight: 1.18, color: "#fff", margin: "0 0 14px" }}>Know Someone Doing Good in the CSRA?</h2>
          <p style={{ fontSize: 16.5, color: "#F8A5C8", margin: "0 0 32px" }}>Nominate a community hero, local business, or organization making a difference.</p>
          <NominationForm />
        </div>
      </section>
    </>
  );
}
