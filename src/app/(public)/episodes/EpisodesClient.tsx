"use client";

import { useState, useMemo } from "react";
import type { Episode } from "@/lib/types";
import { getEmbedUrl } from "@/lib/youtube";

const PF = "var(--font-playfair), serif";

const FIXED_CATS = ["All", "Finance", "Community", "Business", "Health", "Events", "Interviews"];

const FILTER_ACTIVE: React.CSSProperties = { background: "#4A2A6B", color: "#fff", border: "1.5px solid #4A2A6B" };
const FILTER_IDLE: React.CSSProperties = { background: "#fff", color: "#6B6473", border: "1.5px solid #E6E1EC" };

const PLACEHOLDER_EPISODES: Episode[] = [
  { id: "ph1", youtube_url: "", youtube_id: "", title: "Building Wealth in the CSRA", guest_name: "Marcus Williams", description: "A local financial advisor shares practical tips for families who want to start investing and building generational wealth right here at home.", category: "Finance", published_at: "2025-01-15", is_published: true, created_at: "" },
  { id: "ph2", youtube_url: "", youtube_id: "", title: "Neighbors Helping Neighbors", guest_name: "Tasha Brooks", description: "How one woman started a grassroots food pantry that now feeds over 200 families every weekend in Augusta.", category: "Community", published_at: "2025-02-10", is_published: true, created_at: "" },
  { id: "ph3", youtube_url: "", youtube_id: "", title: "Entrepreneurship After 50", guest_name: "James Carter", description: "It's never too late to start your dream business. James launched a thriving landscaping company at 56 and hasn't looked back.", category: "Business", published_at: "2025-03-05", is_published: true, created_at: "" },
  { id: "ph4", youtube_url: "", youtube_id: "", title: "Mental Health in Our Community", guest_name: "Dr. Nina Patel", description: "Breaking stigma and expanding access to mental health care across the Central Savannah River Area.", category: "Health", published_at: "2025-03-22", is_published: true, created_at: "" },
  { id: "ph5", youtube_url: "", youtube_id: "", title: "CSRA Arts Festival Preview", guest_name: "Lisa Monroe", description: "What to expect at this year's biggest community gathering — art, music, food, and the people who make it happen.", category: "Events", published_at: "2025-04-01", is_published: true, created_at: "" },
  { id: "ph6", youtube_url: "", youtube_id: "", title: "One-on-One with Local Leadership", guest_name: "Mayor Kevin Harris", description: "City priorities, community vision, and what's next for Augusta's neighborhoods — straight from the source.", category: "Interviews", published_at: "2025-04-18", is_published: true, created_at: "" },
  { id: "ph7", youtube_url: "", youtube_id: "", title: "Small Business, Big Impact", guest_name: "Renee Johnson", description: "A bakery owner who employs formerly incarcerated youth shares how she turned a passion into a force for change.", category: "Business", published_at: "2025-05-02", is_published: true, created_at: "" },
  { id: "ph8", youtube_url: "", youtube_id: "", title: "Youth Voices of the CSRA", guest_name: "Student Panel", description: "High schoolers share their dreams, challenges, and vision for the community they're inheriting.", category: "Community", published_at: "2025-05-20", is_published: true, created_at: "" },
  { id: "ph9", youtube_url: "", youtube_id: "", title: "Holistic Health for Real Life", guest_name: "Coach Dana Reeves", description: "Practical wellness strategies without the gimmicks — movement, mindset, and community as medicine.", category: "Health", published_at: "2025-06-01", is_published: true, created_at: "" },
];

