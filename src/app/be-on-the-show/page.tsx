import type { Metadata } from "next";
import BeOnTheShowForms from "./BeOnTheShowForms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Be on the Show | Good News in the CSRA",
  description:
    "Share your story or nominate a community hero for Good News in the CSRA with Alicia Fitts.",
};

export default function BeOnTheShowPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="bg-dark-section text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-hot-pink/10" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="font-pinyon text-5xl text-hot-pink mb-3 select-none">
            Your Story Matters
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Be on the Show
          </h1>
          <p className="text-soft-pink/80 mt-4 text-lg font-display italic max-w-2xl mx-auto">
            Share your good news story or nominate a community hero. We want to
            hear from you!
          </p>
        </div>
      </section>

      {/* ── Forms ── */}
      <BeOnTheShowForms />
    </>
  );
}
