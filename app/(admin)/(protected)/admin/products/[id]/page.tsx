import { notFound } from "next/navigation"
import { connectDB } from "@/lib/db"
import { MenuItemModel, type IMenuItem } from "@/lib/models/MenuItem"
import { CategoryModel, type ICategory } from "@/lib/models/Category"
import ProductForm from "@/components/admin/ProductForm"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  await connectDB()
  const [rawItem, rawCats] = await Promise.all([
    MenuItemModel.findOne({ id }).lean(),
    CategoryModel.find().sort({ label: 1 }).lean(),
  ])

  if (!rawItem) notFound()

  const item: IMenuItem = JSON.parse(JSON.stringify(rawItem))
  const categories: ICategory[] = JSON.parse(JSON.stringify(rawCats))

  return (
    <div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "28px", textTransform: "uppercase", marginBottom: "32px" }}>
        Edit Product
      </h1>
      <div style={{ marginBottom: "12px", fontSize: "13px", color: "#888" }}>
        ID: <code style={{ background: "#f3f4f6", padding: "2px 6px", fontFamily: "monospace" }}>{id}</code>
      </div>
      <ProductForm
        categories={categories}
        defaultValues={item}
        isEdit
        itemId={item.id}
      />
    </div>
  )
}
