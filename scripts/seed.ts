import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
import dns from "dns"
dns.setServers(["8.8.8.8", "1.1.1.1"])
import mongoose from "mongoose"
import { menuCategories } from "../data/menu"

const MONGO_URL = process.env.NEXT_MONGO_URL!
if (!MONGO_URL) throw new Error("NEXT_MONGO_URL not set")

const CategorySchema = new mongoose.Schema({ id: String, label: String, emoji: String, accentColor: String }, { timestamps: true })
const MenuItemSchema = new mongoose.Schema(
  { id: String, categoryId: String, name: String, price: Number, description: String,
    tag: String, tagColor: String, isFeatured: Boolean, isVeg: Boolean, imageUrl: String },
  { timestamps: true }
)

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema)
const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema)

async function seed() {
  await mongoose.connect(MONGO_URL, { bufferCommands: false, family: 4 })
  console.log("Connected to MongoDB")

  await Category.deleteMany({})
  await MenuItem.deleteMany({})
  console.log("Cleared existing data")

  for (const cat of menuCategories) {
    await Category.create({ id: cat.id, label: cat.label, emoji: cat.emoji, accentColor: cat.accentColor })
    for (const item of cat.items) {
      await MenuItem.create({ ...item, categoryId: cat.id })
    }
  }

  const catCount = await Category.countDocuments()
  const itemCount = await MenuItem.countDocuments()
  console.log(`Seeded: ${catCount} categories, ${itemCount} items`)
  await mongoose.disconnect()
}

seed().catch((err) => { console.error(err); process.exit(1) })
