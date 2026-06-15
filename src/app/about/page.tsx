import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Good News in the CSRA",
  description:
    "Learn about Alicia Fitts and the Good News in the CSRA show — uplifting stories from the Central Savannah River Area.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-dark-section text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-hot-pink/10" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="font-pinyon text-5xl text-hot-pink mb-3 select-none">
            About
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Good News in the CSRA
          </h1>
          <p className="text-soft-pink/80 mt-4 text-lg font-display italic">
            Celebrating the CSRA&#39;s inspiring stories since day one.
          </p>
        </div>
      </section>

      {/* ── Host Bio ── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <div className="flex justify-center">
              <div className="w-72 h-72 rounded-full bg-lavender border-4 border-hot-pink/30 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="font-pinyon text-8xl text-hot-pink leading-none select-none">
                    Af
                  </div>
                  <p className="text-medium-purple/50 text-sm mt-2">
                    Alicia Fitts
                  </p>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div>
              <p className="text-hot-pink text-sm font-semibold tracking-[0.2em] uppercase mb-2">
                Your Host
              </p>
              <h2 className="font-display text-3xl font-bold text-dark-section mb-5">
                Alicia Fitts
              </h2>
              <div className="space-y-4 text-medium-purple/80 leading-relaxed">
                <p>
                  Alicia Fitts is the heart and voice behind{" "}
                  <em>Good News in the CSRA</em>, a show dedicated to
                  shining a spotlight on the extraordinary people and
                  uplifting stories happening right here in the Central
                  Savannah River Area.
                </p>
                <p>
                  With a passion for community and a gift for storytelling,
                  Alicia brings warmth, energy, and authenticity to every
                  conversation. Her mission is simple: to remind us all that
                  good news is happening every single day in our backyard.
                </p>
                <p>
                  From community heroes and local entrepreneurs to
                  nonprofits changing lives, Alicia gives a platform to the
                  stories that deserve to be heard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About the Show ── */}
      <section className="bg-lavender py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark-section">
              About the Show
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                ),
                title: "Video Episodes",
                body: "Full-length interviews and stories available on YouTube, bringing you face-to-face with the CSRA's most inspiring people.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Community Focus",
                body: "Every episode features real people doing real good — from volunteers and educators to entrepreneurs and artists.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                title: "Uplifting Stories",
                body: "In a world full of headlines, we choose to highlight the positive — stories of hope, resilience, and community pride.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-7 text-center shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-deep-purple/10 flex items-center justify-center mx-auto mb-4 text-deep-purple">
                  {card.icon}
                </div>
                <h3 className="font-display font-bold text-dark-section text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-medium-purple/75 text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="bg-deep-purple py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="font-pinyon text-5xl text-soft-pink mb-4 select-none">
            Our Mission
          </div>
          <blockquote className="font-display text-2xl sm:text-3xl italic text-white leading-relaxed mb-8">
            &#8220;Good news is happening all around us every single day. My
            job is to make sure you hear it.&#8221;
          </blockquote>
          <p className="text-soft-pink font-display italic text-lg">
            — Alicia Fitts
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-dark-section mb-4">
            Ready to share your story?
          </h2>
          <p className="text-medium-purple mb-8">
            We want to hear from you. Whether you have a story to tell or
            someone to nominate, we&#39;d love to connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/be-on-the-show"
              className="bg-hot-pink text-white font-semibold px-8 py-3.5 rounded-full hover:bg-hot-pink/85 transition-colors"
            >
              Be on the Show
            </Link>
            <Link
              href="/episodes"
              className="border-2 border-deep-purple text-deep-purple font-semibold px-8 py-3.5 rounded-full hover:bg-deep-purple hover:text-white transition-colors"
            >
              Watch Episodes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
