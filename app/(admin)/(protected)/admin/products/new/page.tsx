import { connectDB } from "@/lib/db"
import { CategoryModel, type ICategory } from "@/lib/models/Category"
import ProductForm from "@/components/admin/ProductForm"

export const dynamic = "force-dynamic"

export default async function NewProductPage() {
  await connectDB()
  const raw = await CategoryModel.find().sort({ label: 1 }).lean()
  const categories: ICategory[] = JSON.parse(JSON.stringify(raw))

  return (
    <div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "28px", textTransform: "uppercase", marginBottom: "32px" }}>
        Add Product
      </h1>
      <ProductForm categories={categories} />
    </div>
  )
}
