import type { Metadata } from "next";

import { InfoPage } from "@/components/InfoPage/InfoPage";

export const metadata: Metadata = {
  title: "About — Alexander Lozhkin",
  description: "Alexander Lozhkin is a Product Design Lead with 15+ years of experience in fintech, e-commerce, and data-heavy products.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <InfoPage title="About">
    <p>I’m Alexander Lozhkin, a Product Design Lead based in Batumi, Georgia, and open to relocation.</p>
    <p>I have 15+ years of experience across fintech, e-commerce, and data-heavy products. I work across strategy and hands-on product design, and I’ve built and led multidisciplinary design teams of up to 16 people.</p>
    <section>
      <h2>Explore</h2>
      <p><a href="/work">Selected work</a> · <a href="/contact">Contact</a></p>
    </section>
  </InfoPage>;
}
