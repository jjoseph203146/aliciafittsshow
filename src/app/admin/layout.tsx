import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Admin | Good News in the CSRA",
};

const PF = "var(--font-playfair), serif";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F4ECF8", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #EFE6F5", padding: "18px 32px", position: "sticky", top: 0, zIndex: 30, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: PF, fontWeight: 700, fontSize: 22, color: "#4A2A6B" }}>Welcome back, Alicia</div>
          <div style={{ fontSize: 12.5, color: "#9189A0" }}>Good News in the CSRA Admin</div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
