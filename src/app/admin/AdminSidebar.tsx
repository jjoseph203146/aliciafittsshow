"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "./AdminLogoutButton";

const PF = "var(--font-playfair), serif";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", badge: null },
  { href: "/admin/episodes", label: "Episodes", badge: null },
  { href: "/admin/spotlight", label: "Spotlight", badge: null },
  { href: "/admin/photos", label: "Photos", badge: null },
  { href: "/admin/submissions", label: "Submissions", badge: null },
  { href: "/admin/nominations", label: "Nominations", badge: null },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: 210, minWidth: 210, background: "#1A0A2E", display: "flex", flexDirection: "column", minHeight: "100vh", position: "sticky", top: 0, height: "100vh" }}>
      {/* Logo */}
      <div style={{ padding: "22px 18px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/admin/dashboard" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
          <div style={{ fontFamily: "var(--font-pinyon-script), cursive", fontSize: 34, lineHeight: 0.9, color: "#E91E8C", flexShrink: 0 }}>Af</div>
          <div>
            <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 9.5, letterSpacing: "0.18em", color: "#9C8AAD", textTransform: "uppercase" }}>Admin</div>
            <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 11.5, letterSpacing: "0.12em", color: "#fff", textTransform: "uppercase" }}>CSRA</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 10px" }}>
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", borderRadius: 10,
                textDecoration: "none", marginBottom: 2,
                background: active ? "rgba(255,255,255,0.12)" : "transparent",
                color: active ? "#fff" : "#9C8AAD",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: 2, background: active ? "#E91E8C" : "#5A4A70", flexShrink: 0 }} />
              <span style={{ fontSize: 13.5, fontWeight: active ? 600 : 400 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "14px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, textDecoration: "none", color: "#8A7896", fontSize: 12.5 }}>
          <span>←</span> View public site
        </Link>
        <div style={{ padding: "0 4px" }}>
          <AdminLogoutButton />
        </div>
      </div>
    </aside>
  );
}
