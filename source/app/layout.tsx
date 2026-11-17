import type { Metadata } from "next";
import "./globals.css";

const shareTitle = "Lozhkin Alexander — Product Design Lead";
const shareDescription = "Product Design Lead with 15+ years of experience across fintech, e-commerce, and data-heavy products";
const shareImage = "https://lozhkin.cc/share.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://lozhkin.cc"),
  title: shareTitle,
  description: shareDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Alexander Lozhkin",
    title: shareTitle,
    description: shareDescription,
    images: [{ url: shareImage, width: 1200, height: 630, type: "image/jpeg", alt: "Alexander Lozhkin — Product designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [{ url: shareImage, alt: "Alexander Lozhkin — Product designer" }],
  },
  icons: {
    icon: "/fav.svg",
    shortcut: "/fav.svg",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://lozhkin.cc/#alexander-lozhkin",
  name: "Alexander Lozhkin",
  url: "https://lozhkin.cc/",
  sameAs: ["https://www.linkedin.com/in/alexanderlozhkin/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {children}
      </body>
    </html>
  );
}
