import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AdminSidebar from "@/components/admin/AdminSidebar"
import SessionProvider from "@/components/admin/SessionProvider"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  return (
    <SessionProvider session={session}>
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          maxWidth: "none",
          margin: 0,
        }}
      >
        {/* Topbar */}
        <div
          style={{
            height: "56px",
            background: "var(--dark)",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 200,
            borderBottom: "var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              textTransform: "uppercase",
              color: "white",
              letterSpacing: "1px",
            }}
          >
            Machao NX &mdash; Admin
          </span>
        </div>

        {/* Body */}
        <div style={{ display: "flex" }}>
          <AdminSidebar />
          <main style={{ flex: 1, padding: "32px", minWidth: 0 }}>
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}
