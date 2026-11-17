import type { Metadata } from "next";

import { InfoPage } from "@/components/InfoPage/InfoPage";

import styles from "./WorkPage.module.css";

// Copy source: Notion Career Projects, reviewed 2026-11-03.
const projects = [
  { year: 2026, company: "Birmarket", fields: ["E-commerce"], description: "Redesigned the logistics tribe’s design workflow: the team and a designer defined core layouts and rules, wrote Claude skills, then used AI for subsequent design work" },
  { year: 2026, company: "Birmarket", fields: ["E-commerce"], description: "2027 marketplace vision and design concept" },
  { year: 2026, company: "Birmarket", fields: ["E-commerce"], description: "User journey analysis to identify opportunities to improve marketplace unit economics, followed by product page, cart and checkout redesign" },
  { year: 2026, company: "Birmarket", fields: ["E-commerce"], description: "Marketplace design audit" },
  { year: 2025, company: "PashaPay", fields: ["Discovery"], description: "Concept research to shape the future direction of the mobile app" },
  { year: 2025, company: "PashaPay", fields: ["Art direction"], description: "Illustration guidelines for product and marketing communications" },
  { year: 2024, company: "PashaPay", fields: ["Fintech"], description: "Product design and branding for a VAT refund system in a digital wallet" },
  { year: 2024, company: "PashaPay", fields: ["Art direction"], description: "Art direction for icon sets across the mobile app and payment terminal network" },
  { year: 2024, company: "PashaPay", fields: ["EdTech"], description: "User story mapping workshop for designers and product managers across the group" },
  { year: 2024, company: "PashaPay", fields: ["Fintech"], description: "Redesign of the Million payment terminal interface" },
  { year: 2024, company: "PashaPay", fields: ["Fintech"], description: "Brand refresh for m10, b10, Million, and PashaPay to create a unified brand family" },
  { year: 2023, company: "PashaPay", fields: ["Fintech"], description: "Digital wallet mobile app concept and design system" },
  { year: 2022, company: "PashaPay", fields: ["Fintech"], description: "Concept for reusable templates in bill payments and bank card transfers" },
  { year: 2022, company: "Yandex", fields: ["E-commerce"], description: "Promotion of Yandex Market’s “По клику” delivery option" },
  { year: 2022, company: "Yandex", fields: ["E-commerce"], description: "Delivery pricing and options redesign for Yandex Market" },
  { year: 2022, company: "Yandex", fields: ["E-commerce"], description: "Cart recommendations for Yandex Market" },
  { year: 2022, company: "Yandex", fields: ["E-commerce"], description: "Post-purchase order editing flow for Yandex Market" },
  { year: 2022, company: "Yandex", fields: ["E-commerce"], description: "End-to-end Yandex Market purchase flow redesign, from cart and checkout through payment, confirmation, tracking, and order history" },
  { year: 2021, company: "Ситимобил", fields: ["Tools","Geospatial"], description: "Regional driver incentive management system for Citymobil managers" },
  { year: 2021, company: "Yandex", fields: ["Tools"], description: "Scrum board for Yandex Tracker" },
  { year: 2021, company: "Yandex", fields: ["Tools"], description: "Yandex Forms redesign" },
  { year: 2021, company: "Yandex", fields: ["Tools"], description: "Yandex Business Trips, an internal travel management tool for employees" },
  { year: 2020, company: "Yandex", fields: ["Growth"], description: "Account information and security update tools for Yandex ID" },
  { year: 2020, company: "Yandex", fields: ["Growth"], description: "Redesigned sign-in page for Yandex ID" },
  { year: 2020, company: "Yandex", fields: ["HR tech","Tools"], description: "Launch of Yandex Talents: a screening chatbot and job board for blue-collar job seekers" },
  { year: 2020, company: "Yandex", fields: ["Entertainment"], description: "Launch of Yandex Aura, a social network" },
  { year: 2020, company: "Kouch TV", fields: ["Tools"], description: "Plugin builder for advertising integrations on Twitch streams" },
  { year: 2020, company: "Kouch TV", fields: ["Entertainment"], description: "Twitch plugin for official Dota 2 tournaments" },
  { year: 2019, company: "Kouch TV", fields: ["Entertainment"], description: "Twitch plugins for official Formula 1 broadcasts, designed to engage new audiences" },
  { year: 2019, company: "T-bank", fields: ["Design systems"], description: "Migration of a design system from Sketch to Figma" },
  { year: 2019, company: "T-bank", fields: ["Entertainment","Fintech"], description: "Gaming-focused bank card and portal for integrations with gaming platforms" },
  { year: 2018, company: "Dolfin", fields: ["Design systems"], description: "Unified design system for a family of banking products" },
  { year: 2018, company: "Dolfin", fields: ["Fintech"], description: "CRM for UK financial advisers, covering client onboarding, investment accounts, transactions, and annual reporting" },
  { year: 2018, company: "Dolfin", fields: ["Fintech"], description: "Internal banking and trading systems, including FX limit management, order management (OMS), and execution management (EMS)" },
  { year: 2017, company: "Bright View", fields: ["IT"], description: "Configurable dashboards for exploring cluster performance and monitoring key metrics" },
  { year: 2017, company: "Bright View", fields: ["IT"], description: "Web interface for deploying and managing HPC clusters, redesigned from a complex desktop product and tested with users" },
  { year: 2016, company: "Dolfin", fields: ["Fintech"], description: "White-label wealth management platform for the UK market, combining portfolio management, CRM, compliance, e-signatures, and financial reporting under MiFID II" },
  { year: 2015, company: "Lingualeo", fields: ["Growth"], description: "Lingualeo portal redesign" },
  { year: 2014, company: "Lingualeo", fields: ["EdTech"], description: "New learner dashboard and daily task system" },
  { year: 2014, company: "Lingualeo", fields: ["EdTech"], description: "Interactive vocabulary exercises for web and mobile" },
  { year: 2014, company: "Yandex", fields: ["Geospatial","Entertainment"], description: "Yandex Maps panoramas" },
  { year: 2013, company: "Yandex", fields: ["Tools"], description: "Crowdsourced map editor" },
  { year: 2013, company: "Yandex", fields: ["Tools"], description: "Internal tools for Yandex Maps cartographers" },
  { year: 2013, company: "Novotelecom", fields: ["Entertainment"], description: "Smart TV set-top box for watching films and TV shows" },
  { year: 2012, company: "Novotelecom", fields: ["Entertainment","Tools"], description: "Desktop peer-to-peer client" },
  { year: 2012, company: "Novotelecom", fields: ["Entertainment"], description: "Platform for watching archived TV programmes" },
  { year: 2011, company: "Novotelecom", fields: ["Entertainment"], description: "City entertainment portal centred on discussion forums and video" },
] as const;

const years = [...new Set(projects.map((project) => project.year))];

export const metadata: Metadata = {
  title: "Projects over time — Alexander Lozhkin",
  description: "A timeline of Alexander Lozhkin’s product design projects across marketplaces, fintech, tools, education, and media.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <InfoPage title="Projects over time" activePage="Work">
    <p>Product design work from 2011 to 2026, grouped by year with the most recent projects first.</p>
    <div className={styles.timeline}>
      {years.map((year) => (
        <section key={year} aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`}>{year}</h2>
          <ul className={styles.entries}>
            {projects.filter((project) => project.year === year).map((project, index) => (
              <li className={styles.entry} key={`${year}-${index}`}>
                <div className={styles.meta}><strong>{project.company}</strong><span aria-hidden="true"> · </span>{project.fields.join(" · ")}</div>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </InfoPage>;
}
