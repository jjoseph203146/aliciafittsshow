"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { extractYouTubeId, getThumbnailUrl } from "@/lib/youtube";
import type { Episode } from "@/lib/types";

const CATEGORIES = ["Community", "Business", "Education", "Health", "Arts", "Faith", "Youth", "Other"];

export default function EpisodesManager() {
  const supabase = createClient();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [guestName, setGuestName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function fetchEpisodes() {
    const { data } = await supabase
      .from("episodes")
      .select("*")
      .order("created_at", { ascending: false });
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
    setYoutubeUrl("");
    setVideoId("");
    setTitle("");
    setGuestName("");
    setDescription("");
    setCategory("");
    setPublishedAt("");
    setIsPublished(false);
    setSaveError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!videoId) { setSaveError("Invalid YouTube URL — could not extract video ID."); return; }
    setSaving(true);
    setSaveError("");

    const { error } = await supabase.from("episodes").insert({
      youtube_url: youtubeUrl,
      youtube_id: videoId,
      title,
      guest_name: guestName || null,
      description: description || null,
      category: category || null,
      published_at: publishedAt || null,
      is_published: isPublished,
    });

    if (error) {
      setSaveError(error.message);
    } else {
      resetForm();
      setShowForm(false);
      fetchEpisodes();
    }
    setSaving(false);
  }

  async function togglePublished(ep: Episode) {
    await supabase.from("episodes").update({ is_published: !ep.is_published }).eq("id", ep.id);
    fetchEpisodes();
  }

  async function deleteEpisode(id: string) {
    if (!confirm("Delete this episode?")) return;
    await supabase.from("episodes").delete().eq("id", id);
    fetchEpisodes();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark-section">Episodes</h1>
          <p className="text-medium-purple/60 text-sm mt-1">{episodes.length} total</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); resetForm(); }}
          className="bg-hot-pink text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-hot-pink/85 transition-colors text-sm"
        >
          {showForm ? "Cancel" : "+ Add Episode"}
        </button>
      </div>

      {/* Add Episode Panel */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-display font-bold text-dark-section mb-5">Add New Episode</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-section/70 mb-1.5">
                YouTube URL <span className="text-hot-pink">*</span>
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                placeholder="https://youtube.com/watch?v=..."
              />
              {youtubeUrl && !videoId && (
                <p className="text-red-500 text-xs mt-1">Could not extract video ID from this URL.</p>
              )}
            </div>

            {videoId && (
              <div className="flex gap-4 items-start p-4 bg-lavender rounded-xl">
                <img
                  src={getThumbnailUrl(videoId)}
                  alt="Thumbnail preview"
                  className="w-32 aspect-video object-cover rounded-lg shrink-0"
                />
                <div>
                  <p className="text-xs font-semibold text-dark-section/50 uppercase tracking-wider mb-1">Video ID</p>
                  <code className="text-dark-section text-sm font-mono">{videoId}</code>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-dark-section/70 mb-1.5">
                  Title <span className="text-hot-pink">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                  placeholder="Episode title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Guest Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Published Date</label>
                <input
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 accent-hot-pink"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-dark-section/70">
                  Published (visible on site)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                placeholder="Brief episode description"
              />
            </div>

            {saveError && <p className="text-red-500 text-sm">{saveError}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-hot-pink text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-hot-pink/85 transition-colors disabled:opacity-60 text-sm"
              >
                {saving ? "Saving..." : "Save Episode"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); resetForm(); }}
                className="px-6 py-2.5 rounded-xl border border-lavender text-dark-section/60 hover:border-dark-section/30 text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-medium-purple/50">Loading...</div>
      ) : episodes.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <p className="font-display text-dark-section/50 italic">No episodes yet. Add your first episode above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {episodes.map((ep) => (
            <div key={ep.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <img
                src={getThumbnailUrl(ep.youtube_id)}
                alt={ep.title}
                className="w-24 aspect-video object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {ep.category && (
                    <span className="text-xs font-bold text-hot-pink tracking-wider uppercase">{ep.category}</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ep.is_published ? "bg-green-100 text-green-700" : "bg-lavender text-medium-purple"}`}>
                    {ep.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="font-display font-bold text-dark-section text-sm mt-0.5 truncate">{ep.title}</h3>
                {ep.guest_name && <p className="text-medium-purple text-xs">with {ep.guest_name}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => togglePublished(ep)}
                  className="text-xs text-medium-purple hover:text-deep-purple font-medium px-3 py-1.5 rounded-lg border border-lavender hover:border-medium-purple transition-colors"
                >
                  {ep.is_published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => deleteEpisode(ep.id)}
                  className="text-xs text-red-400 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg border border-red-100 hover:border-red-300 transition-colors"
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
