import type { Metadata } from "next";
import { BirmarketGrowthArticle, birmarketGrowthTitle } from "@/components/BirmarketGrowthArticle/BirmarketGrowthArticle";

export const metadata: Metadata = {
  title: `${birmarketGrowthTitle} — Alexander Lozhkin`,
  description: "How design and research helped Birmarket identify purchase friction, test improvements, and prioritise changes to the marketplace.",
  alternates: { canonical: "/projects/birmarket/breaking-the-inertia" },
};

export default function BirmarketGrowthPage() {
  return <BirmarketGrowthArticle />;
}
