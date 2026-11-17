"use client";

import { useRef, useState } from "react";

import styles from "./SiteMenu.module.css";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Speaking", href: "/speaking" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  function showMenu() {
    dialogRef.current?.showModal();
    setOpen(true);
    closeRef.current?.focus();
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button ref={triggerRef} className={styles.trigger} type="button" aria-label="Open menu"
        aria-haspopup="dialog" aria-controls="site-menu" aria-expanded={open} onClick={showMenu}>
        <span aria-hidden="true" className={styles.bars}><span /><span /><span /></span>
      </button>

      <dialog ref={dialogRef} className={styles.dialog} id="site-menu" aria-label="Site navigation"
        onPointerDown={(event) => { if (event.target === event.currentTarget) closeMenu(); }}
        onClose={() => { setOpen(false); triggerRef.current?.focus(); }}>
        <div className={styles.panel}>
          <button ref={closeRef} type="button" className={styles.close} aria-label="Close menu" onClick={closeMenu}>
            <span aria-hidden="true">×</span>
          </button>
          <nav aria-label="Main menu" className={styles.navigation}>
            {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
          </nav>
        </div>
      </dialog>
    </>
  );
}
