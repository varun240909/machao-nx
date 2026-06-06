import mongoose from "mongoose"

const MONGO_URL = process.env.NEXT_MONGO_URL!

if (!MONGO_URL) throw new Error("NEXT_MONGO_URL is not set in .env.local")

let cached = (global as any)._mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }

if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, { bufferCommands: false, family: 4 })
  }
  cached.conn = await cached.promise
  return cached.conn
}
