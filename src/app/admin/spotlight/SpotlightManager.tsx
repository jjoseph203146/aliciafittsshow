"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Spotlight } from "@/lib/types";

const PF = "var(--font-playfair), serif";
const CATS = ["Community", "Business", "Education", "Health", "Arts", "Faith", "Youth", "Other"];

const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid #E6E1EC", borderRadius: 9, padding: "12px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "var(--font-dm-sans), sans-serif" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 600, color: "#4A2A6B", marginBottom: 6 };

export default function SpotlightManager() {
  const supabase = createClient();
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [org, setOrg] = useState("");
  const [bio, setBio] = useState("");
  const [impact, setImpact] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // Photo upload state
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);
  const [photoDragOver, setPhotoDragOver] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function fetchSpotlights() {
    const { data } = await supabase.from("spotlights").select("*").order("created_at", { ascending: false });
    setSpotlights(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchSpotlights(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function resetForm() {
    setName(""); setTitle(""); setOrg(""); setBio(""); setImpact("");
    setCategory(""); setIsFeatured(false); setIsPublished(false);
    setPendingFile(null); setExistingPhotoUrl(null); setSaveError("");
  }

  function openPanel() { resetForm(); setPanelOpen(true); }
  function closePanel() { setPanelOpen(false); resetForm(); }

  const handlePhotoDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setPhotoDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) setPendingFile(file);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSaveError("");

    let photoUrl: string | null = existingPhotoUrl;

    // Upload photo if a new file was selected
    if (pendingFile) {
      setPhotoUploading(true);
      const ext = pendingFile.name.split(".").pop();
      const fileName = `spotlight-${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("photos").upload(fileName, pendingFile, { upsert: false });
      setPhotoUploading(false);
      if (uploadErr) {
        setSaveError(`Photo upload failed: ${uploadErr.message}`);
        setSaving(false);
        return;
      }
      const { data: { publicUrl } } = supabase.storage.from("photos").getPublicUrl(fileName);
      photoUrl = publicUrl;
    }

    const { error } = await supabase.from("spotlights").insert({
      name, title: title || null, org: org || null, bio: bio || null,
      impact: impact || null, category: category || null,
      photo_url: photoUrl, is_featured: isFeatured, is_published: isPublished,
    });

    if (error) { setSaveError(error.message); }
    else { closePanel(); fetchSpotlights(); }
    setSaving(false);
  }

  async function togglePublished(s: Spotlight) {
    await supabase.from("spotlights").update({ is_published: !s.is_published }).eq("id", s.id);
    fetchSpotlights();
  }

  async function deleteSpotlight(s: Spotlight) {
    if (!confirm(`Delete "${s.name}"? This cannot be undone.`)) return;
    await supabase.from("spotlights").delete().eq("id", s.id);
    fetchSpotlights();
  }

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: PF, fontWeight: 700, fontSize: 26, color: "#4A2A6B", margin: 0 }}>Spotlight</h1>
          <div style={{ fontSize: 13, color: "#9189A0", marginTop: 3 }}>{spotlights.length} total</div>
        </div>
        <button onClick={openPanel} style={{ background: "#E91E8C", color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 8px 20px rgba(233,30,140,0.28)" }}>
          + Add Spotlight
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#9189A0" }}>Loading…</div>
      ) : spotlights.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: "48px", textAlign: "center", color: "#9189A0", fontStyle: "italic", fontSize: 14, boxShadow: "0 8px 24px rgba(74,42,107,0.06)" }}>No spotlights yet.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {spotlights.map((s) => (
            <div key={s.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 24px rgba(74,42,107,0.06)" }}>
              <div style={{ aspectRatio: "3/2", background: "linear-gradient(150deg,#6B3F8F,#3A2456)", position: "relative" }}>
                {s.photo_url ? (
                  <img src={s.photo_url} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: "var(--font-pinyon-script), cursive", fontSize: 52, color: "rgba(248,165,200,0.5)" }}>{s.name.charAt(0)}</div>
                  </div>
                )}
                <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 6 }}>
                  {s.is_featured && <span style={{ fontSize: 9.5, fontWeight: 700, background: "#E91E8C", color: "#fff", borderRadius: 999, padding: "3px 8px" }}>FEATURED</span>}
                  <span style={{ fontSize: 9.5, fontWeight: 700, borderRadius: 999, padding: "3px 8px", background: s.is_published ? "#E4F4EC" : "rgba(255,255,255,0.85)", color: s.is_published ? "#2E8B62" : "#9189A0" }}>{s.is_published ? "Published" : "Draft"}</span>
                </div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 16, color: "#4A2A6B", marginBottom: 3 }}>{s.name}</div>
                {s.org && <div style={{ fontSize: 12.5, color: "#E91E8C", fontWeight: 600, marginBottom: 6 }}>{s.org}</div>}
                {s.impact && <div style={{ fontSize: 13, color: "#6B6473", lineHeight: 1.4, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.impact}</div>}
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => togglePublished(s)} style={{ flex: 1, background: "#F4ECF8", color: "#4A2A6B", border: "none", borderRadius: 8, padding: "9px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
                    {s.is_published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => deleteSpotlight(s)} style={{ background: "#FCE7EC", color: "#E11D48", border: "none", borderRadius: 8, padding: "9px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide Panel */}
      {panelOpen && (
        <>
          <div onClick={closePanel} style={{ position: "fixed", inset: 0, background: "rgba(26,10,46,0.45)", zIndex: 40 }} />
          <div style={{ position: "fixed", right: 0, top: 0, height: "100%", width: 440, background: "#fff", boxShadow: "-20px 0 60px rgba(0,0,0,0.2)", zIndex: 50, overflowY: "auto" }}>
            <div style={{ padding: "24px 28px", borderBottom: "1px solid #EFE6F5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 20, color: "#4A2A6B" }}>Add Spotlight</div>
              <button onClick={closePanel} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#9189A0", lineHeight: 1 }}>×</button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: "24px 28px" }}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Name *</label>
                <input required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Full name" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Title / Role</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Organization</label>
                  <input value={org} onChange={(e) => setOrg(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, background: "#fff" }}>
                  <option value="">Select…</option>
                  {CATS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Photo upload */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Photo <span style={{ fontWeight: 400, color: "#9189A0" }}>(optional)</span></label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setPhotoDragOver(true); }}
                  onDragLeave={() => setPhotoDragOver(false)}
                  onDrop={handlePhotoDrop}
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: `2px dashed ${photoDragOver ? "#E91E8C" : "#D4C8E8"}`,
                    borderRadius: 10, padding: "20px 14px", textAlign: "center",
                    cursor: "pointer", transition: "border-color 0.15s",
                    background: photoDragOver ? "rgba(233,30,140,0.04)" : "#F9F5FC",
                  }}
                >
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) setPendingFile(f); }} />
                  {pendingFile ? (
                    <div>
                      <div style={{ fontSize: 22, marginBottom: 6 }}>🖼</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#4A2A6B" }}>{pendingFile.name}</div>
                      <div style={{ fontSize: 11.5, color: "#9189A0", marginTop: 3 }}>{(pendingFile.size / 1024).toFixed(0)} KB — click to change</div>
                    </div>
                  ) : existingPhotoUrl ? (
                    <div>
                      <img src={existingPhotoUrl} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8, marginBottom: 6 }} />
                      <div style={{ fontSize: 11.5, color: "#9189A0" }}>Click to replace photo</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 24, marginBottom: 6, color: "#C9BBD6" }}>↑</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#6B6473" }}>Drag & drop or click to select</div>
                      <div style={{ fontSize: 11.5, color: "#9189A0", marginTop: 3 }}>Leave empty to use gradient placeholder</div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Impact Statement</label>
                <textarea value={impact} onChange={(e) => setImpact(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: 22, marginBottom: 22 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#4A2A6B", cursor: "pointer" }}>
                  <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} style={{ accentColor: "#E91E8C", width: 16, height: 16 }} />
                  Featured
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#4A2A6B", cursor: "pointer" }}>
                  <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} style={{ accentColor: "#E91E8C", width: 16, height: 16 }} />
                  Published
                </label>
              </div>
              {saveError && <div style={{ fontSize: 13, color: "#E11D48", marginBottom: 14 }}>{saveError}</div>}
              <div style={{ display: "flex", gap: 12 }}>
                <button type="submit" disabled={saving || photoUploading} style={{ flex: 1, background: "#E91E8C", color: "#fff", border: "none", borderRadius: 10, padding: "15px", fontSize: 15, fontWeight: 600, cursor: "pointer", opacity: saving || photoUploading ? 0.7 : 1 }}>
                  {photoUploading ? "Uploading photo…" : saving ? "Saving…" : "Save Spotlight"}
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
