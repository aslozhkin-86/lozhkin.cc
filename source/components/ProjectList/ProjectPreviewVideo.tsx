"use client";

import { useEffect, useRef } from "react";

import styles from "./ProjectList.module.css";

export function ProjectPreviewVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncPlayback = () => {
      if (!visible || motionPreference.matches) video.pause();
      else void video.play().catch(() => {});
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

  return (
    <video
      ref={videoRef}
      className={styles.projectVideo}
      src="/homepage/m10/digital-card-lilac.mp4"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="m10 digital card preview"
    />
  );
}
