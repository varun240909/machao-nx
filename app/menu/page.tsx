import type { Metadata } from "next"
import { menuCategories } from "@/data/menu"
import VegFilter from "@/components/menu/VegFilter"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Menu — Machao NX",
  description: "Full menu — noodles, biryani, starters, soups, rice & more.",
}

export default function MenuPage() {
  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <Link href="/">
          <img src="/machao-nx-transeparent.png" alt="Machao NX" className="logo" />
        </Link>
        <nav>
          <Link href="/menu" style={{ color: "var(--primary)" }}>Menu</Link>
          <Link href="/locations">Locations</Link>
        </nav>
        <Link href="/" className="btn-cta">Back to Home</Link>
      </header>

      <div className="menu-page-header">
        <h1 className="section-title">FULL MENU</h1>
        <p className="menu-page-tagline">
          13 categories. All the goods. No cap.
        </p>
      </div>

      <VegFilter categories={menuCategories} />
    </>
  )
}
