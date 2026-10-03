import Image from "next/image";

import styles from "./PortfolioFooter.module.css";

const links = [
  { label: "Telegram", href: "https://t.me/Leshey" },
  { label: "Email", href: "mailto:a.s.lozhkin@gmail.com" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/alexanderlozhkin/" },
] as const;

export function PortfolioFooter() {
  return (
    <footer className={styles.footer} aria-labelledby="footer-title">
      <div className={styles.content}>
        <Image
          alt=""
          className={styles.divider}
          draggable={false}
          height={35.7906}
          src="/footer/divider.svg"
          width={280.6}
        />
        <h2 className={styles.heading} id="footer-title">Hey, let&apos;s chat!</h2>
        <nav className={styles.links} aria-label="Footer contact links">
          {links.map((link) => (
            <a
              className={styles.link}
              href={link.href}
              key={link.label}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              <span>{link.label}</span>
              <Image
                alt=""
                className={styles.arrow}
                draggable={false}
                height={28.0004}
                src="/footer/contact-arrow.svg"
                width={27.9998}
              />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
