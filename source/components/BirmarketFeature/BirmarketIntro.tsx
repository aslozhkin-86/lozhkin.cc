"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import styles from "./BirmarketFeature.module.css";

export function BirmarketIntro() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<{ html: string; body: string } | null>(null);

  function restoreScroll() {
    if (!previousOverflow.current) return;
    document.documentElement.style.overflow = previousOverflow.current.html;
    document.body.style.overflow = previousOverflow.current.body;
    previousOverflow.current = null;
  }

  function openGallery() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    previousOverflow.current = {
      html: document.documentElement.style.overflow,
      body: document.body.style.overflow,
    };
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
  }

  function closeGallery() {
    dialogRef.current?.close();
  }

  useEffect(() => () => {
    restoreScroll();
  }, []);

  return (
    <>
      <p className={styles.description}>The <button ref={triggerRef} type="button" className={styles.oldLogoTrigger} aria-haspopup="dialog" aria-controls="birmarket-old-logo-gallery" onClick={openGallery}>old logo</button> got lost in ads. The bright pink felt too narrow for a broad marketplace and worked poorly in the app. Marketing wanted to keep Birmarket recognizable. We reworked the brand system, then brought the refresh into the app for the first time.</p>
      <dialog
        ref={dialogRef}
        className={styles.oldLogoDialog}
        id="birmarket-old-logo-gallery"
        aria-label="Birmarket old logo gallery"
        onClose={() => {
          restoreScroll();
          triggerRef.current?.focus({ preventScroll: true });
        }}
      >
        <button ref={closeRef} type="button" className={styles.oldLogoClose} aria-label="Close old logo gallery" onClick={closeGallery}>
          <Image src="/projects/shared/close.svg" alt="" width={32} height={32} />
        </button>
        <div className={styles.oldLogoGrid}>
          <div className={styles.oldLogoLeft}>
            <Image src="/homepage/birmarket/old-logo-campaign.jpg" width={447} height={447} alt="Original pink Birmarket campaign with a phone mockup" sizes="(max-width: 700px) calc((100vw - 56px) / 2), 447px" />
            <Image src="/homepage/birmarket/old-logo-wordmark.jpg" width={447} height={447} alt="Original pink Birmarket wordmark" sizes="(max-width: 700px) calc((100vw - 56px) / 2), 447px" />
            <Image className={styles.oldLogoAdvert} src="/homepage/birmarket/old-logo-advert.jpg" width={902} height={601} alt="Original Birmarket promotional campaign with a presenter" sizes="(max-width: 700px) calc(100vw - 48px), 902px" />
          </div>
          <div className={styles.oldLogoRight}>
            <Image src="/homepage/birmarket/old-logo-app.jpg" width={447} height={720} alt="Birmarket app before the brand refresh" sizes="(max-width: 700px) calc((100vw - 56px) / 2), 447px" />
            <Image src="/homepage/birmarket/old-logo-promotion.jpg" width={447} height={447} alt="Original pink Birmarket discount promotion" sizes="(max-width: 700px) calc((100vw - 56px) / 2), 447px" />
          </div>
        </div>
      </dialog>
    </>
  );
}
