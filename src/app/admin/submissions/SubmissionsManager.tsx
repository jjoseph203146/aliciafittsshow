"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Submission } from "@/lib/types";

const PF = "var(--font-playfair), serif";

const STATUS_STYLE: Record<Submission["status"], { bg: string; color: string }> = {
  new: { bg: "#FBE9F2", color: "#E91E8C" },
  reviewed: { bg: "#EDE0F7", color: "#5B2D8E" },
  contacted: { bg: "#E4F4EC", color: "#2E8B62" },
  rejected: { bg: "#FCE7EC", color: "#E11D48" },
};

export default function SubmissionsManager() {
  const supabase = createClient();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function fetchSubmissions() {
    const { data } = await supabase.from("submissions").select("*").order("created_at", { ascending: false });
    setSubmissions(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchSubmissions(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function updateStatus(id: string, status: Submission["status"]) {
    await supabase.from("submissions").update({ status }).eq("id", id);
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  }

  async function softDelete(id: string) {
    if (!confirm("Mark this submission as deleted? This sets status to rejected.")) return;
    await updateStatus(id, "rejected");
  }

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: PF, fontWeight: 700, fontSize: 26, color: "#4A2A6B", margin: 0 }}>Submissions</h1>
        <div style={{ fontSize: 13, color: "#9189A0", marginTop: 3 }}>
          {submissions.filter((s) => s.status === "new").length} new · {submissions.length} total
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#9189A0" }}>Loading…</div>
      ) : submissions.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: "48px", textAlign: "center", color: "#9189A0", fontStyle: "italic", fontSize: 14, boxShadow: "0 8px 24px rgba(74,42,107,0.06)" }}>No submissions yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {submissions.map((sub) => {
            const sc = STATUS_STYLE[sub.status];
            const isOpen = expanded === sub.id;
            return (
              <div key={sub.id} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 24px rgba(74,42,107,0.06)", overflow: "hidden" }}>
                {/* Card header */}
                <div
                  onClick={() => setExpanded(isOpen ? null : sub.id)}
                  style={{ padding: "16px 22px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderBottom: isOpen ? "1px solid #F0EAF6" : "none" }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", borderRadius: 999, padding: "4px 10px", background: sc.bg, color: sc.color }}>{sub.status}</span>
                      <span style={{ fontSize: 12, color: "#9189A0" }}>{new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 16, color: "#4A2A6B" }}>{sub.full_name}</div>
                    <div style={{ fontSize: 12.5, color: "#9189A0" }}>{sub.email}{sub.org ? ` · ${sub.org}` : ""}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    {sub.status !== "reviewed" && sub.status !== "contacted" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateStatus(sub.id, "reviewed"); }}
                        style={{ background: "#E4F4EC", color: "#2E8B62", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                      >
                        Mark Reviewed
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); softDelete(sub.id); }}
                      style={{ background: "#FCE7EC", color: "#E11D48", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                    >
                      Delete
                    </button>
                    <div style={{ fontSize: 18, color: "#C9BBD6", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", lineHeight: 1, alignSelf: "center" }}>⌄</div>
                  </div>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div style={{ padding: "20px 22px" }}>
                    {sub.story && (
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#9189A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Story</div>
                        <div style={{ fontSize: 14, lineHeight: 1.65, color: "#4A2A6B", whiteSpace: "pre-wrap" }}>{sub.story}</div>
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
                      {sub.phone && (
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#9189A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Phone</div>
                          <div style={{ fontSize: 14, color: "#4A2A6B" }}>{sub.phone}</div>
                        </div>
                      )}
                      {sub.heard_from && (
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#9189A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>How they heard</div>
                          <div style={{ fontSize: 14, color: "#4A2A6B" }}>{sub.heard_from}</div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#9189A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Update Status</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {(["new", "reviewed", "contacted", "rejected"] as Submission["status"][]).map((s) => {
                          const st = STATUS_STYLE[s];
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(sub.id, s)}
                              style={{ padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${sub.status === s ? st.color : "#E6E1EC"}`, background: sub.status === s ? st.bg : "#fff", color: sub.status === s ? st.color : "#6B6473", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
