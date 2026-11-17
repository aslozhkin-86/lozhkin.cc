import type { Metadata } from "next";

import { BirmarketCasePage } from "@/components/BirmarketCasePage/BirmarketCasePage";

export const metadata: Metadata = {
  title: "Birmarket, Head of Design — Alexander Lozhkin",
  description:
    "Alexander Lozhkin’s role leading product design and UX research at Birmarket, from team practices and customer journeys to Marketplace Vision 2027.",
  alternates: { canonical: "/projects/birmarket" },
};

export default function BirmarketPage() {
  return (
    <main>
      <BirmarketCasePage />
    </main>
  );
}