export default function EpisodesClient({ episodes }: { episodes: Episode[] }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const usingPlaceholders = episodes.length === 0;
  const source = usingPlaceholders ? PLACEHOLDER_EPISODES : episodes;

  const featured = source[0] ?? null;

  const visible = useMemo(() => {
    return source.filter((ep) => {
      const matchCat = activeFilter === "All" || ep.category === activeFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        ep.title.toLowerCase().includes(q) ||
        (ep.guest_name ?? "").toLowerCase().includes(q) ||
        (ep.description ?? "").toLowerCase().includes(q) ||
        (ep.category ?? "").toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [source, search, activeFilter]);

  return (
    <>
      {/* ── Search ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "44px 32px 8px", textAlign: "center" }}>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="5.5" stroke="#C2557A" strokeWidth="1.8"/>
              <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="#C2557A" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search episodes by title, guest, or topic..."
              style={{ width: "100%", border: "1.5px solid #E6E1EC", borderRadius: 999, padding: "16px 22px 16px 46px", fontSize: 15, color: "#3A2A4D", background: "#fff", boxSizing: "border-box", outline: "none" }}
            />
          </div>
          <div style={{ fontSize: 13.5, fontStyle: "italic", color: "#9189A0", marginTop: 14 }}>Or browse by category below</div>
        </div>
      </section>

      {/* ── Featured Episode ── */}
      {featured && (
        <section style={{ background: "#fff" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 32px 20px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 44, alignItems: "center" }}>
            <div style={{ aspectRatio: "16/9", borderRadius: 18, background: "linear-gradient(135deg,#3A2456,#1A0A2E)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 20px 48px rgba(36,27,51,0.25)" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                <div style={{ width: 0, height: 0, borderLeft: "20px solid #fff", borderTop: "12px solid transparent", borderBottom: "12px solid transparent", marginLeft: 5 }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.2em", color: "#E91E8C", marginBottom: 14 }}>FEATURED EPISODE</div>
              <h2 style={{ fontFamily: PF, fontWeight: 800, fontSize: 32, lineHeight: 1.18, color: "#4A2A6B", margin: "0 0 12px" }}>{featured.title}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
                {featured.published_at && (
                  <span style={{ fontSize: 13.5, color: "#9189A0" }}>
                    {new Date(featured.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                )}
                {featured.category && (
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#fff", background: "#E91E8C", borderRadius: 999, padding: "5px 12px" }}>{featured.category}</span>
                )}
              </div>
              {featured.description && <p style={{ fontSize: 16, lineHeight: 1.7, color: "#6B6473", margin: "0 0 26px" }}>{featured.description}</p>}
              {featured.guest_name && <div style={{ fontSize: 14, color: "#E91E8C", fontWeight: 600, marginBottom: 22 }}>with {featured.guest_name}</div>}
              <a
                href={featured.youtube_id ? getEmbedUrl(featured.youtube_id) : "#"}
                target={featured.youtube_id ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ background: "#E91E8C", color: "#fff", border: "none", borderRadius: 999, padding: "15px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 10px 28px rgba(233,30,140,0.3)", textDecoration: "none", display: "inline-block" }}
              >
                Watch Now
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── Category Filters ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "30px 32px", display: "flex", gap: 11, flexWrap: "wrap", justifyContent: "center" }}>
          {FIXED_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{ ...(activeFilter === cat ? FILTER_ACTIVE : FILTER_IDLE), borderRadius: 999, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Episode Grid ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "50px 32px 70px" }}>
          {visible.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
              {visible.map((ep) => (
                <a
                  key={ep.id}
                  href={ep.youtube_id ? getEmbedUrl(ep.youtube_id) : undefined}
                  target={ep.youtube_id ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{ background: "#fff", border: "1px solid #F0EAF6", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 28px rgba(74,42,107,0.06)", textDecoration: "none", display: "block" }}
                >
                  <div style={{ aspectRatio: "16/9", background: "linear-gradient(135deg,#3A2456,#241B33)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                      <div style={{ width: 0, height: 0, borderLeft: "14px solid #fff", borderTop: "9px solid transparent", borderBottom: "9px solid transparent", marginLeft: 4 }} />
                    </div>
                  </div>
                  <div style={{ padding: "20px 22px 24px" }}>
                    <h3 style={{ fontFamily: PF, fontWeight: 700, fontSize: 17, lineHeight: 1.3, color: "#4A2A6B", margin: "0 0 8px" }}>{ep.title}</h3>
                    {ep.guest_name && <div style={{ fontSize: 13, color: "#E91E8C", fontWeight: 600, marginBottom: 2 }}>{ep.guest_name}</div>}
                    {ep.published_at && (
                      <div style={{ fontSize: 12.5, color: "#9189A0", marginBottom: 12 }}>
                        {new Date(ep.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    )}
                    {ep.category && (
                      <span style={{ display: "inline-block", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: "#C2557A", background: "#FBE9F2", borderRadius: 999, padding: "5px 11px", marginBottom: 12 }}>
                        {ep.category}
                      </span>
                    )}
                    {ep.description && <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#6B6473", margin: 0 }}>{ep.description}</p>}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#9189A0" }}>
              <div style={{ fontFamily: PF, fontSize: 24, color: "#4A2A6B", marginBottom: 8 }}>No episodes found</div>
              <div style={{ fontSize: 15 }}>Try a different search term or category.</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
