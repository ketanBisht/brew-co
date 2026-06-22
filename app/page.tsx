"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Coffee, Clock, MapPin, Phone, Mail, Star,
  ArrowUpRight, ChevronRight, Check, Leaf, Flame, Heart, LayoutDashboard,
} from "lucide-react";

/* ── Data ────────────────────────────────────────────────────────────────── */
type MenuCat = "all" | "coffee" | "food" | "bakery";

const menuItems = [
  { name: "Signature Flat White",   cat: "coffee" as MenuCat, price: "₹320", desc: "Double ristretto, velvety micro-foam, house-blended Arabica.",  emoji: "☕", bg: "#FDF6E3", accent: "#C05E3E", tag: "BESTSELLER", tagBg: "#FDECEA", tagColor: "#9E4A2E", wide: true },
  { name: "Matcha Oat Latte",       cat: "coffee" as MenuCat, price: "₹290", desc: "Ceremonial-grade matcha, steamed oat milk, touch of agave.",     emoji: "🍵", bg: "#EDF5EE", accent: "#5E8C61", tag: "VEGAN",      tagBg: "#EDF5EE", tagColor: "#3E6B41", wide: false },
  { name: "Cold Brew Tonic",        cat: "coffee" as MenuCat, price: "₹280", desc: "12-hr cold brew, Indian tonic, squeeze of yuzu.",               emoji: "🧊", bg: "#E0EEFF", accent: "#2563EB", tag: "SEASONAL",   tagBg: "#DBEAFE", tagColor: "#1D4ED8", wide: false },
  { name: "Almond Croissant",       cat: "bakery" as MenuCat, price: "₹220", desc: "Flaky, buttery, packed with almond frangipane. Baked each morning.", emoji: "🥐", bg: "#FEF3E2", accent: "#D97706", tag: "FRESH",  tagBg: "#FEF3E2", tagColor: "#92400E", wide: false },
  { name: "Dark Chocolate Tart",    cat: "bakery" as MenuCat, price: "₹260", desc: "70% Valrhona ganache, salted caramel swirl, crisp pastry shell.", emoji: "🍫", bg: "#F5EDE0", accent: "#C05E3E", tag: "MUST TRY", tagBg: "#FDECEA", tagColor: "#9E4A2E", wide: false },
  { name: "Smashed Avo Toast",      cat: "food"   as MenuCat, price: "₹380", desc: "Sourdough, smashed avocado, micro herbs, chilli flakes, poached egg.", emoji: "🥑", bg: "#F0F9F0", accent: "#5E8C61", tag: "CHEF'S PICK", tagBg: "#EDF5EE", tagColor: "#3E6B41", wide: true },
  { name: "Shakshuka Bowl",         cat: "food"   as MenuCat, price: "₹420", desc: "Spiced tomato sauce, two poached eggs, sourdough on the side.",   emoji: "🍳", bg: "#FEF3E2", accent: "#D97706", tag: "BRUNCH",   tagBg: "#FEF3E2", tagColor: "#92400E", wide: false },
  { name: "Granola Parfait",        cat: "food"   as MenuCat, price: "₹290", desc: "House granola, Greek yogurt, seasonal berries, raw honey drizzle.", emoji: "🫙", bg: "#EDF5EE", accent: "#5E8C61", tag: "HEALTHY",  tagBg: "#EDF5EE", tagColor: "#3E6B41", wide: false },
];

const testimonials = [
  { name: "Naina Kapoor",    role: "Food Blogger",      text: "Hands down the best flat white in Mumbai. The atmosphere is everything — cozy, calm, and beautifully designed.", rating: 5 },
  { name: "Rohan Verma",     role: "Regular since 2021", text: "I work from here twice a week. Fast wifi, amazing almond croissants, and the friendliest staff.", rating: 5 },
  { name: "Ishita Malhotra", role: "Interior Designer",  text: "Brewed & Co. is what happens when someone who loves coffee also has great taste in design. Stunning space.", rating: 5 },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1532634461170-79c5e2908cc3?w=500&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=500&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&auto=format&fit=crop&q=70",
];

const HOURS = [
  { day: "Mon – Fri", time: "7:30 AM – 9:00 PM" },
  { day: "Saturday",  time: "8:00 AM – 10:00 PM" },
  { day: "Sunday",    time: "9:00 AM – 8:00 PM"  },
];

