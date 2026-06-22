"use client";

import { useState } from "react";
import {
  Calendar, TrendingUp, Check, Star,
  Clock, Users, Plus, Download, X,
} from "lucide-react";

/* ── Mock Data ─────────────────────────────────────────────────────────── */
type Status = "confirmed" | "pending" | "cancelled";
interface Reservation { id: number; name: string; time: string; guests: number; table: string; status: Status; phone: string; }

const INITIAL: Reservation[] = [
  { id: 1, name: "Aisha Sharma",    time: "10:30 AM", guests: 2, table: "T1", status: "confirmed",  phone: "+91 98201 56781" },
  { id: 2, name: "Rohan Verma",     time: "11:00 AM", guests: 4, table: "T3", status: "pending",    phone: "+91 97201 56782" },
  { id: 3, name: "Kavya Nair",      time: "12:30 PM", guests: 1, table: "T7", status: "confirmed",  phone: "+91 96201 56783" },
  { id: 4, name: "Siddharth Jain",  time: "1:00 PM",  guests: 3, table: "T2", status: "confirmed",  phone: "+91 95201 56784" },
  { id: 5, name: "Priya Mehta",     time: "2:30 PM",  guests: 2, table: "T5", status: "pending",    phone: "+91 94201 56785" },
  { id: 6, name: "Arjun Singh",     time: "4:00 PM",  guests: 6, table: "T8", status: "cancelled",  phone: "+91 93201 56786" },
  { id: 7, name: "Nisha Gupta",     time: "6:00 PM",  guests: 2, table: "T4", status: "pending",    phone: "+91 92201 56787" },
];

const TOP_ITEMS = [
  { name: "Signature Flat White",  orders: 48, pct: 100 },
  { name: "Almond Croissant",      orders: 35, pct: 73  },
  { name: "Matcha Oat Latte",      orders: 29, pct: 60  },
  { name: "Dark Chocolate Tart",   orders: 22, pct: 46  },
  { name: "Smashed Avo Toast",     orders: 18, pct: 38  },
];

const WEEK  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const REV   = [4200, 5800, 3900, 7200, 6100, 8450, 5300];
const maxR  = Math.max(...REV);

const SC: Record<Status, { bg: string; color: string; label: string }> = {
  confirmed: { bg: "#D1FAE5", color: "#059669", label: "Confirmed" },
  pending:   { bg: "#FEF3C7", color: "#D97706", label: "Pending"   },
  cancelled: { bg: "#FEE2E2", color: "#DC2626", label: "Cancelled" },
};

