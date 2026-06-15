"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Nomination } from "@/lib/types";

const PF = "var(--font-playfair), serif";

const STATUS_STYLE: Record<Nomination["status"], { bg: string; color: string }> = {
  new: { bg: "#FBE9F2", color: "#E91E8C" },
  reviewed: { bg: "#EDE0F7", color: "#5B2D8E" },
  selected: { bg: "#E4F4EC", color: "#2E8B62" },
  declined: { bg: "#FCE7EC", color: "#E11D48" },
};

export default function NominationsManager() {
  const supabase = createClient();
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function fetchNominations() {
    const { data } = await supabase.from("nominations").select("*").order("created_at", { ascending: false });
    setNominations(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchNominations(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function updateStatus(id: string, status: Nomination["status"]) {
    await supabase.from("nominations").update({ status }).eq("id", id);
    setNominations((prev) => prev.map((n) => n.id === id ? { ...n, status } : n));
  }

  async function softDelete(id: string) {
    if (!confirm("Mark this nomination as declined?")) return;
    await updateStatus(id, "declined");
  }

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: PF, fontWeight: 700, fontSize: 26, color: "#4A2A6B", margin: 0 }}>Nominations</h1>
        <div style={{ fontSize: 13, color: "#9189A0", marginTop: 3 }}>
          {nominations.filter((n) => n.status === "new").length} new · {nominations.length} total
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#9189A0" }}>Loading…</div>
      ) : nominations.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: "48px", textAlign: "center", color: "#9189A0", fontStyle: "italic", fontSize: 14, boxShadow: "0 8px 24px rgba(74,42,107,0.06)" }}>No nominations yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {nominations.map((nom) => {
            const sc = STATUS_STYLE[nom.status];
            const isOpen = expanded === nom.id;
            return (
              <div key={nom.id} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 24px rgba(74,42,107,0.06)", overflow: "hidden" }}>
                <div
                  onClick={() => setExpanded(isOpen ? null : nom.id)}
                  style={{ padding: "16px 22px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderBottom: isOpen ? "1px solid #F0EAF6" : "none" }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", borderRadius: 999, padding: "4px 10px", background: sc.bg, color: sc.color }}>{nom.status}</span>
                      <span style={{ fontSize: 12, color: "#9189A0" }}>{new Date(nom.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 16, color: "#4A2A6B" }}>{nom.nominee_name}</div>
                    <div style={{ fontSize: 12.5, color: "#9189A0" }}>nominated by {nom.nominator_name} · {nom.email}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    {nom.status !== "reviewed" && nom.status !== "selected" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateStatus(nom.id, "reviewed"); }}
                        style={{ background: "#E4F4EC", color: "#2E8B62", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                      >
                        Mark Reviewed
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); softDelete(nom.id); }}
                      style={{ background: "#FCE7EC", color: "#E11D48", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                    >
                      Delete
                    </button>
                    <div style={{ fontSize: 18, color: "#C9BBD6", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", lineHeight: 1, alignSelf: "center" }}>⌄</div>
                  </div>
                </div>

                {isOpen && (
                  <div style={{ padding: "20px 22px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#9189A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Nominee</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#4A2A6B" }}>{nom.nominee_name}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#9189A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Nominator</div>
                        <div style={{ fontSize: 14, color: "#4A2A6B" }}>{nom.nominator_name}</div>
                        <div style={{ fontSize: 12.5, color: "#9189A0" }}>{nom.email}</div>
                      </div>
                    </div>
                    {nom.reason && (
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#9189A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Reason for Nomination</div>
                        <div style={{ fontSize: 14, lineHeight: 1.65, color: "#4A2A6B", whiteSpace: "pre-wrap" }}>{nom.reason}</div>
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#9189A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Update Status</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {(["new", "reviewed", "selected", "declined"] as Nomination["status"][]).map((s) => {
                          const st = STATUS_STYLE[s];
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(nom.id, s)}
                              style={{ padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${nom.status === s ? st.color : "#E6E1EC"}`, background: nom.status === s ? st.bg : "#fff", color: nom.status === s ? st.color : "#6B6473", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
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
