"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Submission } from "@/lib/types";

const PF = "var(--font-playfair), serif";

const STATUS_STYLE: Record<Submission["status"], { bg: string; color: string }> = {
  new:       { bg: "#FBE9F2", color: "#E91E8C" },
  reviewed:  { bg: "#EDE0F7", color: "#5B2D8E" },
  contacted: { bg: "#E4F4EC", color: "#2E8B62" },
  rejected:  { bg: "#FCE7EC", color: "#E11D48" },
};

function SubmissionCard({
  sub,
  expanded,
  onToggle,
  onUpdateStatus,
  onReject,
  onRestore,
  isRejected,
}: {
  sub: Submission;
  expanded: boolean;
  onToggle: () => void;
  onUpdateStatus: (id: string, status: Submission["status"]) => void;
  onReject: (id: string) => void;
  onRestore: (id: string) => void;
  isRejected: boolean;
}) {
  const sc = STATUS_STYLE[sub.status];
  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 24px rgba(74,42,107,0.06)", overflow: "hidden" }}>
      <div
        onClick={onToggle}
        style={{ padding: "16px 22px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderBottom: expanded ? "1px solid #F0EAF6" : "none" }}
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
          {!isRejected && sub.status !== "reviewed" && sub.status !== "contacted" && (
            <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(sub.id, "reviewed"); }}
              style={{ background: "#E4F4EC", color: "#2E8B62", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              Mark Reviewed
            </button>
          )}
          {!isRejected ? (
            <button onClick={(e) => { e.stopPropagation(); onReject(sub.id); }}
              style={{ background: "#FCE7EC", color: "#E11D48", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              Reject
            </button>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); onRestore(sub.id); }}
              style={{ background: "#EDE0F7", color: "#5B2D8E", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              Restore
            </button>
          )}
          <div style={{ fontSize: 18, color: "#C9BBD6", transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", lineHeight: 1, alignSelf: "center" }}>⌄</div>
        </div>
      </div>
      {expanded && (
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
                  <button key={s} onClick={() => onUpdateStatus(sub.id, s)}
                    style={{ padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${sub.status === s ? st.color : "#E6E1EC"}`, background: sub.status === s ? st.bg : "#fff", color: sub.status === s ? st.color : "#6B6473", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
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
}

export default function SubmissionsManager() {
  const supabase = createClient();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [rejectedOpen, setRejectedOpen] = useState(false);

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

  function reject(id: string) { updateStatus(id, "rejected"); }
  function restore(id: string) { updateStatus(id, "new"); }

  const active = submissions.filter((s) => s.status !== "rejected");
  const rejected = submissions.filter((s) => s.status === "rejected");

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: PF, fontWeight: 700, fontSize: 26, color: "#4A2A6B", margin: 0 }}>Submissions</h1>
        <div style={{ fontSize: 13, color: "#9189A0", marginTop: 3 }}>
          {active.filter((s) => s.status === "new").length} new · {active.length} active
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#9189A0" }}>Loading…</div>
      ) : submissions.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: "48px", textAlign: "center", color: "#9189A0", fontStyle: "italic", fontSize: 14, boxShadow: "0 8px 24px rgba(74,42,107,0.06)" }}>No submissions yet.</div>
      ) : (
        <>
          {/* Active submissions */}
          {active.length === 0 ? (
            <div style={{ background: "#fff", borderRadius: 16, padding: "32px", textAlign: "center", color: "#9189A0", fontStyle: "italic", fontSize: 14, boxShadow: "0 8px 24px rgba(74,42,107,0.06)", marginBottom: 16 }}>All submissions have been reviewed.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              {active.map((sub) => (
                <SubmissionCard
                  key={sub.id} sub={sub}
                  expanded={expanded === sub.id}
                  onToggle={() => setExpanded(expanded === sub.id ? null : sub.id)}
                  onUpdateStatus={updateStatus}
                  onReject={reject}
                  onRestore={restore}
                  isRejected={false}
                />
              ))}
            </div>
          )}

          {/* Rejected section */}
          {rejected.length > 0 && (
            <div>
              <div style={{ borderTop: "1px solid #E6E1EC", marginBottom: 16 }} />
              <button
                onClick={() => setRejectedOpen((o) => !o)}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", marginBottom: 14, padding: 0 }}
              >
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "#9189A0" }}>Rejected ({rejected.length})</span>
                <span style={{ fontSize: 16, color: "#C9BBD6", transform: rejectedOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", lineHeight: 1 }}>⌄</span>
              </button>
              {rejectedOpen && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {rejected.map((sub) => (
                    <SubmissionCard
                      key={sub.id} sub={sub}
                      expanded={expanded === sub.id}
                      onToggle={() => setExpanded(expanded === sub.id ? null : sub.id)}
                      onUpdateStatus={updateStatus}
                      onReject={reject}
                      onRestore={restore}
                      isRejected={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