/* ── Component ───────────────────────────────────────────────────────────── */
export default function BrewedCoPage() {
  const [activeCat, setActiveCat] = useState<MenuCat>("all");
  const [form, setForm] = useState({ name: "", date: "", time: "", guests: "2" });
  const [toast, setToast] = useState({ show: false, msg: "" });

  const visibleItems = activeCat === "all" ? menuItems : menuItems.filter(m => m.cat === activeCat);

  function showToast(msg: string) {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3500);
  }
  function handleReserve(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.date || !form.time) { showToast("Please fill in all fields ✦"); return; }
    showToast(`Table reserved for ${form.guests} on ${form.date} at ${form.time}! We'll confirm shortly ☕`);
    setForm({ name: "", date: "", time: "", guests: "2" });
  }

  const CATS: { key: MenuCat; label: string; emoji: string }[] = [
    { key: "all",    label: "All Items", emoji: "✦" },
    { key: "coffee", label: "Coffee",    emoji: "☕" },
    { key: "food",   label: "Food",      emoji: "🥑" },
    { key: "bakery", label: "Bakery",    emoji: "🥐" },
  ];

  return (
    <div style={{ background: "var(--bg-outer)", color: "var(--text-primary)", fontFamily: "var(--font-body)", overflowX: "hidden" }}>

      {/* Toast */}
      {toast.show && (
        <div style={{ position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)", background: "var(--espresso)", color: "#fff", padding: "0.875rem 1.5rem", borderRadius: 999, fontSize: "0.875rem", fontWeight: 600, zIndex: 999, boxShadow: "0 8px 32px rgba(28,18,10,0.35)", whiteSpace: "nowrap", animation: "slide-up 0.3s ease" }}>
          {toast.msg}
        </div>
      )}

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(253,246,227,0.92)", backdropFilter: "blur(12px)", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", borderBottom: "1px solid var(--border)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, background: "var(--espresso)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Coffee size={18} color="#C8A06E" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.05rem", color: "var(--espresso)" }}>Brewed & Co.</span>
        </Link>

        <div className="nav-links" style={{ display: "flex", gap: "2.5rem" }}>
          {["Menu", "Reserve", "About", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--espresso)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>{item}</a>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Link href="/dashboard" className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", fontWeight: 600, padding: "0.4rem 0.875rem", border: "1px solid rgba(28,18,10,0.15)", borderRadius: 999, color: "var(--text-secondary)", textDecoration: "none", transition: "all 0.18s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--espresso)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--espresso)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ""; (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(28,18,10,0.15)"; }}>
            <LayoutDashboard size={13} /> Owner Panel
          </Link>
          <a href="#reserve" style={{ fontSize: "0.82rem", fontWeight: 700, padding: "0.5rem 1.125rem", background: "var(--espresso)", color: "#fff", borderRadius: 999, textDecoration: "none", transition: "all 0.18s" }}>
            Book a Table
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 64, background: "var(--cream)", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="hero-grid">
          {/* Left */}
          <div className="animate-fade-in">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#FDECEA", border: "1px solid rgba(192,94,62,0.25)", borderRadius: 999, padding: "0.3rem 0.875rem", fontSize: "0.7rem", fontWeight: 700, color: "var(--terracotta-dark)", marginBottom: "1.5rem", letterSpacing: "0.08em" }}>
              ☕ &nbsp;Bandra&apos;s Favourite Corner Café
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: "var(--espresso)" }}>
              Where Every<br /><span style={{ color: "var(--terracotta)" }}>Cup Tells</span><br />a Story.
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginBottom: "2.5rem", maxWidth: 400, lineHeight: 1.8 }}>
              Single-origin espresso, fresh-baked pastries, and a warm corner to call your own — right in the heart of Bandra West.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="#menu" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--espresso)", color: "#fff", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.5rem", borderRadius: 999, textDecoration: "none" }}>
                See Our Menu <ArrowUpRight size={15} />
              </a>
              <a href="#reserve" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "transparent", color: "var(--espresso)", fontWeight: 600, fontSize: "0.875rem", padding: "0.75rem 1.5rem", borderRadius: 999, textDecoration: "none", border: "1.5px solid var(--border-strong)" }}>
                Reserve a Table <ChevronRight size={15} />
              </a>
            </div>
            {/* Stats */}
            <div className="stats-row" style={{ display: "flex", gap: "2.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
              {[{ n: "5yr", label: "Est. 2019" }, { n: "40+", label: "Menu Items" }, { n: "4.9★", label: "Google Rating" }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: "1.75rem", fontFamily: "var(--font-display)", fontWeight: 900, lineHeight: 1, color: "var(--espresso)" }}>{s.n}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Today's Special card + Hours */}
          <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Today's Special big card */}
            <div style={{ background: "var(--espresso)", borderRadius: 20, padding: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "rgba(200,160,110,0.08)", borderRadius: "0 0 0 100%" }} />
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: "#C8A06E", borderRadius: 999, padding: "0.25rem 0.75rem", fontSize: "0.62rem", fontWeight: 800, color: "#1C120A", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                ✦ Today&apos;s Special
              </div>
              <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>☕</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>Spiced Pumpkin Latte</div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                Our seasonal special — house-made pumpkin spice syrup, oat milk, double espresso, topped with cinnamon dust.
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 900, color: "#C8A06E" }}>₹340</div>
                <div style={{ display: "flex", gap: "0.2rem" }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#C8A06E" color="#C8A06E" />)}
                </div>
              </div>
            </div>

            {/* Hours widget */}
            <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981" }}>Open Now</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginLeft: "auto" }}>Closes at 9:00 PM</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {HOURS.map(h => (
                  <div key={h.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>{h.day}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--espresso)" }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: "var(--espresso)", overflow: "hidden", padding: "0.875rem 0" }}>
        <div style={{ display: "flex", gap: "3rem", animation: "marquee 28s linear infinite", whiteSpace: "nowrap" }}>
          {Array(3).fill(["SINGLE ORIGIN", "FRESH BAKES DAILY", "SLOW BREWED", "VEGAN OPTIONS", "SPECIALTY ROASTS", "OPEN 7 DAYS"]).flat().map((t, i) => (
            <span key={i} style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.14em" }}>
              {t} <span style={{ color: "#C8A06E", marginLeft: "0.75rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── MENU with Category Tabs ── */}
      <section id="menu" style={{ background: "var(--bg-outer)", padding: "5.5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--terracotta)", marginBottom: "0.75rem" }}>Our Favourites</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--espresso)" }}>A menu worth waking up for</h2>
          </div>

          {/* Category Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            {CATS.map(c => (
              <button key={c.key} onClick={() => setActiveCat(c.key)} style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 1.125rem", borderRadius: 999, border: "none",
                background: activeCat === c.key ? "var(--espresso)" : "#fff",
                color: activeCat === c.key ? "#fff" : "var(--text-secondary)",
                fontSize: "0.83rem", fontWeight: 700, cursor: "pointer",
                fontFamily: "var(--font-body)", transition: "all 0.18s",
                border_: activeCat === c.key ? "none" : "1px solid var(--border)",
                boxShadow: activeCat === c.key ? "none" : "0 1px 4px rgba(28,18,10,0.06)",
              }}>
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>

          {/* Menu Grid — CSS columns approach */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }} className="menu-grid">
            {visibleItems.map(item => (
              <div key={item.name} style={{
                background: item.bg, borderRadius: 18, padding: "1.5rem",
                gridColumn: item.wide ? "span 2" : "span 1",
                border: "1px solid rgba(28,18,10,0.05)",
                transition: "transform 0.18s, box-shadow 0.18s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(28,18,10,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.875rem" }}>
                  <div style={{ fontSize: "2rem" }}>{item.emoji}</div>
                  <span style={{ fontSize: "0.6rem", fontWeight: 800, padding: "0.2rem 0.625rem", borderRadius: 999, background: item.tagBg, color: item.tagColor, letterSpacing: "0.06em", textTransform: "uppercase" }}>{item.tag}</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--espresso)", marginBottom: "0.375rem" }}>{item.name}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.875rem" }}>{item.desc}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 900, color: item.accent }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY STRIP ── */}
      <section style={{ background: "var(--espresso)", padding: "4rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#C8A06E", marginBottom: "0.5rem" }}>Our Space</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 900, color: "#fff" }}>A place you&apos;ll want to stay in</h2>
            </div>
            <a href="#contact" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", fontWeight: 600, color: "#C8A06E", textDecoration: "none" }}>
              Find Us <ChevronRight size={14} />
            </a>
          </div>
        </div>
        {/* Horizontal scroll gallery */}
        <div style={{ display: "flex", gap: "1rem", paddingLeft: "calc((100vw - 1100px) / 2 + 2rem)", overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: "1rem", scrollbarWidth: "none" }}>
          {GALLERY.map((src, i) => (
            <div key={i} style={{ flexShrink: 0, width: 280, height: 220, borderRadius: 16, overflow: "hidden", scrollSnapAlign: "start", transition: "transform 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "")}>
              <img src={src} alt={`Gallery ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
          <div style={{ flexShrink: 0, width: 40 }} /> {/* end padding */}
        </div>
      </section>

      {/* ── RESERVATION ── */}
      <section id="reserve" style={{ background: "var(--cream)", padding: "5.5rem 2rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--terracotta)", marginBottom: "0.75rem" }}>Book Your Spot</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--espresso)" }}>Reserve a table</h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.75rem", fontSize: "0.95rem" }}>Walk-ins welcome. Reservations guarantee your favourite corner seat.</p>
          </div>
          <form onSubmit={handleReserve} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 20, padding: "2rem", display: "grid", gap: "1.25rem", boxShadow: "var(--shadow)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Your Name</label>
                <input type="text" placeholder="Aisha Sharma" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={{ width: "100%", background: "var(--bg-outer)", border: "1.5px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontFamily: "var(--font-body)", fontSize: "0.9rem", padding: "0.65rem 0.875rem", outline: "none" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--terracotta)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Guests</label>
                <select value={form.guests} onChange={e => setForm(p => ({ ...p, guests: e.target.value }))}
                  style={{ width: "100%", background: "var(--bg-outer)", border: "1.5px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontFamily: "var(--font-body)", fontSize: "0.9rem", padding: "0.65rem 0.875rem", outline: "none", cursor: "pointer" }}>
                  {["1", "2", "3", "4", "5", "6+"].map(n => <option key={n} value={n}>{n} {n === "1" ? "person" : "people"}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Date</label>
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  style={{ width: "100%", background: "var(--bg-outer)", border: "1.5px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontFamily: "var(--font-body)", fontSize: "0.9rem", padding: "0.65rem 0.875rem", outline: "none" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--terracotta)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Time</label>
                <select value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                  style={{ width: "100%", background: "var(--bg-outer)", border: "1.5px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontFamily: "var(--font-body)", fontSize: "0.9rem", padding: "0.65rem 0.875rem", outline: "none", cursor: "pointer" }}>
                  <option value="">Select time</option>
                  {["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" style={{ width: "100%", background: "var(--espresso)", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", padding: "0.875rem", borderRadius: 999, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              Confirm Reservation <Check size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="about" style={{ background: "var(--bg-outer)", padding: "5.5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--terracotta)", marginBottom: "0.75rem" }}>What Guests Say</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--espresso)" }}>Stories from our community</h2>
          </div>
          <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {testimonials.map((t, i) => (
              <div key={t.name} style={{ background: i === 1 ? "var(--espresso)" : "#fff", border: `1px solid ${i === 1 ? "transparent" : "var(--border)"}`, borderRadius: 16, padding: "1.75rem", transition: "transform 0.18s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "")}>
                <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem" }}>
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={13} fill={i === 1 ? "#C8A06E" : "var(--terracotta)"} color={i === 1 ? "#C8A06E" : "var(--terracotta)"} />)}
                </div>
                <p style={{ color: i === 1 ? "rgba(255,255,255,0.65)" : "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ fontWeight: 800, color: i === 1 ? "#fff" : "var(--espresso)", fontSize: "0.875rem" }}>{t.name}</div>
                <div style={{ color: "var(--terracotta)", fontSize: "0.75rem", marginTop: "0.125rem" }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: "var(--cream)", borderTop: "1px solid var(--border)", padding: "5.5rem 2rem" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--terracotta)", marginBottom: "0.75rem" }}>Come Visit Us</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--espresso)" }}>You know where to find us</h2>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem", display: "grid", gap: "1.25rem" }}>
            {[
              { icon: <MapPin size={16} />, label: "Address", value: "Shop 7, Chapel Road, Bandra West, Mumbai — 400050" },
              { icon: <Phone size={16} />, label: "Phone", value: "+91 98206 73821" },
              { icon: <Mail size={16} />, label: "Email", value: "hello@brewedandco.in" },
              { icon: <Clock size={16} />, label: "Hours", value: "Mon–Fri: 7:30 AM – 9:00 PM  ·  Sat–Sun: 8:00 AM – 10:00 PM" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "#FDECEA", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--terracotta)", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{item.label}</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--espresso)", padding: "2rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
          <div style={{ width: 28, height: 28, background: "#C8A06E", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Coffee size={14} color="#1C120A" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.9rem", color: "#fff" }}>Brewed & Co.</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.72rem" }}>© 2024 Brewed & Co. Café & Bakery. Bandra West, Mumbai.</p>
        <div style={{ marginTop: "1rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[{ href: "#menu", label: "Menu" }, { href: "#reserve", label: "Reservations" }, { href: "#contact", label: "Find Us" }, { href: "/dashboard", label: "Owner Dashboard" }].map(l => (
            <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.78rem", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>{l.label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
