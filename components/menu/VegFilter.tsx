"use client"

import { useState } from "react"
import type { MenuCategory } from "@/data/menu"
import CategorySection from "./CategorySection"
import CategorySidebar from "./CategorySidebar"
import MobileFilterTabs from "./MobileFilterTabs"

type Filter = "all" | "veg" | "non-veg"

interface VegFilterProps {
  categories: MenuCategory[]
}

export default function VegFilter({ categories }: VegFilterProps) {
  const [filter, setFilter] = useState<Filter>("all")

  const filtered: MenuCategory[] = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        if (filter === "veg") return item.isVeg === true
        if (filter === "non-veg") return item.isVeg === false
        return true
      }),
    }))
    .filter((cat) => cat.items.length > 0)

  return (
    <>
      {/* Veg / Non-Veg filter bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px",
          borderBottom: "var(--border)",
          background: "white",
          flexWrap: "nowrap",
          position: "sticky",
          top: "80px",
          zIndex: 100,
        }}
      >
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "var(--dark)",
            flexShrink: 0,
          }}
        >
          Filter:
        </span>

        {(["all", "veg", "non-veg"] as Filter[]).map((f) => {
          const labels: Record<Filter, string> = {
            all: "All",
            veg: "🟢 Veg",
            "non-veg": "🔴 Non-Veg",
          }
          const isActive = filter === f
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="btn-cta"
              style={{
                background: isActive
                  ? f === "veg"
                    ? "#22c55e"
                    : f === "non-veg"
                    ? "#ef4444"
                    : "var(--dark)"
                  : "white",
                color: isActive ? "white" : "var(--dark)",
                fontSize: "11px",
                padding: "6px 12px",
                boxShadow: isActive ? "3px 3px 0 var(--dark)" : "2px 2px 0 var(--dark)",
                flexShrink: 0,
              }}
            >
              {labels[f]}
            </button>
          )
        })}

        {filter !== "all" && (
          <span style={{ fontSize: "11px", color: "#888", fontWeight: 600, flexShrink: 0 }}>
            {filtered.reduce((n, cat) => n + cat.items.length, 0)} items
          </span>
        )}
      </div>

      {/* Main layout with sidebar + content */}
      <div className="menu-page-layout">
        <CategorySidebar categories={filtered} />
        <main className="menu-main">
          <MobileFilterTabs categories={filtered} />
          {filtered.length > 0 ? (
            filtered.map((cat) => <CategorySection key={cat.id} category={cat} />)
          ) : (
            <div
              style={{
                padding: "80px 40px",
                textAlign: "center",
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "24px",
                textTransform: "uppercase",
                color: "#ccc",
              }}
            >
              No items found
            </div>
          )}
        </main>
      </div>
    </>
  )
}
