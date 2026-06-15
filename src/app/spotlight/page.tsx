import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Spotlight } from "@/lib/types";

export const metadata: Metadata = {
  title: "Community Spotlight | Good News in the CSRA",
  description:
    "Meet the everyday heroes of the CSRA — community spotlights featured on Good News in the CSRA with Alicia Fitts.",
};

export const dynamic = "force-dynamic";

export default async function SpotlightPage() {
  const supabase = await createClient();

  const { data: spotlights } = await supabase
    .from("spotlights")
    .select("*")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  const featured = spotlights?.find((s: Spotlight) => s.is_featured);
  const rest = spotlights?.filter((s: Spotlight) => !s.is_featured) ?? [];

  return (
    <>
      {/* ── Header ── */}
      <section className="bg-dark-section text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-hot-pink/10" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="font-pinyon text-5xl text-hot-pink mb-3 select-none">
            Community Heroes
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Community Spotlight
          </h1>
          <p className="text-soft-pink/80 mt-4 text-lg font-display italic">
            Celebrating the people who make the CSRA shine.
          </p>
        </div>
      </section>

      {/* ── Featured Spotlight ── */}
      {featured && (
        <section className="bg-deep-purple py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-soft-pink text-xs font-bold tracking-[0.25em] uppercase text-center mb-8">
              Featured Spotlight
            </p>
            <div className="bg-white/10 rounded-2xl p-8 border border-white/15 flex flex-col md:flex-row gap-8 items-center">
              {featured.photo_url ? (
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-hot-pink shrink-0">
                  <img
                    src={featured.photo_url}
                    alt={featured.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-36 h-36 rounded-full bg-hot-pink/20 border-4 border-hot-pink/50 shrink-0 flex items-center justify-center">
                  <span className="font-pinyon text-5xl text-soft-pink">
                    {featured.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="text-center md:text-left">
                {featured.category && (
                  <span className="text-xs font-bold text-hot-pink tracking-[0.2em] uppercase">
                    {featured.category}
                  </span>
                )}
                <h2 className="font-display text-3xl font-bold text-white mt-1 mb-0.5">
                  {featured.name}
                </h2>
                {featured.title && (
                  <p className="text-soft-pink mb-0.5">{featured.title}</p>
                )}
                {featured.org && (
                  <p className="text-white/50 text-sm mb-4">{featured.org}</p>
                )}
                {featured.impact && (
                  <p className="text-white/80 leading-relaxed">{featured.impact}</p>
                )}
                {featured.bio && (
                  <p className="text-white/60 text-sm mt-3 leading-relaxed">
                    {featured.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── All Spotlights ── */}
      <section className="bg-lavender py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {spotlights && spotlights.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featured ? rest : spotlights).map((s: Spotlight) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {s.photo_url ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-hot-pink shrink-0">
                        <img
                          src={s.photo_url}
                          alt={s.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-hot-pink/10 border-2 border-hot-pink/30 shrink-0 flex items-center justify-center">
                        <span className="font-pinyon text-2xl text-hot-pink">
                          {s.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-display font-bold text-dark-section text-lg leading-tight">
                        {s.name}
                      </h3>
                      {s.title && (
                        <p className="text-medium-purple text-sm">{s.title}</p>
                      )}
                      {s.org && (
                        <p className="text-dark-section/40 text-xs">{s.org}</p>
                      )}
                    </div>
                  </div>
                  {s.category && (
                    <span className="inline-block text-xs font-bold text-hot-pink tracking-[0.15em] uppercase mb-2">
                      {s.category}
                    </span>
                  )}
                  {s.impact && (
                    <p className="text-dark-section/70 text-sm line-clamp-3 leading-relaxed">
                      {s.impact}
                    </p>
                  )}
                </div>
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
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <p className="font-display text-xl text-dark-section/60 italic">
                Spotlights coming soon!
              </p>
              <p className="text-medium-purple/60 mt-2 text-sm">
                Know someone who deserves a spotlight?
              </p>
              <Link
                href="/be-on-the-show#nominate"
                className="inline-block mt-6 bg-hot-pink text-white font-semibold px-8 py-3 rounded-full hover:bg-hot-pink/85 transition-colors"
              >
                Nominate Someone
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Nominate CTA ── */}
      <section className="bg-dark-section py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Know a community hero?
          </h2>
          <p className="text-soft-pink/70 mb-8">
            Nominate someone who is making a positive impact in the CSRA and
            they could be featured on the show!
          </p>
          <Link
            href="/be-on-the-show#nominate"
            className="inline-block bg-hot-pink text-white font-semibold px-8 py-3.5 rounded-full hover:bg-hot-pink/85 transition-colors"
          >
            Nominate Someone
          </Link>
        </div>
      </section>
    </>
  );
}
