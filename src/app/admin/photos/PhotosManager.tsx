"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Photo } from "@/lib/types";

export default function AdminPhotosPage() {
  const supabase = createClient();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function fetchPhotos() {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });
    setPhotos(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchPhotos(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("photos")
      .upload(fileName, file, { upsert: false });

    if (uploadErr) {
      setUploadError(uploadErr.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("photos").getPublicUrl(fileName);

    const { error: dbErr } = await supabase.from("photos").insert({
      image_url: publicUrl,
      caption: caption || null,
      category: category || null,
    });

    if (dbErr) {
      setUploadError(dbErr.message);
    } else {
      setCaption("");
      setCategory("");
      if (fileRef.current) fileRef.current.value = "";
      fetchPhotos();
    }
    setUploading(false);
  }

  async function deletePhoto(photo: Photo) {
    if (!confirm("Delete this photo?")) return;
    const fileName = photo.image_url.split("/").pop();
    if (fileName) await supabase.storage.from("photos").remove([fileName]);
    await supabase.from("photos").delete().eq("id", photo.id);
    fetchPhotos();
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-dark-section">Photos</h1>
        <p className="text-medium-purple/60 text-sm mt-1">{photos.length} photos in gallery</p>
      </div>

      {/* Upload form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-display font-bold text-dark-section mb-5">Upload Photo</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-section/70 mb-1.5">
              Photo File <span className="text-hot-pink">*</span>
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              required
              className="w-full text-sm text-dark-section/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-hot-pink file:text-white hover:file:bg-hot-pink/85 cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                placeholder="Optional caption"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                placeholder="e.g. Behind the Scenes"
              />
            </div>
          </div>
          {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
          <button
            type="submit"
            disabled={uploading}
            className="bg-hot-pink text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-hot-pink/85 transition-colors disabled:opacity-60 text-sm"
          >
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
        </form>
      </div>

      {/* Photos grid */}
      {loading ? (
        <div className="text-center py-12 text-medium-purple/50">Loading...</div>
      ) : photos.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <p className="font-display text-dark-section/50 italic">No photos yet. Upload the first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group rounded-xl overflow-hidden bg-lavender aspect-square">
              <img src={photo.image_url} alt={photo.caption ?? ""} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-dark-section/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                {photo.caption && (
                  <p className="text-white text-xs text-center line-clamp-2">{photo.caption}</p>
                )}
                <button
                  onClick={() => deletePhoto(photo)}
                  className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

