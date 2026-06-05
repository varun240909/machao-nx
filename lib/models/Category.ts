import mongoose, { Schema, model, models } from "mongoose"

export interface ICategory {
  id: string
  label: string
  emoji: string
  accentColor: "primary" | "secondary" | "accent" | "dark"
}

const CategorySchema = new Schema<ICategory>(
  {
    id: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    emoji: { type: String, required: true },
    accentColor: { type: String, enum: ["primary", "secondary", "accent", "dark"], required: true },
  },
  { timestamps: true }
)

export const CategoryModel = models.Category || model<ICategory>("Category", CategorySchema)
