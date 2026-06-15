"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { extractYouTubeId, getThumbnailUrl } from "@/lib/youtube";
import type { Episode } from "@/lib/types";

const PF = "var(--font-playfair), serif";
const CATS = ["Community", "Business", "Education", "Finance", "Health", "Arts", "Faith", "Youth", "Events", "Interviews", "Other"];

const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid #E6E1EC", borderRadius: 9, padding: "12px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "var(--font-dm-sans), sans-serif" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 600, color: "#4A2A6B", marginBottom: 6 };

export default function EpisodesManager() {
  const supabase = createClient();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [guestName, setGuestName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  async function fetchEpisodes() {
    const { data } = await supabase.from("episodes").select("*").order("created_at", { ascending: false });
    setEpisodes(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchEpisodes(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleUrlChange(url: string) {
    setYoutubeUrl(url);
    const id = extractYouTubeId(url);
    setVideoId(id ?? "");
  }

  function resetForm() {
    setYoutubeUrl(""); setVideoId(""); setTitle(""); setGuestName("");
    setDescription(""); setCategory(""); setPublishedAt(""); setIsPublished(false);
    setSaveError(""); setEditingId(null);
  }

  function openAdd() { resetForm(); setPanelOpen(true); }

  function openEdit(ep: Episode) {
    setEditingId(ep.id);
    setYoutubeUrl(ep.youtube_url);
    setVideoId(ep.youtube_id);
    setTitle(ep.title);
    setGuestName(ep.guest_name ?? "");
    setDescription(ep.description ?? "");
    setCategory(ep.category ?? "");
    setPublishedAt(ep.published_at ? ep.published_at.split("T")[0] : "");
    setIsPublished(ep.is_published);
    setSaveError("");
    setPanelOpen(true);
  }

  function closePanel() { setPanelOpen(false); resetForm(); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!videoId) { setSaveError("Could not extract YouTube video ID."); return; }
    setSaving(true); setSaveError("");

    const payload = {
      youtube_url: youtubeUrl, youtube_id: videoId, title,
      guest_name: guestName || null, description: description || null,
      category: category || null, published_at: publishedAt || null, is_published: isPublished,
    };

    const { error } = editingId
      ? await supabase.from("episodes").update(payload).eq("id", editingId)
      : await supabase.from("episodes").insert(payload);

    if (error) { setSaveError(error.message); }
    else { closePanel(); fetchEpisodes(); }
    setSaving(false);
  }

  async function togglePublished(ep: Episode) {
    await supabase.from("episodes").update({ is_published: !ep.is_published }).eq("id", ep.id);
    fetchEpisodes();
  }

  async function deleteEpisode(ep: Episode) {
    if (!confirm(`Delete "${ep.title}"? This cannot be undone.`)) return;
    await supabase.from("episodes").delete().eq("id", ep.id);
    fetchEpisodes();
  }

  return (
    <div style={{ padding: "28px 32px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: PF, fontWeight: 700, fontSize: 26, color: "#4A2A6B", margin: 0 }}>Episodes</h1>
          <div style={{ fontSize: 13, color: "#9189A0", marginTop: 3 }}>{episodes.length} total</div>
        </div>
        <button onClick={openAdd} style={{ background: "#E91E8C", color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 8px 20px rgba(233,30,140,0.28)" }}>
          + Add Episode
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 24px rgba(74,42,107,0.06)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "54px 1fr 130px 110px 100px 90px", padding: "12px 18px", borderBottom: "1px solid #F0EAF6" }}>
          {["", "Title", "Guest", "Category", "Status", ""].map((h, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 700, color: "#9189A0", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#9189A0", fontSize: 14 }}>Loading…</div>
        ) : episodes.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#9189A0", fontStyle: "italic", fontSize: 14 }}>No episodes yet — add your first one.</div>
        ) : (
          episodes.map((ep) => (
            <div key={ep.id} style={{ display: "grid", gridTemplateColumns: "54px 1fr 130px 110px 100px 90px", padding: "12px 18px", borderBottom: "1px solid #F9F5FC", alignItems: "center" }}>
              <img
                src={ep.youtube_id ? getThumbnailUrl(ep.youtube_id) : ""}
                alt=""
                style={{ width: 54, height: 34, objectFit: "cover", borderRadius: 6, background: "#E8E0F2" }}
              />
              <div style={{ minWidth: 0, paddingRight: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#4A2A6B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ep.title}</div>
              </div>
              <div style={{ fontSize: 13, color: "#6B6473", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ep.guest_name ?? "—"}</div>
              <div style={{ fontSize: 12.5, color: "#6B6473" }}>{ep.category ?? "—"}</div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "4px 10px", background: ep.is_published ? "#E4F4EC" : "#F4ECF8", color: ep.is_published ? "#2E8B62" : "#9189A0" }}>
                  {ep.is_published ? "Published" : "Draft"}
                </span>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {/* Edit pencil */}
                <button
                  onClick={() => openEdit(ep)}
                  title="Edit"
                  style={{ background: "#F4ECF8", border: "none", borderRadius: 7, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M9.5 1.5L11.5 3.5L4.5 10.5H2.5V8.5L9.5 1.5Z" stroke="#5B2D8E" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                </button>
                {/* Toggle published */}
                <button
                  onClick={() => togglePublished(ep)}
                  title={ep.is_published ? "Unpublish" : "Publish"}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#9B59B6", fontSize: 11.5, fontWeight: 600, padding: 0 }}
                >
                  {ep.is_published ? "Hide" : "Show"}
                </button>
                {/* Delete */}
                <button
                  onClick={() => deleteEpisode(ep)}
                  title="Delete"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#E11D48", fontSize: 11.5, fontWeight: 600, padding: 0 }}
                >
                  Del
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Slide Panel */}
      {panelOpen && (
        <>
          <div onClick={closePanel} style={{ position: "fixed", inset: 0, background: "rgba(26,10,46,0.45)", zIndex: 40 }} />
          <div style={{ position: "fixed", right: 0, top: 0, height: "100%", width: 440, background: "#fff", boxShadow: "-20px 0 60px rgba(0,0,0,0.2)", zIndex: 50, overflowY: "auto" }}>
            <div style={{ padding: "24px 28px", borderBottom: "1px solid #EFE6F5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 20, color: "#4A2A6B" }}>{editingId ? "Edit Episode" : "Add Episode"}</div>
              <button onClick={closePanel} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#9189A0", lineHeight: 1 }}>×</button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: "24px 28px" }}>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>YouTube URL *</label>
                <input value={youtubeUrl} onChange={(e) => handleUrlChange(e.target.value)} required placeholder="https://youtube.com/watch?v=..." style={inputStyle} />
                {youtubeUrl && !videoId && <div style={{ fontSize: 12, color: "#E11D48", marginTop: 5 }}>Could not extract video ID</div>}
              </div>
              {videoId && (
                <div style={{ marginBottom: 18, background: "#F7F2FB", borderRadius: 10, padding: 14, display: "flex", gap: 14, alignItems: "center" }}>
                  <img src={getThumbnailUrl(videoId)} alt="" style={{ width: 96, borderRadius: 7, objectFit: "cover", aspectRatio: "16/9" }} />
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: "#9189A0", letterSpacing: "0.08em", marginBottom: 4 }}>VIDEO ID</div>
                    <code style={{ fontSize: 13, color: "#4A2A6B" }}>{videoId}</code>
                  </div>
                </div>
              )}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Title *</label>
                <input required value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Guest Name</label>
                <input value={guestName} onChange={(e) => setGuestName(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
                <div>
                  <label style={labelStyle}>Date</label>
                  <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, background: "#fff" }}>
                    <option value="">Select…</option>
                    {CATS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#4A2A6B", fontWeight: 500, marginBottom: 22, cursor: "pointer" }}>
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} style={{ accentColor: "#E91E8C", width: 16, height: 16 }} />
                Publish immediately
              </label>
              {saveError && <div style={{ fontSize: 13, color: "#E11D48", marginBottom: 14 }}>{saveError}</div>}
              <div style={{ display: "flex", gap: 12 }}>
                <button type="submit" disabled={saving} style={{ flex: 1, background: "#E91E8C", color: "#fff", border: "none", borderRadius: 10, padding: "15px", fontSize: 15, fontWeight: 600, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
                  {saving ? "Saving…" : editingId ? "Save Changes" : "Save Episode"}
                </button>
                <button type="button" onClick={closePanel} style={{ padding: "15px 20px", background: "#F4ECF8", color: "#4A2A6B", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
