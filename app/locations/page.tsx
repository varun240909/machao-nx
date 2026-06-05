import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Locations — Machao NX",
  description: "Find Machao Chinese Corner near you.",
}

export default function LocationsPage() {
  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <Link href="/">
          <img src="https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1780657521/ChatGPT_Image_Jun_5__2026__04_29_05_PM-removebg-preview-Photoroom_sqsmdy.png" alt="Machao NX" className="logo" />
        </Link>
        <nav>
          <Link href="/menu">Menu</Link>
          <Link href="/locations" style={{ color: "var(--primary)" }}>Locations</Link>
        </nav>
        <Link href="/" className="btn-cta">Back to Home</Link>
      </header>

      <div className="menu-page-header">
        <h1 className="section-title">FIND US</h1>
        <p className="menu-page-tagline">Come eat. You know where we are.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", borderBottom: "var(--border)" }}>

        {/* Map */}
        <div style={{ borderBottom: "var(--border)", lineHeight: 0 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7533.655596097405!2d72.86279889362794!3d19.246335239871986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b12a3596724b%3A0x37a56dec9519a64!2sMACHAO%20CHINESE%20CORNER!5e0!3m2!1sen!2sin!4v1780569604824!5m2!1sen!2sin"
            width="100%"
            height="480"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            borderTop: "none",
          }}
        >
          {/* Address block */}
          <div
            style={{
              padding: "40px 20px",
              borderBottom: "var(--border)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "var(--primary)",
                color: "white",
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: "4px 10px",
                border: "var(--border)",
                marginBottom: "16px",
              }}
            >
              📍 Our Spot
            </div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "28px",
                textTransform: "uppercase",
                lineHeight: 1.1,
                marginBottom: "12px",
              }}
            >
              Machao Chinese Corner
            </h2>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.7 }}>
              Shop No 07, N L Plaza, W E Highway,<br />
              Off Shiv Vallabh Rd, Gawde Nagar,<br />
              Dahisar East, Mumbai, Maharashtra 400068
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=19.246335239871986,72.86279889362794"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
              style={{
                display: "inline-block",
                marginTop: "24px",
                background: "var(--accent)",
                color: "var(--dark)",
                textDecoration: "none",
              }}
            >
              Get Directions →
            </a>
          </div>

          {/* Hours + contact side by side on md+ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            {/* Hours */}
            <div style={{ padding: "40px 20px", borderBottom: "var(--border)" }}>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "18px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  color: "var(--secondary)",
                }}
              >
                Hours
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { day: "Tue – Thu", time: "12pm – 11pm" },
                  { day: "Fri – Sat", time: "12pm – 2am" },
                  { day: "Sunday", time: "11am – 9pm" },
                  { day: "Monday", time: "Closed" },
                ].map(({ day, time }) => (
                  <li
                    key={day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      fontWeight: 600,
                      paddingBottom: "8px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <span>{day}</span>
                    <span style={{ color: time === "Closed" ? "#ef4444" : "var(--dark)" }}>{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div style={{ padding: "40px 20px" }}>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "18px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  color: "var(--secondary)",
                }}
              >
                Contact
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href="https://wa.me/918879701012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#25d366",
                    color: "white",
                    textDecoration: "none",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
                <a
                  href="tel:+918879701012"
                  className="btn-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "white",
                    color: "var(--dark)",
                    textDecoration: "none",
                    justifyContent: "center",
                  }}
                >
                  📞 +91 88797 01012
                </a>
                <a
                  href="tel:+918879701014"
                  className="btn-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "white",
                    color: "var(--dark)",
                    textDecoration: "none",
                    justifyContent: "center",
                  }}
                >
                  📞 +91 88797 01014
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
