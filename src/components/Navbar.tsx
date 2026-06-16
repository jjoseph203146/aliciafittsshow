"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/episodes", label: "Episodes" },
  { href: "/photos", label: "Photos" },
  { href: "/spotlight", label: "Spotlight" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Responsive visibility — avoids conflicts with inline display styles */}
      <style>{`
        .nav-links  { display: flex; }
        .nav-cta    { display: inline-block; }
        .nav-burger { display: none !important; }
        @media (max-width: 767px) {
          .nav-links  { display: none !important; }
          .nav-cta    { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>

      <header
        className="sticky top-0 z-50"
        style={{
          width: "100%",
          maxWidth: "100vw",
          boxSizing: "border-box",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #ECE6F2",
          /* position relative so the absolute dropdown is anchored here */
          position: "sticky",
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "0 20px",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none", gap: 10 }}
          >
            <img src="/images/logo.png" alt="Good News in the CSRA" style={{ height: 90, width: "auto", display: "block" }} />
          </Link>

          {/* Desktop nav links */}
          <nav
            className="nav-links"
            style={{ alignItems: "center", gap: 30, flex: 1, justifyContent: "center" }}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ textDecoration: "none", fontSize: 15, fontWeight: active ? 700 : 500, color: active ? "#4A2A6B" : "#6B6473", letterSpacing: "0.01em", whiteSpace: "nowrap" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right-side controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            {/* Be on the Show — desktop only */}
            <Link
              href="/be-on-the-show"
              className="nav-cta"
              style={{ background: "#C2557A", color: "#fff", borderRadius: 999, padding: "11px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 6px 18px rgba(194,85,122,0.28)", whiteSpace: "nowrap", textDecoration: "none" }}
            >
              Be on the Show
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="nav-burger"
              style={{
                background: "none",
                border: "1px solid #E6E1EC",
                borderRadius: 9,
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 5,
                cursor: "pointer",
                flexShrink: 0,
                padding: 0,
              }}
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <line x1="2" y1="2" x2="16" y2="16" stroke="#4A3168" strokeWidth="2.2" strokeLinecap="round"/>
                  <line x1="16" y1="2" x2="2" y2="16" stroke="#4A3168" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              ) : (
                <>
                  <span style={{ display: "block", width: 18, height: 2, background: "#4A3168", borderRadius: 2 }} />
                  <span style={{ display: "block", width: 18, height: 2, background: "#4A3168", borderRadius: 2 }} />
                  <span style={{ display: "block", width: 18, height: 2, background: "#4A3168", borderRadius: 2 }} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        {open && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 49,
              background: "#fff",
              borderTop: "1px solid #ECE6F2",
              boxShadow: "0 12px 32px rgba(74,42,107,0.14)",
              paddingBottom: 8,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: pathname === link.href ? 700 : 600,
                  color: pathname === link.href ? "#4A2A6B" : "#6B6473",
                  padding: "14px 24px",
                  borderBottom: "1px solid #F4F1F7",
                  minHeight: 52,
                  boxSizing: "border-box",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/be-on-the-show"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
                color: "#C2557A",
                padding: "14px 24px",
                minHeight: 52,
                boxSizing: "border-box",
              }}
            >
              Be on the Show →
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
