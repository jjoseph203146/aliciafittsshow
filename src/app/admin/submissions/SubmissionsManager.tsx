"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Submission } from "@/lib/types";

const STATUS_COLORS: Record<Submission["status"], string> = {
  new: "bg-hot-pink/10 text-hot-pink",
  reviewed: "bg-blue-100 text-blue-700",
  contacted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-500",
};

export default function AdminSubmissionsPage() {
  const supabase = createClient();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function fetchSubmissions() {
    const { data } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setSubmissions(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchSubmissions(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function updateStatus(id: string, status: Submission["status"]) {
    await supabase.from("submissions").update({ status }).eq("id", id);
    fetchSubmissions();
  }

  const statusOptions: Submission["status"][] = ["new", "reviewed", "contacted", "rejected"];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-dark-section">Submissions</h1>
        <p className="text-medium-purple/60 text-sm mt-1">
          {submissions.filter((s) => s.status === "new").length} new Â·{" "}
          {submissions.length} total
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-medium-purple/50">Loading...</div>
      ) : submissions.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <p className="font-display text-dark-section/50 italic">No submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div
                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-lavender/30 transition-colors"
                onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${STATUS_COLORS[sub.status]}`}>
                      {sub.status}
                    </span>
                    <span className="text-dark-section/30 text-xs">
                      {new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-dark-section text-sm">{sub.full_name}</h3>
                  <p className="text-medium-purple/60 text-xs">{sub.email}{sub.org ? ` Â· ${sub.org}` : ""}</p>
                </div>
                <svg
                  className={`w-4 h-4 text-dark-section/30 shrink-0 transition-transform ${expanded === sub.id ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {expanded === sub.id && (
                <div className="px-4 pb-5 border-t border-lavender">
                  <div className="pt-4 space-y-3">
                    <div>
                      <p className="text-xs font-bold text-dark-section/40 uppercase tracking-wider mb-1">Story</p>
                      <p className="text-dark-section/80 text-sm leading-relaxed whitespace-pre-wrap">{sub.story}</p>
                    </div>
                    {sub.phone && (
                      <div>
                        <p className="text-xs font-bold text-dark-section/40 uppercase tracking-wider mb-0.5">Phone</p>
                        <p className="text-dark-section/80 text-sm">{sub.phone}</p>
                      </div>
                    )}
                    {sub.heard_from && (
                      <div>
                        <p className="text-xs font-bold text-dark-section/40 uppercase tracking-wider mb-0.5">How they heard</p>
                        <p className="text-dark-section/80 text-sm">{sub.heard_from}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-dark-section/40 uppercase tracking-wider mb-2">Update Status</p>
                      <div className="flex flex-wrap gap-2">
                        {statusOptions.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(sub.id, s)}
                            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                              sub.status === s
                                ? STATUS_COLORS[s] + " ring-1 ring-current"
                                : "bg-lavender text-dark-section/50 hover:bg-lavender/70"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

