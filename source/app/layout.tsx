import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lozhkin Alexander — Product Design Lead",
  description:
    "Product Design Lead with 13+ years of experience across fintech, e-commerce, and data-heavy products.",
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
