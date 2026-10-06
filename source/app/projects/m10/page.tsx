import type { Metadata } from "next";

import { M10CasePage } from "@/components/M10CasePage/M10CasePage";

export const metadata: Metadata = {
  title: "m10 digital wallet — Alexander Lozhkin",
  description:
    "How Alexander Lozhkin helped build and scale the m10 digital wallet in Azerbaijan through product design, brand, and team leadership.",
};

export default function M10Page() {
  return (
    <>
      <main>
        <M10CasePage />
      </main>
    </>
  );
}
