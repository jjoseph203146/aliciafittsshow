"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Photo } from "@/lib/types";

const PF = "var(--font-playfair), serif";
const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid #E6E1EC", borderRadius: 9, padding: "12px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "var(--font-dm-sans), sans-serif" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 600, color: "#4A2A6B", marginBottom: 6 };

export default function PhotosManager() {
  const supabase = createClient();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function fetchPhotos() {
    const { data } = await supabase.from("photos").select("*").order("created_at", { ascending: false });
    setPhotos(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchPhotos(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) setPendingFile(file);
  }, []);

  async function uploadFile(file: File) {
    setUploading(true); setUploadError("");
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("photos").upload(fileName, file, { upsert: false });
    if (uploadErr) { setUploadError(uploadErr.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("photos").getPublicUrl(fileName);
    const { error: dbErr } = await supabase.from("photos").insert({ image_url: publicUrl, caption: caption || null, category: category || null });
    if (dbErr) { setUploadError(dbErr.message); } else { setCaption(""); setCategory(""); setPendingFile(null); fetchPhotos(); }
    setUploading(false);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = pendingFile || fileRef.current?.files?.[0];
    if (!file) return;
    await uploadFile(file);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function deletePhoto(photo: Photo) {
    if (!confirm("Delete this photo?")) return;
    const fileName = photo.image_url.split("/").pop();
    if (fileName) await supabase.storage.from("photos").remove([fileName]);
    await supabase.from("photos").delete().eq("id", photo.id);
    fetchPhotos();
  }

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: PF, fontWeight: 700, fontSize: 26, color: "#4A2A6B", margin: 0 }}>Photos</h1>
          <div style={{ fontSize: 13, color: "#9189A0", marginTop: 3 }}>{photos.length} photos in gallery</div>
        </div>
      </div>

      {/* Upload zone */}
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 24px rgba(74,42,107,0.06)", padding: "24px 28px", marginBottom: 24 }}>
        <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 18, color: "#4A2A6B", marginBottom: 18 }}>Upload Photo</div>
        <form onSubmit={handleFormSubmit}>
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? "#E91E8C" : "#D4C8E8"}`,
              borderRadius: 12, padding: "32px 20px", textAlign: "center",
              cursor: "pointer", marginBottom: 18, transition: "border-color 0.15s",
              background: dragOver ? "rgba(233,30,140,0.04)" : "#F9F5FC",
            }}
          >
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) setPendingFile(f); }} />
            {pendingFile ? (
              <div>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🖼</div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: "#4A2A6B" }}>{pendingFile.name}</div>
                <div style={{ fontSize: 12.5, color: "#9189A0", marginTop: 4 }}>{(pendingFile.size / 1024).toFixed(0)} KB — click to change</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 32, marginBottom: 10, color: "#C9BBD6" }}>↑</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#6B6473" }}>Drag & drop or click to select</div>
                <div style={{ fontSize: 12.5, color: "#9189A0", marginTop: 4 }}>JPG, PNG, WebP, GIF</div>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
            <div>
              <label style={labelStyle}>Caption</label>
              <input value={caption} onChange={(e) => setCaption(e.target.value)} style={inputStyle} placeholder="Optional caption" />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} placeholder="e.g. Behind the Scenes" />
            </div>
          </div>
          {uploadError && <div style={{ fontSize: 13, color: "#E11D48", marginBottom: 14 }}>{uploadError}</div>}
          <button type="submit" disabled={uploading || (!pendingFile && !fileRef.current?.files?.length)} style={{ background: "#E91E8C", color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", opacity: uploading ? 0.7 : 1, boxShadow: "0 8px 20px rgba(233,30,140,0.28)" }}>
            {uploading ? "Uploading…" : "Upload Photo"}
          </button>
        </form>
      </div>

      {/* Photos grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#9189A0" }}>Loading…</div>
      ) : photos.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: "48px", textAlign: "center", color: "#9189A0", fontStyle: "italic", fontSize: 14, boxShadow: "0 8px 24px rgba(74,42,107,0.06)" }}>No photos yet.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {photos.map((photo) => (
            <div key={photo.id} style={{ borderRadius: 12, overflow: "hidden", position: "relative", aspectRatio: "1/1", background: "#E8E0F2" }}>
              <img src={photo.image_url} alt={photo.caption ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(26,10,46,0)", transition: "background 0.2s" }} className="photo-overlay">
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, opacity: 0, transition: "opacity 0.2s" }} className="photo-actions">
                  {photo.caption && <div style={{ fontSize: 11.5, color: "#fff", textAlign: "center", padding: "0 10px", fontWeight: 500 }}>{photo.caption}</div>}
                  <button onClick={() => deletePhoto(photo)} style={{ background: "#FCE7EC", color: "#E11D48", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`.photo-overlay:hover { background: rgba(26,10,46,0.55) !important; } .photo-overlay:hover .photo-actions { opacity: 1 !important; }`}</style>
    </div>
  );
}
