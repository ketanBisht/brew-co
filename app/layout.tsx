import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Brewed & Co. — Artisan Café & Bakery, Bandra Mumbai",
    template: "%s | Brewed & Co.",
  },
  description:
    "Mumbai's favourite artisan café. Single-origin espresso, handcrafted bakes, and a warm corner to call your own. Located in Bandra West.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
