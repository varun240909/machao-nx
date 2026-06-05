"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { ICategory } from "@/lib/models/Category"

const TAGS = ["Best Seller", "Spicy", "Popular", "New", "Must Try", "Veg", "Non-Veg", ""]
const TAG_COLORS = ["primary", "secondary", "accent", "dark", ""]

interface ProductFormProps {
  categories: ICategory[]
  defaultValues?: Record<string, any>
  isEdit?: boolean
  itemId?: string
}

export default function ProductForm({ categories, defaultValues, isEdit, itemId }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl ?? "")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: defaultValues?.name ?? "",
    categoryId: defaultValues?.categoryId ?? "",
    price: defaultValues?.price ?? "",
    description: defaultValues?.description ?? "",
    tag: defaultValues?.tag ?? "",
    tagColor: defaultValues?.tagColor ?? "",
    isVeg: defaultValues?.isVeg ?? false,
    isFeatured: defaultValues?.isFeatured ?? false,
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: fd })
    const data = await res.json()
    if (data.url) setImageUrl(data.url)
    else setError("Image upload failed")
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Generate id slug if new
    const id = isEdit ? itemId : `${form.categoryId}-${Date.now()}`

    const payload = {
      ...form,
      id,
      price: Number(form.price),
      tag: form.tag || undefined,
      tagColor: form.tagColor || undefined,
      imageUrl: imageUrl || undefined,
    }

    const url = isEdit ? `/api/products/${itemId}` : "/api/products"
    const method = isEdit ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push("/admin/products")
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? "Something went wrong")
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "var(--border)",
    background: "white",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 500,
    outline: "none",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 700,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "6px",
    color: "var(--dark)",
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px" }}>
      {error && (
        <div style={{ padding: "12px", background: "#fee2e2", border: "2px solid #ef4444", color: "#ef4444", fontWeight: 600, fontSize: "13px" }}>
          {error}
        </div>
      )}

      <div>
        <label style={labelStyle}>Name *</label>
        <input style={inputStyle} required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Hakka Noodles" />
      </div>

      <div>
        <label style={labelStyle}>Category *</label>
        <select style={inputStyle} required value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
          <option value="">Select category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Price (₹) *</label>
        <input style={inputStyle} type="number" required min={0} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. 140" />
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description..." />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Tag</label>
          <select style={inputStyle} value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}>
            {TAGS.map(t => <option key={t} value={t}>{t || "— None —"}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Tag Color</label>
          <select style={inputStyle} value={form.tagColor} onChange={e => setForm(f => ({ ...f, tagColor: e.target.value }))}>
            {TAG_COLORS.map(t => <option key={t} value={t}>{t || "— None —"}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <input type="checkbox" checked={form.isVeg} onChange={e => setForm(f => ({ ...f, isVeg: e.target.checked }))} style={{ width: "18px", height: "18px" }} />
          <span style={{ fontWeight: 700, fontSize: "13px", textTransform: "uppercase" }}>Vegetarian</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} style={{ width: "18px", height: "18px" }} />
          <span style={{ fontWeight: 700, fontSize: "13px", textTransform: "uppercase" }}>Featured</span>
        </label>
      </div>

      <div>
        <label style={labelStyle}>Product Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: "13px" }} />
        {uploading && <p style={{ fontSize: "12px", color: "#888", marginTop: "6px" }}>Uploading...</p>}
        {imageUrl && (
          <img src={imageUrl} alt="preview" style={{ marginTop: "10px", height: "80px", width: "auto", objectFit: "cover", border: "var(--border)" }} />
        )}
      </div>

      <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
        <button
          type="button"
          onClick={() => router.back()}
          style={{ padding: "12px 24px", background: "white", border: "var(--border)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", cursor: "pointer" }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "12px 32px", background: "var(--primary)", color: "white", border: "2px solid var(--dark)", boxShadow: "4px 4px 0 var(--dark)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", cursor: "pointer" }}
        >
          {loading ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  )
}
