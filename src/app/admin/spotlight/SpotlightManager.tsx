"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Spotlight } from "@/lib/types";

const CATEGORIES = ["Community", "Business", "Education", "Health", "Arts", "Faith", "Youth", "Other"];

export default function AdminSpotlightPage() {
  const supabase = createClient();
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [org, setOrg] = useState("");
  const [bio, setBio] = useState("");
  const [impact, setImpact] = useState("");
  const [category, setCategory] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function fetchSpotlights() {
    const { data } = await supabase
      .from("spotlights")
      .select("*")
      .order("created_at", { ascending: false });
    setSpotlights(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchSpotlights(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function resetForm() {
    setName(""); setTitle(""); setOrg(""); setBio(""); setImpact("");
    setCategory(""); setPhotoUrl(""); setIsFeatured(false); setIsPublished(false);
    setSaveError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");

    const { error } = await supabase.from("spotlights").insert({
      name,
      title: title || null,
      org: org || null,
      bio: bio || null,
      impact: impact || null,
      category: category || null,
      photo_url: photoUrl || null,
      is_featured: isFeatured,
      is_published: isPublished,
    });

    if (error) {
      setSaveError(error.message);
    } else {
      resetForm();
      setShowForm(false);
      fetchSpotlights();
    }
    setSaving(false);
  }

  async function togglePublished(s: Spotlight) {
    await supabase.from("spotlights").update({ is_published: !s.is_published }).eq("id", s.id);
    fetchSpotlights();
  }

  async function deleteSpotlight(id: string) {
    if (!confirm("Delete this spotlight?")) return;
    await supabase.from("spotlights").delete().eq("id", id);
    fetchSpotlights();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark-section">Spotlight</h1>
          <p className="text-medium-purple/60 text-sm mt-1">{spotlights.length} total</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); resetForm(); }}
          className="bg-hot-pink text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-hot-pink/85 transition-colors text-sm"
        >
          {showForm ? "Cancel" : "+ Add Spotlight"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-display font-bold text-dark-section mb-5">Add Spotlight</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-dark-section/70 mb-1.5">
                  Name <span className="text-hot-pink">*</span>
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                  placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Title / Role</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                  placeholder="e.g. Executive Director" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Organization</label>
                <input type="text" value={org} onChange={(e) => setOrg(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                  placeholder="Organization name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors">
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Photo URL</label>
                <input type="url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                  placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Impact Statement</label>
              <textarea value={impact} onChange={(e) => setImpact(e.target.value)} rows={3}
                className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                placeholder="What impact are they making in the community?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-section/70 mb-1.5">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
                className="w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple text-dark-section text-sm transition-colors"
                placeholder="Brief biography" />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-dark-section/70 cursor-pointer">
                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-hot-pink" />
                Featured (shown first)
              </label>
              <label className="flex items-center gap-2 text-sm text-dark-section/70 cursor-pointer">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 accent-hot-pink" />
                Published
              </label>
            </div>
            {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="bg-hot-pink text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-hot-pink/85 transition-colors disabled:opacity-60 text-sm">
                {saving ? "Saving..." : "Save Spotlight"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); resetForm(); }}
                className="px-6 py-2.5 rounded-xl border border-lavender text-dark-section/60 hover:border-dark-section/30 text-sm transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-medium-purple/50">Loading...</div>
      ) : spotlights.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <p className="font-display text-dark-section/50 italic">No spotlights yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {spotlights.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
              {s.photo_url ? (
                <img src={s.photo_url} alt={s.name} className="w-12 h-12 rounded-full object-cover border-2 border-hot-pink/30 shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-hot-pink/10 border-2 border-hot-pink/20 shrink-0 flex items-center justify-center">
                  <span className="font-pinyon text-xl text-hot-pink">{s.name.charAt(0)}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {s.category && <span className="text-xs font-bold text-hot-pink tracking-wider uppercase">{s.category}</span>}
                  {s.is_featured && <span className="text-xs px-2 py-0.5 rounded-full bg-soft-pink/30 text-deep-purple font-medium">Featured</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.is_published ? "bg-green-100 text-green-700" : "bg-lavender text-medium-purple"}`}>
                    {s.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="font-display font-bold text-dark-section text-sm mt-0.5">{s.name}</h3>
                {s.title && <p className="text-medium-purple text-xs">{s.title}{s.org ? ` Â· ${s.org}` : ""}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => togglePublished(s)}
                  className="text-xs text-medium-purple hover:text-deep-purple font-medium px-3 py-1.5 rounded-lg border border-lavender hover:border-medium-purple transition-colors">
                  {s.is_published ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => deleteSpotlight(s.id)}
                  className="text-xs text-red-400 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg border border-red-100 hover:border-red-300 transition-colors">
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

