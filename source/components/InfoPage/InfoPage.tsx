/* eslint-disable @next/next/no-html-link-for-pages -- Static hosting requires native document navigation. */

import type { ReactNode } from "react";

import styles from "./InfoPage.module.css";

const pages = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Speaking", href: "/speaking" },
  { label: "Contact", href: "/contact" },
] as const;

export function InfoPage({
  title,
  activePage = title,
  children,
}: {
  title: string;
  activePage?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <a className={styles.homeLink} href="/">← Home</a>
        <p className={styles.eyebrow}>Alexander Lozhkin / Portfolio</p>
        <h1>{title}</h1>
        <nav className={styles.pageLinks} aria-label="Portfolio pages">
          {pages.map((page) => <a href={page.href} aria-current={page.label === activePage ? "page" : undefined}
            key={page.href}>{page.label}</a>)}
        </nav>
        <div className={styles.body}>{children}</div>
      </main>
      <footer className={styles.footer}>© Alexander Lozhkin 2026</footer>
    </div>
  );
}
