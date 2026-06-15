import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Photo } from "@/lib/types";

export const metadata: Metadata = {
  title: "Photos | Good News in the CSRA",
  description:
    "Browse the Good News in the CSRA photo gallery — behind the scenes, community events, and more.",
};

export const dynamic = "force-dynamic";

export default async function PhotosPage() {
  const supabase = await createClient();

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      {/* ── Header ── */}
      <section className="bg-dark-section text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-hot-pink/10" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="font-pinyon text-5xl text-hot-pink mb-3 select-none">
            Behind the Scenes
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Photo Gallery
          </h1>
          <p className="text-soft-pink/80 mt-4 text-lg font-display italic">
            Moments from the show and the CSRA community.
          </p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {photos && photos.length > 0 ? (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {photos.map((photo: Photo) => (
                <div
                  key={photo.id}
                  className="break-inside-avoid rounded-xl overflow-hidden bg-lavender group relative"
                >
                  <img
                    src={photo.image_url}
                    alt={photo.caption ?? "Gallery photo"}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {photo.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-section/80 to-transparent px-3 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                      <p className="text-white text-xs">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-lavender flex items-center justify-center mx-auto mb-4">
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="font-display text-xl text-dark-section/60 italic">
                Photos coming soon!
              </p>
              <p className="text-medium-purple/60 mt-2 text-sm">
                Check back for photos from the show and community events.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
