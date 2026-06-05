import Link from "next/link"
import { connectDB } from "@/lib/db"
import { MenuItemModel } from "@/lib/models/MenuItem"
import { CategoryModel } from "@/lib/models/Category"
import StatsCard from "@/components/admin/StatsCard"
import { Plus } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  await connectDB()
  const [totalItems, totalCats, featured, vegItems] = await Promise.all([
    MenuItemModel.countDocuments(),
    CategoryModel.countDocuments(),
    MenuItemModel.countDocuments({ isFeatured: true }),
    MenuItemModel.countDocuments({ isVeg: true }),
  ])

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "32px", textTransform: "uppercase" }}>
          Dashboard
        </h1>
        <Link
          href="/admin/products/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 20px",
            background: "var(--primary)",
            color: "white",
            border: "2px solid var(--dark)",
            boxShadow: "4px 4px 0 var(--dark)",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          <Plus size={14} /> Add Product
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
        <StatsCard value={totalItems} label="Total Items" accentColor="primary" />
        <StatsCard value={totalCats} label="Categories" accentColor="secondary" />
        <StatsCard value={featured} label="Featured" accentColor="accent" />
        <StatsCard value={vegItems} label="Veg Items" accentColor="dark" />
        <StatsCard value={totalItems - vegItems} label="Non-Veg Items" accentColor="primary" />
      </div>

      <div style={{ marginTop: "40px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Link
          href="/admin/products"
          style={{
            padding: "12px 24px",
            background: "white",
            border: "var(--border)",
            boxShadow: "4px 4px 0 var(--dark)",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "var(--dark)",
          }}
        >
          View All Products →
        </Link>
      </div>
    </div>
  )
}
