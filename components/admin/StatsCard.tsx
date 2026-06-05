interface StatsCardProps {
  value: number
  label: string
  accentColor?: "primary" | "secondary" | "accent" | "dark"
}

export default function StatsCard({ value, label, accentColor = "primary" }: StatsCardProps) {
  const bg: Record<string, string> = {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    accent: "var(--accent)",
    dark: "var(--dark)",
  }
  const fg: Record<string, string> = {
    primary: "white",
    secondary: "white",
    accent: "var(--dark)",
    dark: "white",
  }

  return (
    <div
      style={{
        border: "var(--border)",
        boxShadow: "var(--shadow)",
        background: "white",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          padding: "4px 12px",
          background: bg[accentColor],
          color: fg[accentColor],
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "36px",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <p style={{ fontWeight: 700, fontSize: "12px", textTransform: "uppercase", color: "#888", letterSpacing: "0.5px" }}>
        {label}
      </p>
    </div>
  )
}
