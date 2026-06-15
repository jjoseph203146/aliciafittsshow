import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getThumbnailUrl, getWatchUrl } from "@/lib/youtube";
import type { Episode } from "@/lib/types";

export const metadata: Metadata = {
  title: "Episodes | Good News in the CSRA",
  description:
    "Watch all episodes of Good News in the CSRA — inspiring conversations with community heroes hosted by Alicia Fitts.",
};

export const dynamic = "force-dynamic";

export default async function EpisodesPage() {
  const supabase = await createClient();

  const { data: episodes } = await supabase
    .from("episodes")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const categories = episodes
    ? [...new Set(episodes.map((e: Episode) => e.category).filter(Boolean))]
    : [];

  return (
    <>
      {/* ── Header ── */}
      <section className="bg-dark-section text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-hot-pink/10" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="font-pinyon text-5xl text-hot-pink mb-3 select-none">
            Watch &amp; Learn
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Episodes
          </h1>
          <p className="text-soft-pink/80 mt-4 text-lg font-display italic">
            Inspiring conversations from the heart of the CSRA.
          </p>
        </div>
      </section>

      {/* ── Episodes Grid ── */}
      <section className="bg-lavender py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter labels */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat) => (
                <span
                  key={cat as string}
                  className="bg-white text-deep-purple text-xs font-semibold px-4 py-1.5 rounded-full border border-deep-purple/20"
                >
                  {cat as string}
                </span>
              ))}
            </div>
          )}

          {episodes && episodes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.map((ep: Episode) => (
                <a
                  key={ep.id}
                  href={getWatchUrl(ep.youtube_id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video bg-dark-section">
                    <img
                      src={getThumbnailUrl(ep.youtube_id)}
                      alt={ep.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-dark-section/30 group-hover:bg-dark-section/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-hot-pink flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          className="w-5 h-5 text-white ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    {ep.category && (
                      <span className="text-xs font-bold text-hot-pink tracking-[0.15em] uppercase">
                        {ep.category}
                      </span>
                    )}
                    <h2 className="font-display font-bold text-dark-section text-lg mt-1 mb-1 line-clamp-2 group-hover:text-deep-purple transition-colors">
                      {ep.title}
                    </h2>
                    {ep.guest_name && (
                      <p className="text-medium-purple text-sm mb-2">
                        with {ep.guest_name}
                      </p>
                    )}
                    {ep.description && (
                      <p className="text-dark-section/55 text-sm line-clamp-2 leading-relaxed">
                        {ep.description}
                      </p>
                    )}
                    {ep.published_at && (
                      <p className="text-dark-section/35 text-xs mt-3">
                        {new Date(ep.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-medium-purple/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                  />
                </svg>
              </div>
              <p className="font-display text-xl text-dark-section/60 italic">
                Episodes coming soon!
              </p>
              <p className="text-medium-purple/60 mt-2 text-sm">
                Check back for new conversations with community heroes.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
