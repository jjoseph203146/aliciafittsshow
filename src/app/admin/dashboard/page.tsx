import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Submission, Nomination } from "@/lib/types";

export const dynamic = "force-dynamic";

const PF = "var(--font-playfair), serif";

const STAT_ICONS = [
  { bg: "#EDE0F7", color: "#5B2D8E", symbol: "▶" },
  { bg: "#FBE9F2", color: "#E91E8C", symbol: "★" },
  { bg: "#E4F4EC", color: "#2E8B62", symbol: "✉" },
  { bg: "#FFF0DA", color: "#C07D00", symbol: "♦" },
];

const SUB_STATUS: Record<string, { bg: string; color: string }> = {
  new: { bg: "#FBE9F2", color: "#E91E8C" },
  reviewed: { bg: "#EDE0F7", color: "#5B2D8E" },
  contacted: { bg: "#E4F4EC", color: "#2E8B62" },
  rejected: { bg: "#FCE7EC", color: "#E11D48" },
};

const NOM_STATUS: Record<string, { bg: string; color: string }> = {
  new: { bg: "#FBE9F2", color: "#E91E8C" },
  reviewed: { bg: "#EDE0F7", color: "#5B2D8E" },
  selected: { bg: "#E4F4EC", color: "#2E8B62" },
  declined: { bg: "#FCE7EC", color: "#E11D48" },
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: episodeCount },
    { count: spotlightCount },
    { count: submissionCount },
    { count: nominationCount },
    { data: recentSubs },
    { data: recentNoms },
  ] = await Promise.all([
    supabase.from("episodes").select("*", { count: "exact", head: true }),
    supabase.from("spotlights").select("*", { count: "exact", head: true }),
    supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("nominations").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("submissions").select("id,full_name,email,org,status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("nominations").select("id,nominee_name,nominator_name,email,status,created_at").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Total Episodes", value: episodeCount ?? 0, href: "/admin/episodes", ...STAT_ICONS[0] },
    { label: "Spotlights", value: spotlightCount ?? 0, href: "/admin/spotlight", ...STAT_ICONS[1] },
    { label: "New Submissions", value: submissionCount ?? 0, href: "/admin/submissions", ...STAT_ICONS[2] },
    { label: "New Nominations", value: nominationCount ?? 0, href: "/admin/nominations", ...STAT_ICONS[3] },
  ];

  return (
    <div style={{ padding: "28px 32px" }}>
      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 32 }}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} style={{ background: "#fff", borderRadius: 16, padding: "22px 24px", boxShadow: "0 8px 24px rgba(74,42,107,0.06)", textDecoration: "none", display: "block" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, fontSize: 18, marginBottom: 14 }}>{s.symbol}</div>
            <div style={{ fontFamily: PF, fontWeight: 800, fontSize: 32, color: "#4A2A6B", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11.5, color: "#9189A0", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent tables */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        {/* Recent Submissions */}
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 24px rgba(74,42,107,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: "1px solid #F0EAF6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 16, color: "#4A2A6B" }}>Recent Submissions</div>
            <Link href="/admin/submissions" style={{ fontSize: 12.5, color: "#E91E8C", fontWeight: 600, textDecoration: "none" }}>View all →</Link>
          </div>
          {(recentSubs ?? []).length === 0 ? (
            <div style={{ padding: "28px 22px", textAlign: "center", color: "#9189A0", fontSize: 14, fontStyle: "italic" }}>No submissions yet</div>
          ) : (
            <div>
              {(recentSubs as Submission[]).map((sub) => {
                const sc = SUB_STATUS[sub.status] ?? SUB_STATUS.new;
                return (
                  <Link key={sub.id} href="/admin/submissions" style={{ padding: "13px 22px", borderBottom: "1px solid #F9F5FC", display: "flex", alignItems: "center", gap: 12, textDecoration: "none", cursor: "pointer" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#4A2A6B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub.full_name}</div>
                      <div style={{ fontSize: 12, color: "#9189A0" }}>{sub.email}</div>
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: sc.color, background: sc.bg, borderRadius: 999, padding: "4px 10px", flexShrink: 0 }}>{sub.status}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Nominations */}
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 24px rgba(74,42,107,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: "1px solid #F0EAF6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 16, color: "#4A2A6B" }}>Recent Nominations</div>
            <Link href="/admin/nominations" style={{ fontSize: 12.5, color: "#E91E8C", fontWeight: 600, textDecoration: "none" }}>View all →</Link>
          </div>
          {(recentNoms ?? []).length === 0 ? (
            <div style={{ padding: "28px 22px", textAlign: "center", color: "#9189A0", fontSize: 14, fontStyle: "italic" }}>No nominations yet</div>
          ) : (
            <div>
              {(recentNoms as Nomination[]).map((nom) => {
                const nc = NOM_STATUS[nom.status] ?? NOM_STATUS.new;
                return (
                  <Link key={nom.id} href="/admin/nominations" style={{ padding: "13px 22px", borderBottom: "1px solid #F9F5FC", display: "flex", alignItems: "center", gap: 12, textDecoration: "none", cursor: "pointer" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#4A2A6B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nom.nominee_name}</div>
                      <div style={{ fontSize: 12, color: "#9189A0" }}>by {nom.nominator_name}</div>
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: nc.color, background: nc.bg, borderRadius: 999, padding: "4px 10px", flexShrink: 0 }}>{nom.status}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
