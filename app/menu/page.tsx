import type { Metadata } from "next"
import Link from "next/link"
import { menuCategories as staticCategories, type MenuCategory } from "@/data/menu"
import VegFilter from "@/components/menu/VegFilter"

export const metadata: Metadata = {
  title: "Menu — Machao NX",
  description: "Full menu — noodles, biryani, starters, soups, rice & more.",
}

export const revalidate = 60

async function getCategories(): Promise<MenuCategory[]> {
  try {
    const { connectDB } = await import("@/lib/db")
    const { CategoryModel } = await import("@/lib/models/Category")
    const { MenuItemModel } = await import("@/lib/models/MenuItem")

    await connectDB()
    const [cats, items] = await Promise.all([
      CategoryModel.find().lean(),
      MenuItemModel.find().lean(),
    ])

    if (!cats.length) return staticCategories

    const itemsByCat = new Map<string, typeof items>()
    for (const item of items) {
      const list = itemsByCat.get(item.categoryId) ?? []
      list.push(item)
      itemsByCat.set(item.categoryId, list)
    }

    return (cats as any[]).map(cat => ({
      id: cat.id,
      label: cat.label,
      emoji: cat.emoji,
      accentColor: cat.accentColor,
      items: (itemsByCat.get(cat.id) ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        tag: item.tag,
        tagColor: item.tagColor,
        description: item.description,
        isFeatured: item.isFeatured,
        isVeg: item.isVeg,
        imageUrl: item.imageUrl,
      })),
    })) satisfies MenuCategory[]
  } catch {
    return staticCategories
  }
}

export default async function MenuPage() {
  const categories = await getCategories()

  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <Link href="/">
          <img src="https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1780657521/ChatGPT_Image_Jun_5__2026__04_29_05_PM-removebg-preview-Photoroom_sqsmdy.png" alt="Machao NX" className="logo" />
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

      <VegFilter categories={categories} />
    </>
  )
}
