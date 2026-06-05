"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { LayoutDashboard, Package, LogOut, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const expanded = isMobile ? mobileOpen : hovered

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(v => !v)}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 300,
            width: "44px",
            height: "44px",
            background: "var(--primary)",
            border: "2px solid var(--dark)",
            boxShadow: "3px 3px 0 var(--dark)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
          }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}

      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 149,
          }}
        />
      )}

      <aside
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        style={{
          width: expanded ? "220px" : "56px",
          flexShrink: 0,
          background: "var(--bg)",
          borderRight: "var(--border)",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 56px)",
          position: isMobile ? "fixed" : "sticky",
          top: "56px",
          left: 0,
          bottom: 0,
          alignSelf: "flex-start",
          overflow: "hidden",
          transition: "width 0.2s ease",
          zIndex: isMobile ? 150 : 100,
        }}
      >
        <nav style={{ padding: "12px 8px", flex: 1 }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/")
              return (
                <li key={href}>
                  <Link
                    href={href}
                    title={!expanded ? label : undefined}
                    onClick={() => isMobile && setMobileOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: expanded ? "flex-start" : "center",
                      gap: "10px",
                      padding: "10px 12px",
                      fontWeight: 700,
                      fontSize: "13px",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      color: active ? "white" : "var(--dark)",
                      background: active ? "var(--primary)" : "transparent",
                      border: active ? "2px solid var(--dark)" : "2px solid transparent",
                      boxShadow: active ? "4px 4px 0 var(--dark)" : "none",
                      transition: "background 0.15s, box-shadow 0.15s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Icon size={16} style={{ flexShrink: 0 }} />
                    <span
                      style={{
                        opacity: expanded ? 1 : 0,
                        maxWidth: expanded ? "160px" : "0px",
                        overflow: "hidden",
                        transition: "opacity 0.15s ease, max-width 0.2s ease",
                        pointerEvents: "none",
                      }}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div style={{ padding: "12px 8px", borderTop: "var(--border)" }}>
          {expanded && (
            <p
              style={{
                fontSize: "11px",
                color: "#888",
                fontWeight: 600,
                marginBottom: "8px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {session?.user?.email}
            </p>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            title="Logout"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: expanded ? "flex-start" : "center",
              gap: "8px",
              padding: "8px 12px",
              background: "var(--dark)",
              color: "white",
              border: "2px solid var(--dark)",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "uppercase",
              cursor: "pointer",
              width: "100%",
              transition: "0.15s",
              whiteSpace: "nowrap",
            }}
          >
            <LogOut size={14} style={{ flexShrink: 0 }} />
            <span
              style={{
                opacity: expanded ? 1 : 0,
                maxWidth: expanded ? "120px" : "0px",
                overflow: "hidden",
                transition: "opacity 0.15s ease, max-width 0.2s ease",
                pointerEvents: "none",
              }}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

    </>
  )
}
