import Link from "next/link"
import { featuredItems as staticFeatured } from "@/data/menu"
import MenuCard from "@/components/menu/MenuCard"
import OrderNowButton from "@/components/OrderNowButton"

export const revalidate = 60

const BASE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000"

async function getFeaturedItems() {
  try {
    const [itemsRes, catsRes] = await Promise.all([
      fetch(`${BASE_URL}/api/products?featured=true`, { next: { revalidate: 60 } }),
      fetch(`${BASE_URL}/api/categories`, { next: { revalidate: 60 } }),
    ])

    if (!itemsRes.ok || !catsRes.ok) return staticFeatured

    const items = await itemsRes.json()
    const cats = await catsRes.json()

    if (!Array.isArray(items) || items.length === 0) return staticFeatured

    const catMap = new Map(cats.map((c: any) => [c.id, c]))

    return items.slice(0, 3).map((item: any) => {
      const cat = catMap.get(item.categoryId) as any
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        tag: item.tag,
        tagColor: item.tagColor,
        description: item.description,
        isFeatured: item.isFeatured,
        isVeg: item.isVeg,
        imageUrl: item.imageUrl,
        categoryEmoji: cat?.emoji ?? "🍜",
        accentColor: cat?.accentColor ?? "primary",
      }
    })
  } catch {
    return staticFeatured
  }
}

export default async function Home() {
  const featuredItems = await getFeaturedItems()
  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <img src="https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1780657521/ChatGPT_Image_Jun_5__2026__04_29_05_PM-removebg-preview-Photoroom_sqsmdy.png" alt="Machao NX" className="logo" />
        <nav>
          <Link href="/menu">Menu</Link>
          <Link href="/locations">Locations</Link>
        </nav>
        <a href="tel:+918879701012" className="btn-cta" style={{ textDecoration: "none" }}>
          <span className="book-table-label">Book a Table</span>
          <span className="book-table-icon">📞</span>
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              NO CAP,
              <br />
              JUST <span>FLAVOR</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed text-[#555]">
              Serving 70s aesthetics with a modern twist. Locally sourced, highkey delicious, and strictly for the
              vibers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <OrderNowButton />
              <Link href="/menu" className="btn-cta" style={{ background: "white" }}>
                View Menu
              </Link>
            </div>
          </div>
          <div className="hero-img">
            <img
              src="https://res.cloudinary.com/dozdgvgbt/image/upload/v1780659351/ChatGPT_Image_Jun_5_2026_04_59_24_PM_dvyx1a.png"
              alt="Machao food"
              className="hero-img-photo"
            />
            <div className="sticker">
              FRESH AF
              <br />
              EVERY DAY
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-content">
            &nbsp; ★ BIRYANI THAT SLAPS ★ HAKKA NOODLES ★ DESI VIBES ONLY ★ OPEN UNTIL 2AM ★ BEST IN THE CITY ★
            BIRYANI THAT SLAPS ★ HAKKA NOODLES ★ DESI VIBES ONLY ★ OPEN UNTIL 2AM ★ BEST IN THE CITY
          </div>
        </div>

        <section className="section-padding">
          <div className="section-header">
            <h2 className="section-title">CHEF'S FAVORITES</h2>
            <Link
              href="/menu"
              className="text-sm md:text-base"
              style={{ color: "var(--dark)", fontWeight: 800, textTransform: "uppercase" }}
            >
              See Full Menu →
            </Link>
          </div>

          <div className="menu-grid">
            {featuredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                categoryEmoji={item.categoryEmoji}
                accentColor={item.accentColor}
              />
            ))}
          </div>
        </section>

        <section className="retro-vibe">
          <div>
            <h2 className="vibe-title">THE VIBE CHECK IS PASSED.</h2>
            <p className="vibe-text">
              We don't just do food. We do moments. From the curated 90s hip-hop playlist to the 70s diner seats, every
              corner is designed for your next dump. No reservations needed for the main room, just bring the energy.
            </p>
            <button className="btn-cta" style={{ background: "var(--dark)", color: "white", borderColor: "white" }}>
              Our Story
            </button>
          </div>
          <div className="vibe-img"></div>
        </section>

        <section className="section-padding">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
            @MACHAO Cloud Vision
          </h2>
          <div className="social-grid">
            <div className="social-item">
              <img src="/images/Insta 1.png" alt="Insta 1" />
            </div>
            <div className="social-item">
              <img src="/images/Insta 2.png" alt="Insta 2" />
            </div>
            <div className="social-item">
              <img src="/images/Insta 3.png" alt="Insta 3" />
            </div>
            <div className="social-item">
              <img src="/images/Insta 4.png" alt="Insta 4" />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <img src="https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1780657521/ChatGPT_Image_Jun_5__2026__04_29_05_PM-removebg-preview-Photoroom_sqsmdy.png" alt="Machao NX" className="footer-logo" />
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            Bold flavors, raw energy, no filters. Since day one.
          </p>
        </div>
        <div className="footer-links">
          <h4>Nav</h4>
          <ul>
            <li>
              <Link href="/menu" style={{ color: "inherit", textDecoration: "none" }}>
                Menu
              </Link>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                About
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Privacy
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Terms
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Hours</h4>
          <ul>
            <li>Tue-Thu: 12pm - 11pm</li>
            <li>Fri-Sat: 12pm - 2am</li>
            <li>Sun: 11am - 9pm</li>
            <li>Mon: Closed (Mental Health Day)</li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MACHAO NX</span>
          <a href="https://primusoftware.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>POWERED BY PRIMUSOFTWARE.COM ↗</a>
        </div>
      </footer>
    </>
  )
}
