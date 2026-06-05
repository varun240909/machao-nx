"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", { email, password, redirect: false })

    if (result?.ok) {
      router.push("/admin/dashboard")
    } else {
      setError("Invalid email or password.")
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: "var(--border)",
    background: "white",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: 500,
    outline: "none",
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        margin: "0 16px",
        background: "white",
        border: "var(--border)",
        boxShadow: "var(--shadow)",
        padding: "40px",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <img src="https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1780657521/ChatGPT_Image_Jun_5__2026__04_29_05_PM-removebg-preview-Photoroom_sqsmdy.png" alt="Machao NX" style={{ height: "48px", width: "auto", marginBottom: "16px" }} />
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "28px",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          Admin Login
        </h1>
        <p style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>Restricted access — authorised personnel only.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {error && (
          <div style={{ padding: "10px 12px", background: "#fee2e2", border: "2px solid #ef4444", color: "#ef4444", fontWeight: 600, fontSize: "13px" }}>
            {error}
          </div>
        )}

        <div>
          <label style={{ display: "block", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
            Email
          </label>
          <input
            type="email"
            required
            style={inputStyle}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
            Password
          </label>
          <input
            type="password"
            required
            style={inputStyle}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "8px",
            padding: "14px",
            background: "var(--primary)",
            color: "white",
            border: "2px solid var(--dark)",
            boxShadow: "4px 4px 0 var(--dark)",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "14px",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "0.15s",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  )
}
