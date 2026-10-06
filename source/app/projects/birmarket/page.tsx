import type { Metadata } from "next";

import { BirmarketCasePage } from "@/components/BirmarketCasePage/BirmarketCasePage";

export const metadata: Metadata = {
  title: "Birmarket marketplace — Alexander Lozhkin",
  description:
    "How Alexander Lozhkin led design and research at Birmarket, improved conversion, and helped shape its product direction.",
};

export default function BirmarketPage() {
  return (
    <main>
      <BirmarketCasePage />
    </main>
  );
}
