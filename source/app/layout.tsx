import type { Metadata } from "next";
import "./globals.css";

const shareTitle = "Lozhkin Alexander — Product Design Lead";
const shareDescription = "Product Design Lead with 15+ years of experience across fintech, e-commerce, and data-heavy products";
const shareImage = "https://lozhkin.cc/share.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://lozhkin.cc"),
  title: shareTitle,
  description: shareDescription,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
