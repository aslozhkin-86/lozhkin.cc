"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import styles from "./ProjectList.module.css";

export function YandexDeliveryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => {});
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      video.currentTime = 0;
      void video.play().catch(() => {});
      observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.deliveryRow}>
      <button className={`${styles.deliveryCard} ${styles.deliveryVideoCard}`} type="button" onClick={replay} aria-label="Replay the Yandex Market delivery model animation">
        <video ref={videoRef} className={styles.deliveryVideo} src="/homepage/yandex/delivery-model.mp4" muted playsInline preload="auto" aria-hidden="true" />
      </button>
      <div className={`${styles.deliveryCard} ${styles.deliveryTextCard}`}>
        <Image className={styles.deliveryIcon} src="/homepage/yandex/delivery-icon.svg" alt="" width={48} height={50} />
        <div className={styles.deliveryCopy}>
          <p>Delivery options and tariffs had grown through one-off decisions, creating inconsistencies across the purchase journey.</p>
          <p>Working with a product manager,<br />I brought them into one model for courier delivery and pickup, with clear rules for express, on-demand and standard options.</p>
        </div>
      </div>
    </div>
  );
}
