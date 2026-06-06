"use client"

import { useState } from "react"

interface CallModalProps {
  label: string
  className?: string
  style?: React.CSSProperties
}

export default function CallModal({ label, className, style }: CallModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className={className} style={style} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "16px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "var(--bg)",
              border: "var(--border)",
              boxShadow: "var(--shadow)",
              padding: "32px",
              width: "100%",
              maxWidth: "360px",
            }}
          >
            <h3
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "22px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Call to Order
            </h3>
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "24px" }}>
              Tap a number to call us directly.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href="tel:+918879701012"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 18px",
                  background: "white",
                  border: "var(--border)",
                  boxShadow: "4px 4px 0 var(--dark)",
                  textDecoration: "none",
                  color: "var(--dark)",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                <span style={{ fontSize: "20px" }}>📞</span>
                +91 88797 01012
              </a>

              <a
                href="tel:+918879701014"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 18px",
                  background: "white",
                  border: "var(--border)",
                  boxShadow: "4px 4px 0 var(--dark)",
                  textDecoration: "none",
                  color: "var(--dark)",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                <span style={{ fontSize: "20px" }}>📞</span>
                +91 88797 01014
              </a>
            </div>

            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "10px",
                background: "transparent",
                border: "2px solid var(--dark)",
                fontWeight: 700,
                fontSize: "12px",
                textTransform: "uppercase",
                cursor: "pointer",
                color: "var(--dark)",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
