import type { Metadata } from "next";
import { BirmarketGrowthArticle, birmarketGrowthTitle } from "@/components/BirmarketGrowthArticle/BirmarketGrowthArticle";

export const metadata: Metadata = {
  title: `${birmarketGrowthTitle} — Alexander Lozhkin`,
  description: "How a small team used discovery, design sprints, and research to get Birmarket moving and change how teams built the product.",
};

export default function BirmarketGrowthPage() {
  return <BirmarketGrowthArticle />;
}
