import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1A0A2E", color: "#EFE6F5" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "58px 32px 30px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: 40,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-pinyon-script), cursive",
              fontSize: 46,
              lineHeight: 0.8,
              color: "#E59FBC",
            }}
          >
            Af
          </div>
          <div
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: "0.04em",
              marginTop: 6,
              color: "#fff",
            }}
          >
            ALICIA FITTS SHOW
          </div>
          <div
            style={{
              fontStyle: "italic",
              color: "#F8A5C8",
              fontSize: 14.5,
              marginTop: 10,
            }}
          >
            CSRA good news you can use.
          </div>
        </div>

        {/* Explore */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#9C8AAD",
              marginBottom: 16,
            }}
          >
            EXPLORE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/episodes", label: "Episodes" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "#C9BBD6",
                  textDecoration: "none",
                  fontSize: 14.5,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* More */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#9C8AAD",
              marginBottom: 16,
            }}
          >
            MORE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {[
              { href: "/photos", label: "Photos" },
              { href: "/spotlight", label: "Spotlight" },
              { href: "/be-on-the-show", label: "Be on the Show" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "#C9BBD6",
                  textDecoration: "none",
                  fontSize: 14.5,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Follow Along */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#9C8AAD",
              marginBottom: 16,
            }}
          >
            FOLLOW ALONG
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            {["FB", "IG", "YT", "LI"].map((s) => (
              <div
                key={s}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1px solid rgba(248,165,200,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#F8A5C8",
                  letterSpacing: "0.02em",
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13.5, color: "#C9BBD6" }}>
            hello@aliciafittsshow.com
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "18px 32px",
          }}
        >
          <div style={{ fontSize: 12.5, color: "#8A7896" }}>
            © 2025 Alicia Fitts Show. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
