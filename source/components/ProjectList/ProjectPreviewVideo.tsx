"use client";

import { useEffect, useRef } from "react";

import styles from "./ProjectList.module.css";

export function ProjectPreviewVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (motionPreference.matches) video.pause();
      else void video.play().catch(() => {});
    };

    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    return () => motionPreference.removeEventListener("change", syncPlayback);
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
