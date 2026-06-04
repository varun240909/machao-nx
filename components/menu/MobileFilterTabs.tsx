"use client"

import { useEffect, useState } from "react"
import type { MenuCategory } from "@/data/menu"

interface MobileFilterTabsProps {
  categories: MenuCategory[]
}

export default function MobileFilterTabs({ categories }: MobileFilterTabsProps) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "")

  useEffect(() => {
    const sections = categories
      .map((cat) => document.getElementById(cat.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [categories])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="mobile-filter-tabs">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`filter-pill${activeId === cat.id ? " active" : ""}`}
          onClick={() => scrollTo(cat.id)}
        >
          <span style={{ fontSize: "20px", lineHeight: 1, display: "block" }}>{cat.emoji}</span>
          <span
            style={{
              fontSize: "9px",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              marginTop: "3px",
            }}
          >
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  )
}
