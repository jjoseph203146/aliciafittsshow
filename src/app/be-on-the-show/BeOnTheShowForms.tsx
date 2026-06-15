"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Tab = "story" | "nominate";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-lavender bg-lavender/50 focus:outline-none focus:border-deep-purple focus:bg-white text-dark-section placeholder-dark-section/35 transition-colors text-sm";

const labelClass = "block text-sm font-medium text-dark-section/70 mb-1.5";

export default function BeOnTheShowForms() {
  const [tab, setTab] = useState<Tab>("story");

  return (
    <section className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Tab switcher */}
        <div className="flex rounded-2xl bg-lavender p-1.5 mb-10">
          <button
            onClick={() => setTab("story")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
              tab === "story"
                ? "bg-hot-pink text-white shadow-sm"
                : "text-medium-purple hover:text-deep-purple"
            }`}
          >
            Share Your Story
          </button>
          <button
            id="nominate"
            onClick={() => setTab("nominate")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
              tab === "nominate"
                ? "bg-hot-pink text-white shadow-sm"
                : "text-medium-purple hover:text-deep-purple"
            }`}
          >
            Nominate Someone
          </button>
        </div>

        {tab === "story" ? <StoryForm /> : <NominationForm />}
      </div>
    </section>
  );
}

function StoryForm() {
  const supabase = createClient();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value || null,
      org: (form.elements.namedItem("org") as HTMLInputElement).value || null,
      story: (form.elements.namedItem("story") as HTMLTextAreaElement).value,
      heard_from: (form.elements.namedItem("heard_from") as HTMLInputElement).value || null,
    };

    const { error } = await supabase.from("submissions").insert(data);

    if (error) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    } else {
      setStatus("success");
      form.reset();
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-hot-pink/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-hot-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-dark-section mb-2">
          Thank you for sharing!
        </h3>
        <p className="text-medium-purple mb-6">
          We received your story and will be in touch soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-hot-pink font-semibold text-sm hover:underline"
        >
          Submit another story
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-dark-section mb-2">
          Share Your Story
        </h2>
        <p className="text-medium-purple/70 text-sm">
          Tell us about the good news happening in your life or community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="full_name" className={labelClass}>
            Full Name <span className="text-hot-pink">*</span>
          </label>
          <input id="full_name" name="full_name" type="text" required className={inputClass} placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address <span className="text-hot-pink">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@example.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="(706) 555-0100" />
        </div>
        <div>
          <label htmlFor="org" className={labelClass}>
            Organization / Business
          </label>
          <input id="org" name="org" type="text" className={inputClass} placeholder="Optional" />
        </div>
      </div>

      <div>
        <label htmlFor="story" className={labelClass}>
          Your Story <span className="text-hot-pink">*</span>
        </label>
        <textarea
          id="story"
          name="story"
          required
          rows={6}
          className={inputClass}
          placeholder="Tell us your good news story — what's happening, why it matters, and how it's impacting the CSRA community..."
        />
      </div>

      <div>
        <label htmlFor="heard_from" className={labelClass}>
          How did you hear about us?
        </label>
        <input id="heard_from" name="heard_from" type="text" className={inputClass} placeholder="Social media, friend, etc." />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-hot-pink text-white font-semibold py-3.5 rounded-xl hover:bg-hot-pink/85 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Submit My Story"}
      </button>

      <p className="text-dark-section/40 text-xs text-center">
        By submitting, you agree that your story may be shared on our show and social media.
      </p>
    </form>
  );
}

function NominationForm() {
  const supabase = createClient();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      nominator_name: (form.elements.namedItem("nominator_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      nominee_name: (form.elements.namedItem("nominee_name") as HTMLInputElement).value,
      reason: (form.elements.namedItem("reason") as HTMLTextAreaElement).value,
    };

    const { error } = await supabase.from("nominations").insert(data);

    if (error) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    } else {
      setStatus("success");
      form.reset();
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-hot-pink/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-hot-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-dark-section mb-2">
          Nomination received!
        </h3>
        <p className="text-medium-purple mb-6">
          Thank you for nominating a community hero. We&#39;ll review your submission soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-hot-pink font-semibold text-sm hover:underline"
        >
          Submit another nomination
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-dark-section mb-2">
          Nominate Someone
        </h2>
        <p className="text-medium-purple/70 text-sm">
          Know a community hero making a difference in the CSRA? Nominate them!
        </p>
      </div>

      <div>
        <p className="text-xs font-bold text-medium-purple tracking-[0.15em] uppercase mb-4">
          Your Information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nominator_name" className={labelClass}>
              Your Name <span className="text-hot-pink">*</span>
            </label>
            <input id="nominator_name" name="nominator_name" type="text" required className={inputClass} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Your Email <span className="text-hot-pink">*</span>
            </label>
            <input id="email" name="email" type="email" required className={inputClass} placeholder="your@email.com" />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-xs font-bold text-medium-purple tracking-[0.15em] uppercase mb-4">
          Nominee Information
        </p>
        <div>
          <label htmlFor="nominee_name" className={labelClass}>
            Nominee&#39;s Full Name <span className="text-hot-pink">*</span>
          </label>
          <input id="nominee_name" name="nominee_name" type="text" required className={inputClass} placeholder="Nominee's full name" />
        </div>
      </div>

      <div>
        <label htmlFor="reason" className={labelClass}>
          Why do they deserve a spotlight? <span className="text-hot-pink">*</span>
        </label>
        <textarea
          id="reason"
          name="reason"
          required
          rows={6}
          className={inputClass}
          placeholder="Tell us about this person — what makes them special, how they're making a difference, and why they should be featured on Good News in the CSRA..."
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-hot-pink text-white font-semibold py-3.5 rounded-xl hover:bg-hot-pink/85 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Submit Nomination"}
      </button>
    </form>
  );
}
