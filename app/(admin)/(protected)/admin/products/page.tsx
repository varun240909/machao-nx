import Link from "next/link"
import { connectDB } from "@/lib/db"
import { MenuItemModel, type IMenuItem } from "@/lib/models/MenuItem"
import { CategoryModel, type ICategory } from "@/lib/models/Category"
import DeleteProductDialog from "@/components/admin/DeleteProductDialog"
import { Plus, Pencil } from "lucide-react"

export const dynamic = "force-dynamic"

interface Props {
  searchParams: Promise<{ search?: string; category?: string }>
}

export default async function ProductsPage({ searchParams: searchParamsPromise }: Props) {
  const searchParams = await searchParamsPromise
  await connectDB()

  const [rawCats, rawItems] = await Promise.all([
    CategoryModel.find().lean(),
    (async () => {
      const query: Record<string, any> = {}
      if (searchParams.search) query.name = { $regex: searchParams.search, $options: "i" }
      if (searchParams.category) query.categoryId = searchParams.category
      return MenuItemModel.find(query).sort({ categoryId: 1, name: 1 }).lean()
    })(),
  ])

  const categories: ICategory[] = JSON.parse(JSON.stringify(rawCats))
  const allItems: IMenuItem[] = JSON.parse(JSON.stringify(rawItems))

  const catMap = Object.fromEntries(categories.map(c => [c.id, c]))

  const thStyle: React.CSSProperties = {
    padding: "10px 12px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: "var(--border)",
    whiteSpace: "nowrap",
  }

  const tdStyle: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: "13px",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle",
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "28px", textTransform: "uppercase" }}>
          Products <span style={{ fontSize: "16px", fontWeight: 500, color: "#888" }}>({allItems.length})</span>
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

      {/* Filters */}
      <form method="GET" style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          name="search"
          defaultValue={searchParams.search ?? ""}
          placeholder="Search by name..."
          style={{
            padding: "9px 12px",
            border: "var(--border)",
            background: "white",
            fontFamily: "inherit",
            fontSize: "13px",
            fontWeight: 500,
            outline: "none",
            minWidth: "200px",
          }}
        />
        <select
          name="category"
          defaultValue={searchParams.category ?? ""}
          style={{
            padding: "9px 12px",
            border: "var(--border)",
            background: "white",
            fontFamily: "inherit",
            fontSize: "13px",
            fontWeight: 500,
            outline: "none",
          }}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
          ))}
        </select>
        <button
          type="submit"
          style={{
            padding: "9px 20px",
            background: "var(--dark)",
            color: "white",
            border: "2px solid var(--dark)",
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Filter
        </button>
        {(searchParams.search || searchParams.category) && (
          <Link
            href="/admin/products"
            style={{ padding: "9px 16px", background: "white", border: "var(--border)", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", textDecoration: "none", color: "var(--dark)", display: "inline-flex", alignItems: "center" }}
          >
            Clear
          </Link>
        )}
      </form>

      {/* Table */}
      <div style={{ background: "white", border: "var(--border)", boxShadow: "4px 4px 0 var(--dark)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--dark)", color: "white" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Tag</th>
              <th style={thStyle}>Veg</th>
              <th style={thStyle}>Featured</th>
              <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allItems.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ ...tdStyle, textAlign: "center", padding: "40px", color: "#888" }}>
                  No products found. <Link href="/admin/products/new" style={{ color: "var(--primary)", fontWeight: 700 }}>Add one →</Link>
                </td>
              </tr>
            ) : (
              allItems.map(item => {
                const cat = catMap[item.categoryId]
                return (
                  <tr key={item.id} style={{ transition: "background 0.1s" }}>
                    <td style={{ ...tdStyle, fontWeight: 600, maxWidth: "220px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" style={{ width: "32px", height: "32px", objectFit: "cover", border: "2px solid var(--dark)", flexShrink: 0 }} />
                        ) : (
                          <div style={{ width: "32px", height: "32px", background: "#f3f4f6", border: "2px solid var(--dark)", flexShrink: 0 }} />
                        )}
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</span>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: "12px" }}>
                        {cat ? `${cat.emoji} ${cat.label}` : item.categoryId}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 700, whiteSpace: "nowrap" }}>₹{item.price}</td>
                    <td style={tdStyle}>
                      {item.tag ? (
                        <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 7px", background: "var(--accent)", border: "1.5px solid var(--dark)", textTransform: "uppercase" }}>
                          {item.tag}
                        </span>
                      ) : <span style={{ color: "#ccc" }}>—</span>}
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: "13px" }}>{item.isVeg ? "🟢" : "🔴"}</span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: "13px" }}>{item.isFeatured ? "⭐" : "—"}</span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                        <Link
                          href={`/admin/products/${item.id}`}
                          style={{
                            padding: "6px 8px",
                            background: "var(--accent)",
                            border: "2px solid var(--dark)",
                            color: "var(--dark)",
                            display: "flex",
                            alignItems: "center",
                          }}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeleteProductDialog id={item.id} name={item.name} />
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
