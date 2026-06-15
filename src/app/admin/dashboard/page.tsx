import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: episodeCount },
    { count: spotlightCount },
    { count: submissionCount },
    { count: nominationCount },
  ] = await Promise.all([
    supabase.from("episodes").select("*", { count: "exact", head: true }),
    supabase.from("spotlights").select("*", { count: "exact", head: true }),
    supabase
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("nominations")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  const stats = [
    {
      label: "Total Episodes",
      value: episodeCount ?? 0,
      href: "/admin/episodes",
      color: "bg-deep-purple",
    },
    {
      label: "Spotlights",
      value: spotlightCount ?? 0,
      href: "/admin/spotlight",
      color: "bg-medium-purple",
    },
    {
      label: "New Submissions",
      value: submissionCount ?? 0,
      href: "/admin/submissions",
      color: "bg-hot-pink",
    },
    {
      label: "New Nominations",
      value: nominationCount ?? 0,
      href: "/admin/nominations",
      color: "bg-dark-section",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-dark-section">
          Dashboard
        </h1>
        <p className="text-medium-purple/60 text-sm mt-1">
          Good News in the CSRA — content overview
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className={`${stat.color} rounded-2xl p-6 text-white hover:opacity-90 transition-opacity`}
          >
            <div className="text-4xl font-bold mb-1">{stat.value}</div>
            <div className="text-white/70 text-sm">{stat.label}</div>
          </a>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-display font-bold text-dark-section mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: "/admin/episodes", label: "Add Episode" },
            { href: "/admin/spotlight", label: "Add Spotlight" },
            { href: "/admin/photos", label: "Upload Photo" },
            { href: "/admin/submissions", label: "Review Submissions" },
            { href: "/admin/nominations", label: "Review Nominations" },
            { href: "/", label: "View Public Site ↗" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-lavender text-dark-section/70 hover:border-deep-purple hover:text-deep-purple text-sm font-medium transition-colors"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