/* ── Component ─────────────────────────────────────────────────────────── */
export default function BrewedDashboard() {
  const [rows, setRows] = useState<Reservation[]>(INITIAL);
  const [tab, setTab] = useState<"all" | "pending" | "confirmed">("all");

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  const filtered = tab === "all" ? rows : rows.filter(r => r.status === tab);
  const pending   = rows.filter(r => r.status === "pending").length;
  const confirmed = rows.filter(r => r.status === "confirmed").length;

  const update = (id: number, s: Status) =>
    setRows(p => p.map(r => r.id === id ? { ...r, status: s } : r));

  return (
    <div style={{ minHeight: "100vh", background: "#F9F5EF", fontFamily: "Inter, sans-serif" }}>

      {/* ── Sticky Header ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 30, background: "#fff",
        borderBottom: "1px solid rgba(28,18,10,0.08)", padding: "1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: "1.2rem", color: "#1C120A" }}>Good Morning, Rahul ☕</div>
          <div style={{ fontSize: "0.75rem", color: "#A08070", marginTop: "0.1rem" }}>{today}</div>
        </div>
        <div style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: "0.35rem",
            padding: "0.45rem 0.875rem", borderRadius: 999,
            border: "1px solid rgba(28,18,10,0.1)", background: "#fff",
            color: "#6B5B4E", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}>
            <Download size={13} /> Export
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: "0.35rem",
            padding: "0.45rem 0.875rem", borderRadius: 999, border: "none",
            background: "#1C120A", color: "#fff",
            fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}>
            <Plus size={13} /> New Reservation
          </button>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", background: "#C8A06E",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "0.72rem", color: "#1C120A",
          }}>RK</div>
        </div>
      </div>

      <div style={{ padding: "1.75rem 2rem" }}>

        {/* ── Stats Row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.75rem" }}>
          {[
            { label: "Today's Reservations", value: rows.length, sub: `${pending} pending`, icon: <Calendar size={17} />, bg: "#FDF6E3", accent: "#C05E3E" },
            { label: "Revenue MTD",          value: "₹1.45L",    sub: "+12% vs last month", icon: <TrendingUp size={17} />, bg: "#E6F4EA", accent: "#059669" },
            { label: "Confirmed Today",      value: confirmed,   sub: `of ${rows.length} total`, icon: <Check size={17} />, bg: "#EDE9FF", accent: "#7C3AED" },
            { label: "Google Rating",        value: "4.9★",      sub: "120+ reviews",       icon: <Star size={17} />,     bg: "#FEF3E2", accent: "#D97706" },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: "1.125rem 1.25rem", display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", justifyContent: "center", color: s.accent, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1C120A", lineHeight: 1, fontFamily: "'Playfair Display', Georgia, serif" }}>{s.value}</div>
                <div style={{ fontSize: "0.65rem", color: "#6B5B4E", fontWeight: 700, marginTop: "0.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                <div style={{ fontSize: "0.68rem", color: s.accent, marginTop: "0.15rem", fontWeight: 600 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Two Columns ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 330px", gap: "1.5rem", alignItems: "start" }}>

          {/* Reservations Table */}
          <div style={{ background: "#fff", border: "1px solid rgba(28,18,10,0.08)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "1.125rem 1.5rem", borderBottom: "1px solid rgba(28,18,10,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#1C120A" }}>Today&apos;s Reservations</div>
                <div style={{ fontSize: "0.72rem", color: "#A08070", marginTop: "0.15rem" }}>Manage and update table status</div>
              </div>
              {/* Tab toggle */}
              <div style={{ display: "flex", gap: "0.2rem", background: "#F9F5EF", padding: "0.25rem", borderRadius: 999 }}>
                {(["all", "pending", "confirmed"] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: "0.28rem 0.75rem", borderRadius: 999, border: "none", cursor: "pointer",
                    background: tab === t ? "#1C120A" : "transparent",
                    color: tab === t ? "#fff" : "#A08070",
                    fontSize: "0.72rem", fontWeight: 700, textTransform: "capitalize",
                    fontFamily: "Inter, sans-serif", transition: "all 0.15s",
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9F5EF" }}>
                    {["Guest", "Time", "Guests", "Table", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "0.7rem 1rem", textAlign: "left", fontSize: "0.62rem", fontWeight: 700, color: "#A08070", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(28,18,10,0.07)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => {
                    const sc = SC[r.status];
                    return (
                      <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(28,18,10,0.06)" : "none" }}>
                        <td style={{ padding: "0.8rem 1rem" }}>
                          <div style={{ fontWeight: 700, fontSize: "0.855rem", color: "#1C120A" }}>{r.name}</div>
                          <div style={{ fontSize: "0.68rem", color: "#A08070", marginTop: "0.1rem" }}>{r.phone}</div>
                        </td>
                        <td style={{ padding: "0.8rem 1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", color: "#1C120A", fontWeight: 600 }}>
                            <Clock size={12} color="#C05E3E" /> {r.time}
                          </div>
                        </td>
                        <td style={{ padding: "0.8rem 1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.82rem", color: "#1C120A" }}>
                            <Users size={12} color="#A08070" /> {r.guests}
                          </div>
                        </td>
                        <td style={{ padding: "0.8rem 1rem", fontSize: "0.82rem", fontWeight: 700, color: "#1C120A" }}>{r.table}</td>
                        <td style={{ padding: "0.8rem 1rem" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", padding: "0.18rem 0.6rem", borderRadius: 999, background: sc.bg, color: sc.color, fontSize: "0.68rem", fontWeight: 700 }}>
                            {sc.label}
                          </span>
                        </td>
                        <td style={{ padding: "0.8rem 1rem" }}>
                          <div style={{ display: "flex", gap: "0.35rem" }}>
                            {r.status !== "confirmed" && (
                              <button onClick={() => update(r.id, "confirmed")} title="Confirm" style={{ width: 26, height: 26, borderRadius: 6, border: "none", background: "#D1FAE5", color: "#059669", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Check size={12} />
                              </button>
                            )}
                            {r.status !== "cancelled" && (
                              <button onClick={() => update(r.id, "cancelled")} title="Cancel" style={{ width: 26, height: 26, borderRadius: 6, border: "none", background: "#FEE2E2", color: "#DC2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <X size={12} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Revenue chart */}
            <div style={{ background: "#fff", border: "1px solid rgba(28,18,10,0.08)", borderRadius: 16, padding: "1.25rem" }}>
              <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1C120A" }}>Weekly Revenue</div>
              <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#1C120A", fontFamily: "'Playfair Display', Georgia, serif", marginTop: "0.25rem" }}>₹41,950</div>
              <div style={{ fontSize: "0.68rem", color: "#059669", fontWeight: 700, marginBottom: "1.125rem" }}>↑ 12% vs last week</div>
              <div style={{ display: "flex", gap: "0.35rem", alignItems: "flex-end", height: 75 }}>
                {REV.map((v, i) => {
                  const h = Math.round((v / maxR) * 62);
                  const isToday = i === 5;
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                      <div style={{ width: "100%", height: h, borderRadius: "4px 4px 0 0", background: isToday ? "#C05E3E" : "#F5EDD3", transition: "height 0.4s" }} />
                      <span style={{ fontSize: "0.56rem", color: isToday ? "#C05E3E" : "#A08070", fontWeight: isToday ? 800 : 500 }}>{WEEK[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top items */}
            <div style={{ background: "#fff", border: "1px solid rgba(28,18,10,0.08)", borderRadius: 16, padding: "1.25rem" }}>
              <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1C120A", marginBottom: "1rem" }}>Top Items Today</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {TOP_ITEMS.map((item, i) => (
                  <div key={item.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.28rem" }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1C120A" }}>
                        <span style={{ color: "#A08070", marginRight: "0.3rem", fontSize: "0.68rem" }}>{i + 1}.</span>
                        {item.name}
                      </span>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#C05E3E" }}>{item.orders}</span>
                    </div>
                    <div style={{ height: 5, background: "#F5EDD3", borderRadius: 99 }}>
                      <div style={{ height: 5, width: `${item.pct}%`, background: "#C05E3E", borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ background: "#1C120A", borderRadius: 16, padding: "1.25rem" }}>
              <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#fff", marginBottom: "0.875rem" }}>Quick Actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Add Menu Item", "View Full Menu", "Export Reservations", "Update Hours"].map(a => (
                  <button key={a} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0.6rem 0.875rem", borderRadius: 10, border: "none",
                    background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)",
                    fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                    fontFamily: "Inter, sans-serif", textAlign: "left", width: "100%",
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
                    {a} <span style={{ color: "#C8A06E" }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
