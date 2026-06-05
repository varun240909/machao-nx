"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

interface DeleteProductDialogProps {
  id: string
  name: string
}

export default function DeleteProductDialog({ id, name }: DeleteProductDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title="Delete"
        style={{
          padding: "6px 8px",
          background: "#fee2e2",
          border: "2px solid var(--dark)",
          cursor: "pointer",
          color: "#ef4444",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Trash2 size={14} />
      </button>
    )
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "var(--bg)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          padding: "32px",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <h3
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "20px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Delete Product?
        </h3>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "24px" }}>
          This will permanently delete <strong>{name}</strong>. This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              flex: 1,
              padding: "10px",
              background: "white",
              border: "var(--border)",
              fontWeight: 700,
              fontSize: "13px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px",
              background: "#ef4444",
              color: "white",
              border: "2px solid var(--dark)",
              boxShadow: "4px 4px 0 var(--dark)",
              fontWeight: 700,
              fontSize: "13px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
