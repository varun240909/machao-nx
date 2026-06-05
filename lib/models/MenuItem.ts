import { Schema, model, models } from "mongoose"

export interface IMenuItem {
  id: string
  categoryId: string
  name: string
  price: number
  description?: string
  tag?: "Best Seller" | "Spicy" | "Popular" | "New" | "Must Try" | "Veg" | "Non-Veg"
  tagColor?: "primary" | "secondary" | "accent" | "dark"
  isFeatured: boolean
  isVeg?: boolean
  imageUrl?: string
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    id: { type: String, required: true, unique: true },
    categoryId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    tag: { type: String, enum: ["Best Seller", "Spicy", "Popular", "New", "Must Try", "Veg", "Non-Veg"] },
    tagColor: { type: String, enum: ["primary", "secondary", "accent", "dark"] },
    isFeatured: { type: Boolean, default: false },
    isVeg: { type: Boolean },
    imageUrl: { type: String },
  },
  { timestamps: true }
)

export const MenuItemModel = models.MenuItem || model<IMenuItem>("MenuItem", MenuItemSchema)
