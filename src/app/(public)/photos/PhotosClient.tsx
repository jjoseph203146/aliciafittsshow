"use client";

import { useState, useMemo } from "react";
import type { Photo } from "@/lib/types";

const FILTER_ACTIVE: React.CSSProperties = { background: "#4A2A6B", color: "#fff", border: "1.5px solid #4A2A6B" };
const FILTER_IDLE: React.CSSProperties = { background: "#fff", color: "#6B6473", border: "1.5px solid #E6E1EC" };

const PLACEHOLDER_HEIGHTS = [320, 460, 240, 400, 260, 340, 480, 210, 370, 280, 420, 300];
const PLACEHOLDER_LABELS = ["Show Recording", "Community Event", "Guest Photo", "Behind the Scenes"];

const PLACEHOLDER_PHOTOS: Photo[] = PLACEHOLDER_HEIGHTS.map((_, i) => ({
  id: `ph${i}`,
  image_url: "",
  category: PLACEHOLDER_LABELS[i % 4],
  caption: PLACEHOLDER_LABELS[i % 4],
  created_at: "",
}));

type DisplayPhoto = Photo & { _height?: number };

export default function PhotosClient({ photos }: { photos: Photo[] }) {
  const usingPlaceholders = photos.length === 0;
  const source: DisplayPhoto[] = usingPlaceholders
    ? PLACEHOLDER_PHOTOS.map((p, i) => ({ ...p, _height: PLACEHOLDER_HEIGHTS[i] }))
    : photos;

  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = [...new Set(source.map((p) => p.category).filter(Boolean) as string[])];
    return ["All", ...cats];
  }, [source]);

  const visible: DisplayPhoto[] = useMemo(() => {
    if (activeFilter === "All") return source;
    return source.filter((p) => p.category === activeFilter);
  }, [source, activeFilter]);

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function navLightbox(dir: 1 | -1) {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + visible.length) % visible.length);
  }

  const lbPhoto = lightboxIndex !== null ? visible[lightboxIndex] : null;

  return (
    <>
      <style>{`
        .photo-card { position: relative; cursor: pointer; border-radius: 16px; overflow: hidden; transition: box-shadow 0.18s; break-inside: avoid; margin-bottom: 22px; }
        .photo-card:hover { box-shadow: 0 0 0 3px #E91E8C, 0 14px 40px rgba(74,42,107,0.18) !important; }
        .photo-card:hover .photo-hover-overlay { opacity: 1 !important; }
      `}</style>

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
          <div style={{ columnCount: 3, columnGap: 22 }}>
            {visible.map((photo, i) => {
              const h = (photo as DisplayPhoto)._height ?? PLACEHOLDER_HEIGHTS[i % PLACEHOLDER_HEIGHTS.length];
              return (
                <div
                  key={photo.id}
                  className="photo-card"
                  onClick={() => openLightbox(i)}
                  style={{
                    height: photo.image_url ? undefined : h,
                    background: "linear-gradient(150deg,#6B3F8F,#3A2456)",
                  }}
                >
                  {photo.image_url ? (
                    <img src={photo.image_url} alt={photo.caption ?? "Gallery photo"} style={{ width: "100%", display: "block" }} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                      {/* Camera icon placeholder */}
                      <div style={{ width: 52, height: 40, border: "2px solid rgba(248,165,200,0.6)", borderRadius: 8, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(248,165,200,0.6)" }} />
                        <div style={{ position: "absolute", top: -6, left: 14, width: 12, height: 6, background: "rgba(248,165,200,0.4)", borderRadius: "3px 3px 0 0" }} />
                      </div>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(248,165,200,0.7)", letterSpacing: "0.06em", textAlign: "center" }}>{photo.caption}</div>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 50%,rgba(26,10,46,0.65))", pointerEvents: "none" }} />
                  {/* Hover overlay with magnifier */}
                  <div
                    className="photo-hover-overlay"
                    style={{ position: "absolute", inset: 0, background: "rgba(26,10,46,0.62)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.18s", pointerEvents: "none" }}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(233,30,140,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="10.5" cy="10.5" r="6.5" stroke="white" strokeWidth="2"/>
                        <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  {/* Label at bottom */}
                  {photo.category && !photo.image_url && (
                    <div style={{ position: "absolute", left: 14, bottom: 12, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", color: "rgba(255,255,255,0.85)", pointerEvents: "none", textTransform: "uppercase" }}>
                      {photo.category}
                    </div>
                  )}
                  {photo.image_url && photo.category && (
                    <div style={{ position: "absolute", left: 14, bottom: 12, fontSize: 12, fontWeight: 600, color: "#fff", letterSpacing: "0.02em", pointerEvents: "none" }}>
                      {photo.category}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lbPhoto !== null && lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(16,6,28,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            style={{ position: "absolute", top: 22, right: 26, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 20, background: "none" }}
          >✕</button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navLightbox(-1); }}
            style={{ position: "absolute", left: 26, top: "50%", transform: "translateY(-50%)", width: 50, height: 50, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 26, background: "none" }}
          >‹</button>

          {/* Image / placeholder */}
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(760px,82vw)", borderRadius: 14 }}>
            {lbPhoto.image_url ? (
              <img src={lbPhoto.image_url} alt={lbPhoto.caption ?? ""} style={{ width: "100%", borderRadius: 14, display: "block", maxHeight: "80vh", objectFit: "contain" }} />
            ) : (
              <div style={{ aspectRatio: "3/2", borderRadius: 14, background: "linear-gradient(135deg,#3A2456,#1A0A2E)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{ width: 72, height: 54, border: "2px solid rgba(248,165,200,0.5)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid rgba(248,165,200,0.5)" }} />
                </div>
                {lbPhoto.caption && (
                  <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(248,165,200,0.8)", letterSpacing: "0.06em" }}>{lbPhoto.caption}</div>
                )}
              </div>
            )}
            {lbPhoto.image_url && lbPhoto.caption && (
              <div style={{ textAlign: "center", color: "rgba(255,255,255,0.75)", fontSize: 14, marginTop: 12 }}>{lbPhoto.caption}</div>
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navLightbox(1); }}
            style={{ position: "absolute", right: 26, top: "50%", transform: "translateY(-50%)", width: 50, height: 50, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 26, background: "none" }}
          >›</button>

          {/* Counter */}
          <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", fontFamily: "ui-monospace,monospace", fontSize: 13, color: "rgba(255,255,255,0.75)", background: "rgba(0,0,0,0.35)", borderRadius: 999, padding: "6px 16px" }}>
            {lightboxIndex + 1} / {visible.length}
          </div>
        </div>
      )}
    </>
  );
}
