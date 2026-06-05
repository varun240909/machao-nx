import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://machao-nx.vercel.app"),

  title: {
    default: "Machao NX | Best Chinese Food in Dahisar, Mumbai",
    template: "%s | Machao NX",
  },

  description:
    "Machao Chinese Corner — Best noodles, biryani, chicken starters & more in Dahisar East, Mumbai. Fresh every day. Order on WhatsApp or visit us at Shop No 07, N L Plaza, W E Highway.",

  keywords: [
    "machao nx",
    "machao chinese corner",
    "chinese food dahisar",
    "chinese food mumbai",
    "hakka noodles dahisar",
    "chicken biryani mumbai",
    "chinese restaurant dahisar east",
    "order chinese food online mumbai",
    "best noodles mumbai",
    "chicken lollipop mumbai",
    "indo chinese food",
    "dahisar east restaurant",
    "food near me dahisar",
  ],

  authors: [{ name: "VarunSingh19", url: "https://github.com/VarunSingh19" }],

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://machao-nx.vercel.app",
    siteName: "Machao NX",
    title: "Machao NX | Best Chinese Food in Dahisar, Mumbai",
    description:
      "Noodles, biryani, chicken starters & more. Indian flavors crafted to perfection. Fresh every day — order on WhatsApp.",
    images: [
      {
        url: "https://res.cloudinary.com/dozdgvgbt/image/upload/v1780659351/ChatGPT_Image_Jun_5_2026_04_59_24_PM_dvyx1a.png",
        width: 1200,
        height: 630,
        alt: "Machao NX — Indian Flavors, Crafted to Perfection",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Machao NX | Best Chinese Food in Dahisar, Mumbai",
    description:
      "Noodles, biryani, chicken starters & more. Fresh every day — order on WhatsApp.",
    images: ["https://res.cloudinary.com/dozdgvgbt/image/upload/v1780659351/ChatGPT_Image_Jun_5_2026_04_59_24_PM_dvyx1a.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [{ url: "https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1780657521/ChatGPT_Image_Jun_5__2026__04_29_05_PM-removebg-preview-Photoroom_sqsmdy.png" }],
    apple: [{ url: "https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1780657521/ChatGPT_Image_Jun_5__2026__04_29_05_PM-removebg-preview-Photoroom_sqsmdy.png" }],
  },

  category: "restaurant",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Playfair+Display:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
