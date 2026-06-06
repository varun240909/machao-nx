import type { MenuItem } from "@/data/menu"

const WA_NUMBER = "918879701012"

interface MenuCardProps {
  item: MenuItem
  categoryEmoji: string
  accentColor: "primary" | "secondary" | "accent" | "dark"
}

export default function MenuCard({ item, categoryEmoji, accentColor }: MenuCardProps) {
  const waText = encodeURIComponent(`I want to order ${item.name}`)
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waText}`

  return (
    <div className="menu-card">
      {item.tag && (
        <span className={`menu-tag band-${item.tagColor ?? "primary"}`}>{item.tag}</span>
      )}
      <div className={`menu-card-band band-${accentColor}${item.imageUrl ? " has-photo" : ""}`}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="menu-card-photo"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1780657521/ChatGPT_Image_Jun_5__2026__04_29_05_PM-removebg-preview-Photoroom_sqsmdy.png"
            alt="Machao NX"
            className="menu-card-logo"
          />
        )}
      </div>
      <div className="menu-card-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "6px",
            marginBottom: "6px",
          }}
        >
          <h3 style={{ fontSize: "13px", fontWeight: 700, lineHeight: 1.3 }}>{item.name}</h3>
          <span className="price" style={{ flexShrink: 0 }}>₹{item.price}</span>
        </div>
        {item.description && (
          <p style={{ fontSize: "13px", color: "#666" }}>{item.description}</p>
        )}
        {item.isVeg !== undefined && (
          <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: item.isVeg ? "#22c55e" : "#ef4444",
                border: "1.5px solid currentColor",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#888", textTransform: "uppercase" }}>
              {item.isVeg ? "Veg" : "Non-Veg"}
            </span>
          </div>
        )}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginTop: "14px",
            width: "100%",
            background: "#25d366",
            color: "white",
            borderColor: "var(--dark)",
            textDecoration: "none",
            fontSize: "12px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="wa-btn-text">ORDER ON WHATSAPP</span>
        </a>
      </div>
    </div>
  )
}
