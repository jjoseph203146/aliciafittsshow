"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Nomination } from "@/lib/types";

const STATUS_COLORS: Record<Nomination["status"], string> = {
  new: "bg-hot-pink/10 text-hot-pink",
  reviewed: "bg-blue-100 text-blue-700",
  selected: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-500",
};

export default function AdminNominationsPage() {
  const supabase = createClient();
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function fetchNominations() {
    const { data } = await supabase
      .from("nominations")
      .select("*")
      .order("created_at", { ascending: false });
    setNominations(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchNominations(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function updateStatus(id: string, status: Nomination["status"]) {
    await supabase.from("nominations").update({ status }).eq("id", id);
    fetchNominations();
  }

  const statusOptions: Nomination["status"][] = ["new", "reviewed", "selected", "declined"];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-dark-section">Nominations</h1>
        <p className="text-medium-purple/60 text-sm mt-1">
          {nominations.filter((n) => n.status === "new").length} new Â·{" "}
          {nominations.length} total
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-medium-purple/50">Loading...</div>
      ) : nominations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <p className="font-display text-dark-section/50 italic">No nominations yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {nominations.map((nom) => (
            <div key={nom.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div
                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-lavender/30 transition-colors"
                onClick={() => setExpanded(expanded === nom.id ? null : nom.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${STATUS_COLORS[nom.status]}`}>
                      {nom.status}
                    </span>
                    <span className="text-dark-section/30 text-xs">
                      {new Date(nom.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-display font-bold text-dark-section text-sm">
                      {nom.nominee_name}
                    </h3>
                    <span className="text-dark-section/35 text-xs">
                      nominated by {nom.nominator_name}
                    </span>
                  </div>
                  <p className="text-medium-purple/60 text-xs">{nom.email}</p>
                </div>
                <svg
                  className={`w-4 h-4 text-dark-section/30 shrink-0 transition-transform ${expanded === nom.id ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {expanded === nom.id && (
                <div className="px-4 pb-5 border-t border-lavender">
                  <div className="pt-4 space-y-3">
                    <div>
                      <p className="text-xs font-bold text-dark-section/40 uppercase tracking-wider mb-1">Reason for Nomination</p>
                      <p className="text-dark-section/80 text-sm leading-relaxed whitespace-pre-wrap">{nom.reason}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold text-dark-section/40 uppercase tracking-wider mb-0.5">Nominator</p>
                        <p className="text-dark-section/80 text-sm">{nom.nominator_name}</p>
                        <p className="text-medium-purple/60 text-xs">{nom.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-dark-section/40 uppercase tracking-wider mb-0.5">Nominee</p>
                        <p className="text-dark-section/80 text-sm font-semibold">{nom.nominee_name}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-dark-section/40 uppercase tracking-wider mb-2">Update Status</p>
                      <div className="flex flex-wrap gap-2">
                        {statusOptions.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(nom.id, s)}
                            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                              nom.status === s
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

