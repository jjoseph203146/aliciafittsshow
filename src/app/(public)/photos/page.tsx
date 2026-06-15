import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import PhotosClient from "./PhotosClient";

export const metadata: Metadata = {
  title: "Photos | Good News in the CSRA",
  description: "Browse the Good News in the CSRA photo gallery — behind the scenes, community events, and more.",
};

export const dynamic = "force-dynamic";

const PF = "var(--font-playfair), serif";

export default async function PhotosPage() {
  const supabase = await createClient();
  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      {/* ── Header ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 32px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "#E91E8C", marginBottom: 16 }}>GALLERY</div>
          <h1 style={{ fontFamily: PF, fontWeight: 800, fontSize: 54, color: "#4A2A6B", margin: "0 0 12px", letterSpacing: "-0.01em" }}>Photos</h1>
          <p style={{ fontSize: 18, color: "#6B6473", margin: 0 }}>Behind the scenes, show recordings, and community moments.</p>
        </div>
      </section>

      <PhotosClient photos={photos ?? []} />
    </>
  );
}
