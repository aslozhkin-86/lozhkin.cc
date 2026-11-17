import type { Metadata } from "next";

import { InfoPage } from "@/components/InfoPage/InfoPage";

export const metadata: Metadata = {
  title: "Contact — Alexander Lozhkin",
  description: "Contact Alexander Lozhkin about product design leadership, projects, or speaking.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <InfoPage title="Contact">
    <p>Interested in working together or inviting me to speak? Get in touch.</p>
    <section>
      <h2>Reach me</h2>
      <ul>
        <li><a href="mailto:a.s.lozhkin@gmail.com">Email: a.s.lozhkin@gmail.com</a></li>
        <li><a href="https://t.me/Leshey" target="_blank" rel="noreferrer">Telegram</a></li>
        <li><a href="https://www.linkedin.com/in/alexanderlozhkin/" target="_blank" rel="noreferrer">LinkedIn</a></li>
      </ul>
    </section>
  </InfoPage>;
}
