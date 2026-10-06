import Image from "next/image";

import styles from "./PageCloseLink.module.css";

type PageCloseLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function PageCloseLink({ href, label, className }: PageCloseLinkProps) {
  return (
    <a href={href} aria-label={label} className={[styles.control, className].filter(Boolean).join(" ")}>
      <Image alt="" className={styles.icon} src="/projects/shared/close.svg" width={32} height={32} />
    </a>
  );
}
