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
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #ECE6F2",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          height: 74,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          padding: "0 32px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-pinyon-script), cursive",
              fontSize: 40,
              lineHeight: 0.8,
              color: "#E91E8C",
              userSelect: "none",
            }}
          >
            Af
          </span>
          <div style={{ marginLeft: 10, lineHeight: 1.2 }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "#9189A0",
                textTransform: "uppercase",
              }}
            >
              Good News in the
            </div>
            <div
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.1em",
                color: "#4A2A6B",
                textTransform: "uppercase",
              }}
            >
              CSRA
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            flex: 1,
            justifyContent: "center",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: active ? 700 : 500,
                  color: active ? "#4A2A6B" : "#6B6473",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexShrink: 0,
          }}
        >
          {/* Be on the Show button */}
          <Link
            href="/be-on-the-show"
            style={{
              background: "#C2557A",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(194,85,122,0.28)",
              whiteSpace: "nowrap",
              textDecoration: "none",
              display: "inline-block",
            }}
            className="hidden md:inline-block"
          >
            Be on the Show
          </Link>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden"
            style={{
              background: "none",
              border: "1px solid #E6E1EC",
              borderRadius: 9,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 4,
              cursor: "pointer",
            }}
          >
            <span style={{ display: "block", width: 18, height: 2, background: "#4A3168" }} />
            <span style={{ display: "block", width: 18, height: 2, background: "#4A3168" }} />
            <span style={{ display: "block", width: 18, height: 2, background: "#4A3168" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid #ECE6F2",
            background: "#fff",
            padding: "10px 24px 18px",
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                cursor: "pointer",
                display: "block",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
                color: "#4A3168",
                padding: "12px 4px",
                borderBottom: "1px solid #F4F1F7",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/be-on-the-show"
            onClick={() => setOpen(false)}
            style={{
              cursor: "pointer",
              display: "block",
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 600,
              color: "#C2557A",
              padding: "14px 4px 4px",
            }}
          >
            Be on the Show →
          </Link>
        </div>
      )}
    </header>
  );
}
