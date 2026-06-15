import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import EpisodesClient from "./EpisodesClient";

export const metadata: Metadata = {
  title: "Episodes | Good News in the CSRA",
  description: "Watch all episodes of Good News in the CSRA — inspiring conversations with community heroes hosted by Alicia Fitts.",
};

export const dynamic = "force-dynamic";

const PF = "var(--font-playfair), serif";

export default async function EpisodesPage() {
  const supabase = await createClient();
  const { data: episodes } = await supabase
    .from("episodes")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <>
      {/* ── Header ── */}
      <section style={{ background: "#1A0A2E" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 32px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "#E91E8C", marginBottom: 16 }}>WATCH</div>
          <h1 style={{ fontFamily: PF, fontWeight: 800, fontSize: 54, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.01em" }}>Episodes</h1>
          <p style={{ fontSize: 18, color: "#CBBDD8", margin: 0 }}>Watch every episode of Good News in the CSRA.</p>
        </div>
      </section>

      <EpisodesClient episodes={episodes ?? []} />
    </>
  );
}
