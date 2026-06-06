import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { MenuItemModel } from "@/lib/models/MenuItem"

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId")
    const search = searchParams.get("search")

    const featured = searchParams.get("featured")

    const query: Record<string, any> = {}
    if (categoryId) query.categoryId = categoryId
    if (search) query.name = { $regex: search, $options: "i" }
    if (featured === "true") query.isFeatured = true

    const items = await MenuItemModel.find(query).lean()
    return NextResponse.json(items)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    await connectDB()
    const body = await req.json()
    const item = await MenuItemModel.create(body)
    return NextResponse.json(item, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Failed to create product" }, { status: 500 })
  }
}
