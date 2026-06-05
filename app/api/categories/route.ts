import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { CategoryModel } from "@/lib/models/Category"

export async function GET() {
  try {
    await connectDB()
    const categories = await CategoryModel.find().lean()
    return NextResponse.json(categories)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
