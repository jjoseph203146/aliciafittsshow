"use client";

import { useState, useMemo } from "react";
import type { Photo } from "@/lib/types";

const FILTER_ACTIVE = { background: "#4A2A6B", color: "#fff", border: "1.5px solid #4A2A6B" };
const FILTER_IDLE = { background: "#fff", color: "#6B6473", border: "1.5px solid #E6E1EC" };

const PLACEHOLDER_HEIGHTS = [300, 420, 220, 360, 240, 300, 440, 200, 340, 250, 380, 280];

export default function PhotosClient({ photos }: { photos: Photo[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<{ photo: Photo; index: number } | null>(null);

  const categories = useMemo(() => {
    const cats = [...new Set(photos.map((p) => p.category).filter(Boolean) as string[])];
    return ["All", ...cats];
  }, [photos]);

  const visible = useMemo(() => {
    if (activeFilter === "All") return photos;
    return photos.filter((p) => p.category === activeFilter);
  }, [photos, activeFilter]);

  function openLightbox(photo: Photo, index: number) {
    setLightbox({ photo, index });
  }

  function closeLightbox() {
    setLightbox(null);
  }

  function navLightbox(dir: 1 | -1) {
    if (!lightbox) return;
    const next = (lightbox.index + dir + visible.length) % visible.length;
    setLightbox({ photo: visible[next], index: next });
  }

  return (
    <>
      {/* ── Category Filters ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "34px 32px 6px", display: "flex", gap: 11, flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)} style={{ ...(activeFilter === cat ? FILTER_ACTIVE : FILTER_IDLE), borderRadius: 999, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Masonry Grid ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "34px 32px 80px" }}>
          {visible.length > 0 ? (
            <div style={{ columnCount: 3, columnGap: 22 }}>
              {visible.map((photo, i) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo, i)}
                  style={{
                    breakInside: "avoid",
                    marginBottom: 22,
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    height: photo.image_url ? undefined : PLACEHOLDER_HEIGHTS[i % PLACEHOLDER_HEIGHTS.length],
                    background: "linear-gradient(150deg,#6B3F8F,#3A2456)",
                  }}
                >
                  {photo.image_url ? (
                    <img src={photo.image_url} alt={photo.caption ?? "Gallery photo"} style={{ width: "100%", display: "block" }} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 46, height: 36, border: "2px solid rgba(248,165,200,0.7)", borderRadius: 6, position: "relative" }}>
                        <div style={{ position: "absolute", width: 11, height: 11, borderRadius: "50%", background: "rgba(248,165,200,0.7)", top: 6, left: 7 }} />
                      </div>
                    </div>
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(26,10,46,0.72))", pointerEvents: "none" }} />
                  {photo.category && (
                    <div style={{ position: "absolute", left: 16, bottom: 14, fontSize: 12.5, fontWeight: 600, color: "#fff", letterSpacing: "0.02em", pointerEvents: "none" }}>
                      {photo.category}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#9189A0" }}>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 24, color: "#4A2A6B", marginBottom: 8 }}>No photos yet</div>
              <div style={{ fontSize: 15 }}>Check back for photos from the show and community events.</div>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(16,6,28,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} style={{ position: "absolute", top: 22, right: 26, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 20, background: "none" }}>✕</button>
          <button onClick={(e) => { e.stopPropagation(); navLightbox(-1); }} style={{ position: "absolute", left: 26, top: "50%", transform: "translateY(-50%)", width: 50, height: 50, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 22, background: "none" }}>‹</button>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(760px,82vw)", borderRadius: 14 }}>
            {lightbox.photo.image_url ? (
              <img src={lightbox.photo.image_url} alt={lightbox.photo.caption ?? ""} style={{ width: "100%", borderRadius: 14, display: "block", maxHeight: "80vh", objectFit: "contain" }} />
            ) : (
              <div style={{ aspectRatio: "3/2", borderRadius: 14, background: "linear-gradient(135deg,#3A2456,#241B33)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 54, height: 42, border: "2px solid rgba(248,165,200,0.7)", borderRadius: 6 }} />
              </div>
            )}
            {lightbox.photo.caption && (
              <div style={{ textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 12 }}>{lightbox.photo.caption}</div>
            )}
          </div>
          <button onClick={(e) => { e.stopPropagation(); navLightbox(1); }} style={{ position: "absolute", right: 26, top: "50%", transform: "translateY(-50%)", width: 50, height: 50, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 22, background: "none" }}>›</button>
          <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", fontFamily: "ui-monospace,monospace", fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
            {lightbox.index + 1} / {visible.length}
          </div>
        </div>
      )}
    </>
  );
}
