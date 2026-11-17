import type { Metadata } from "next";

import { InfoPage } from "@/components/InfoPage/InfoPage";

export const metadata: Metadata = {
  title: "Speaking — Alexander Lozhkin",
  description: "Talks and speaking topics from product designer Alexander Lozhkin.",
  alternates: { canonical: "/speaking" },
};

export default function SpeakingPage() {
  return <InfoPage title="Speaking">
    <p>I speak at conferences and meetups. Right now, I’m exploring how AI changes product work and how branding becomes part of the product experience.</p>
    <section>
      <h2>Watch a talk</h2>
      <p><a href="https://www.youtube.com/live/O_4V_bdwSB8?si=ZYEeleple7Oya2kz&amp;t=3285" target="_blank" rel="noreferrer">Brand in product ↗</a></p>
    </section>
    <section>
      <h2>Invite me to speak</h2>
      <p><a href="/contact">Get in touch</a></p>
    </section>
  </InfoPage>;
}
