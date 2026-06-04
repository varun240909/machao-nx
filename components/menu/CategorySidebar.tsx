"use client"

import { useEffect, useState } from "react"
import type { MenuCategory } from "@/data/menu"

interface CategorySidebarProps {
  categories: MenuCategory[]
}

export default function CategorySidebar({ categories }: CategorySidebarProps) {
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

  return (
    <aside className="menu-sidebar">
      <nav>
        <ul className="sidebar-nav">
          {categories.map((cat) => (
            <li key={cat.id}>
              <a
                href={`#${cat.id}`}
                className={`sidebar-link${activeId === cat.id ? " active" : ""}`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
