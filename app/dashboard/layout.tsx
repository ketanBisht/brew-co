"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coffee, LayoutDashboard, CalendarCheck,
  UtensilsCrossed, BarChart3, Settings, ArrowLeft,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/reservations", label: "Reservations", icon: CalendarCheck },
  { href: "/dashboard/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9F5EF", fontFamily: "Inter, sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside style={{
        position: "fixed", inset: "0 auto 0 0", width: 228,
        background: "#1C120A", display: "flex", flexDirection: "column", zIndex: 40,
      }}>
        {/* Brand */}
        <div style={{ padding: "1.25rem 1.25rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div style={{ width: 34, height: 34, background: "#C8A06E", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Coffee size={17} color="#1C120A" />
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.01em" }}>Brewed & Co.</div>
              <div style={{ fontSize: "0.58rem", fontWeight: 700, color: "#C8A06E", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.1rem" }}>Owner Dashboard</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
          <p style={{ fontSize: "0.58rem", fontWeight: 700, color: "rgba(255,255,255,0.22)", textTransform: "uppercase", letterSpacing: "0.14em", padding: "0 0.5rem", marginBottom: "0.5rem" }}>MANAGE</p>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = path === href;
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.6rem 0.875rem", borderRadius: 10, textDecoration: "none",
                fontSize: "0.83rem", fontWeight: active ? 700 : 500,
                color: active ? "#C8A06E" : "rgba(255,255,255,0.45)",
                background: active ? "rgba(200,160,110,0.15)" : "transparent",
                transition: "all 0.15s",
              }}>
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: "0.625rem",
            padding: "0.6rem 0.875rem", borderRadius: 10, textDecoration: "none",
            fontSize: "0.8rem", color: "rgba(255,255,255,0.32)", fontWeight: 500,
            transition: "color 0.15s",
          }}>
            <ArrowLeft size={15} /> Back to Site
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ marginLeft: 228, flex: 1 }}>{children}</main>
    </div>
  );
}
