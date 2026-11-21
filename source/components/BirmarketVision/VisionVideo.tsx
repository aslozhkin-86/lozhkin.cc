"use client";

import { useEffect, useRef } from "react";

import styles from "./BirmarketVision.module.css";

type VisionVideoProps = {
  src: string;
  label: string;
};

export function VisionVideo({ src, label }: VisionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const syncPlayback = () => {
      if (visible && !motionPreference.matches) void video.play().catch(() => {});
      else video.pause();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.5;
      syncPlayback();
    }, { threshold: 0.5 });

    observer.observe(video);
    motionPreference.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, []);

  return <video ref={videoRef} className={styles.video} src={src} muted loop playsInline preload="metadata" aria-label={label} />;
}
