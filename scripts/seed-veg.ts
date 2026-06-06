import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
import dns from "dns"
dns.setServers(["8.8.8.8", "1.1.1.1"])
import mongoose from "mongoose"

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

// ---------------------------------------------------------------------------
// Data from MENU.md — all veg items. Dual-price items use the full (large) price.
// ---------------------------------------------------------------------------

interface CatData {
  id: string; label: string; emoji: string; accentColor: string
  items: { id: string; name: string; price: number; isVeg: boolean; tag?: string; tagColor?: string; description?: string }[]
}

const vegCategories: CatData[] = [
  {
    id: "veg-soup",
    label: "Veg. Soup",
    emoji: "🍵",
    accentColor: "secondary",
    items: [
      { id: "vs-1",  name: "Tomato Soup",                  price: 130, isVeg: true },
      { id: "vs-2",  name: "Hot & Sour Soup",              price: 130, isVeg: true, tag: "Popular", tagColor: "accent" },
      { id: "vs-3",  name: "Manchow Soup",                 price: 110, isVeg: true },
      { id: "vs-4",  name: "Manchurian Soup",              price: 120, isVeg: true },
      { id: "vs-5",  name: "Mix Noodles Soup",             price: 150, isVeg: true },
      { id: "vs-6",  name: "Royal Soup",                   price: 150, isVeg: true },
      { id: "vs-7",  name: "Mushroom Soup",                price: 150, isVeg: true },
      { id: "vs-8",  name: "Lemon Pepper Coriander Soup",  price: 130, isVeg: true },
      { id: "vs-9",  name: "Sweet Corn Soup",              price: 140, isVeg: true },
    ],
  },
  {
    id: "veg-chinese-starters",
    label: "Veg. Chinese Starters",
    emoji: "🥡",
    accentColor: "accent",
    items: [
      { id: "vcs-1",  name: "Veg. Manchurian Gravy/Dry",        price: 210, isVeg: true },
      { id: "vcs-2",  name: "Veg. Chilly Gravy/Dry",            price: 220, isVeg: true, tag: "Spicy", tagColor: "primary" },
      { id: "vcs-3",  name: "Veg. Garlic Gravy/Dry",            price: 220, isVeg: true },
      { id: "vcs-4",  name: "Veg. Schezwan Gravy/Dry",          price: 220, isVeg: true, tag: "Spicy", tagColor: "primary" },
      { id: "vcs-5",  name: "Veg. Lillypop Gravy/Dry Ghobi",    price: 220, isVeg: true },
      { id: "vcs-6",  name: "Veg. Crispy",                      price: 240, isVeg: true },
      { id: "vcs-7",  name: "Veg. Chinese Bhel",                price: 220, isVeg: true, tag: "Popular", tagColor: "accent" },
      { id: "vcs-8",  name: "American Choupsey",                price: 230, isVeg: true },
      { id: "vcs-9",  name: "Chinese Choupsey",                 price: 220, isVeg: true },
      { id: "vcs-10", name: "Potato Chilly Dry",                price: 200, isVeg: true },
      { id: "vcs-11", name: "Mushroom Manchurian Gravy/Dry",    price: 250, isVeg: true },
      { id: "vcs-12", name: "Mushroom Chilly Gravy/Dry",        price: 240, isVeg: true },
      { id: "vcs-13", name: "Mushroom Steir Black Pepper",      price: 270, isVeg: true },
      { id: "vcs-14", name: "Mushroom Cheese Shezwan",          price: 340, isVeg: true },
      { id: "vcs-15", name: "Mushroom Tiryaki",                 price: 270, isVeg: true },
      { id: "vcs-16", name: "Baby Corn Chilly Gravy/Dry",       price: 230, isVeg: true },
      { id: "vcs-17", name: "Baby Corn Manchurian Gravy/Dry",   price: 230, isVeg: true },
      { id: "vcs-18", name: "Baby Corn Schezwan Gravy/Dry",     price: 220, isVeg: true },
      { id: "vcs-19", name: "Paneer Manchurian Gravy/Dry",      price: 250, isVeg: true },
      { id: "vcs-20", name: "Paneer Chilly Gravy/Dry",          price: 240, isVeg: true },
      { id: "vcs-21", name: "Paneer Crispy",                    price: 280, isVeg: true },
      { id: "vcs-22", name: "Paneer 65 Gravy/Dry",              price: 280, isVeg: true, tag: "Popular", tagColor: "accent" },
    ],
  },
  {
    id: "tandoor-starters",
    label: "Tandoor Starters",
    emoji: "🔥",
    accentColor: "primary",
    items: [
      { id: "ts-1", name: "Hara Bara Kabab",            price: 220, isVeg: true },
      { id: "ts-2", name: "Paneer Cheese Chilli Kabab", price: 310, isVeg: true, tag: "Must Try", tagColor: "secondary" },
      { id: "ts-3", name: "Paneer Kasturi Tikka",       price: 260, isVeg: true, tag: "Popular", tagColor: "accent" },
      { id: "ts-4", name: "Mushroom Tikka",             price: 230, isVeg: true },
    ],
  },
  {
    id: "veg-rice",
    label: "Veg. Rice",
    emoji: "🍚",
    accentColor: "dark",
    items: [
      { id: "vr-1",  name: "Steam Rice",                               price: 100, isVeg: true },
      { id: "vr-2",  name: "Veg Burnt Garlic Rice",                    price: 200, isVeg: true },
      { id: "vr-3",  name: "Veg Fried Rice",                           price: 180, isVeg: true, tag: "Popular", tagColor: "accent" },
      { id: "vr-4",  name: "Veg Jeera Fried Rice",                     price: 180, isVeg: true },
      { id: "vr-5",  name: "Veg Combination Rice",                     price: 200, isVeg: true },
      { id: "vr-6",  name: "Veg Schezwan Combination Rice",            price: 210, isVeg: true },
      { id: "vr-7",  name: "Veg Schezwan Fried Rice",                  price: 210, isVeg: true, tag: "Spicy", tagColor: "primary" },
      { id: "vr-8",  name: "Veg Pakoda Rice",                          price: 230, isVeg: true },
      { id: "vr-9",  name: "Veg Hong Kong Rice",                       price: 210, isVeg: true },
      { id: "vr-10", name: "Veg Thai Fried Rice",                      price: 220, isVeg: true },
      { id: "vr-11", name: "Veg Thai Chilly Basil Fried Rice",         price: 250, isVeg: true },
      { id: "vr-12", name: "Veg Mix Fried Rice",                       price: 290, isVeg: true },
      { id: "vr-13", name: "Veg Paneer Fried Rice",                    price: 250, isVeg: true },
      { id: "vr-14", name: "Veg Paneer Schezwan Rice",                 price: 260, isVeg: true },
      { id: "vr-15", name: "Veg Paneer Pepper Rice",                   price: 270, isVeg: true },
      { id: "vr-16", name: "Veg Chooper Rice",                         price: 270, isVeg: true },
      { id: "vr-17", name: "Veg Paneer Chopper Rice",                  price: 320, isVeg: true },
      { id: "vr-18", name: "Veg Paneer Triple Sez. Rice with Gravy",   price: 320, isVeg: true },
      { id: "vr-19", name: "Veg Paneer Sez. Rice with Gravy",          price: 310, isVeg: true },
      { id: "vr-20", name: "Veg Triple Sche. Rice with Gravy",         price: 250, isVeg: true },
      { id: "vr-21", name: "Veg Manchurian Rice with Gravy",           price: 260, isVeg: true },
      { id: "vr-22", name: "Veg Chilly Fried Rice with Gravy",         price: 250, isVeg: true },
      { id: "vr-23", name: "Veg Paneer Papper Rice with Gravy",        price: 330, isVeg: true },
      { id: "vr-24", name: "Veg Machao Special Rice with Gravy",       price: 420, isVeg: true, tag: "Must Try", tagColor: "secondary" },
    ],
  },
  {
    id: "veg-noodles",
    label: "Veg. Noodles",
    emoji: "🍝",
    accentColor: "secondary",
    items: [
      { id: "vn-1",  name: "Veg Burnt Garlic Noodles",                  price: 200, isVeg: true },
      { id: "vn-2",  name: "Veg Hakka Noodles",                         price: 180, isVeg: true, tag: "Popular", tagColor: "accent" },
      { id: "vn-3",  name: "Veg Combination Noodles",                   price: 200, isVeg: true },
      { id: "vn-4",  name: "Veg Schezwan Combination Noodles",          price: 220, isVeg: true },
      { id: "vn-5",  name: "Veg Schezwan Hakka Noodles",                price: 190, isVeg: true, tag: "Spicy", tagColor: "primary" },
      { id: "vn-6",  name: "Veg Hong Kong Noodles",                     price: 220, isVeg: true },
      { id: "vn-7",  name: "Veg Thai Hakka Noodles",                    price: 220, isVeg: true },
      { id: "vn-8",  name: "Veg Thai Chilly Basil Noodles",             price: 250, isVeg: true },
      { id: "vn-9",  name: "Veg Mix Fried Noodles",                     price: 290, isVeg: true },
      { id: "vn-10", name: "Veg Pakoda Noodles",                        price: 230, isVeg: true },
      { id: "vn-11", name: "Veg Paneer Fried Noodles",                  price: 250, isVeg: true },
      { id: "vn-12", name: "Veg Paneer Schezwan Noodles",               price: 260, isVeg: true },
      { id: "vn-13", name: "Veg Paneer Pepper Noodles",                 price: 290, isVeg: true },
      { id: "vn-14", name: "Veg Chooper Noodles",                       price: 270, isVeg: true },
      { id: "vn-15", name: "Veg Paneer Chopper Noodles",                price: 330, isVeg: true },
      { id: "vn-16", name: "Veg Paneer Triple Sez. Noodles with Gravy", price: 310, isVeg: true },
      { id: "vn-17", name: "Veg Paneer Sez. Noodles with Gravy",        price: 310, isVeg: true },
      { id: "vn-18", name: "Veg Triple Sez. Noodles with Gravy",        price: 250, isVeg: true },
      { id: "vn-19", name: "Veg Manchurian Noodles with Gravy",         price: 260, isVeg: true },
      { id: "vn-20", name: "Veg Chilly Fried Noodles with Gravy",       price: 250, isVeg: true },
      { id: "vn-21", name: "Veg Paneer Papper Noodles with Gravy",      price: 330, isVeg: true },
      { id: "vn-22", name: "Veg Machao Special Noodles with Gravy",     price: 420, isVeg: true, tag: "Must Try", tagColor: "secondary" },
    ],
  },
  {
    id: "kg-biryani",
    label: "K.G. Biryani",
    emoji: "🫕",
    accentColor: "accent",
    items: [
      { id: "kgb-1", name: "1 Kg Veg Dum Biryani",      price: 800,  isVeg: true },
      { id: "kgb-2", name: "1 Kg Veg Tawa Pulav",        price: 750,  isVeg: true },
      { id: "kgb-3", name: "1 Kg Paneer Dum Biryani",    price: 900,  isVeg: true, tag: "Popular", tagColor: "accent" },
      { id: "kgb-4", name: "1 Kg Paneer Tawa Pulav",     price: 850,  isVeg: true },
      { id: "kgb-5", name: "1 Kg Paneer Tikka Biryani",  price: 1000, isVeg: true, tag: "Must Try", tagColor: "secondary" },
    ],
  },
]

// ---------------------------------------------------------------------------

async function seedVeg() {
  await mongoose.connect(MONGO_URL, { bufferCommands: false, family: 4 })
  console.log("Connected to MongoDB")

  let catUpserted = 0
  let itemUpserted = 0

  for (const cat of vegCategories) {
    await Category.updateOne(
      { id: cat.id },
      { $set: { id: cat.id, label: cat.label, emoji: cat.emoji, accentColor: cat.accentColor } },
      { upsert: true }
    )
    catUpserted++

    for (const item of cat.items) {
      await MenuItem.updateOne(
        { id: item.id },
        { $set: { ...item, categoryId: cat.id } },
        { upsert: true }
      )
      itemUpserted++
    }
  }

  const catCount = await Category.countDocuments()
  const itemCount = await MenuItem.countDocuments()
  console.log(`Upserted: ${catUpserted} categories, ${itemUpserted} items`)
  console.log(`Total in DB: ${catCount} categories, ${itemCount} items`)

  await mongoose.disconnect()
}

seedVeg().catch((err) => { console.error(err); process.exit(1) })
