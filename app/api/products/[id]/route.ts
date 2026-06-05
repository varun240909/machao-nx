import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { MenuItemModel } from "@/lib/models/MenuItem"

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params
  try {
    await connectDB()
    const item = await MenuItemModel.findOne({ id }).lean()
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  try {
    await connectDB()
    const body = await req.json()
    const item = await MenuItemModel.findOneAndUpdate({ id }, body, { returnDocument: "after" })
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(item)
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  try {
    await connectDB()
    const item = await MenuItemModel.findOneAndDelete({ id })
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
