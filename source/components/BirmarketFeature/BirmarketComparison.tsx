"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SelectPill } from "@/components/SelectPill/SelectPill";

import styles from "./BirmarketFeature.module.css";

export function BirmarketComparison() {
  const [version, setVersion] = useState<"old" | "new">("old");
  const [showVideo, setShowVideo] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playRequest = useRef(0);

  const selectOld = () => {
    playRequest.current += 1;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setShowVideo(false);
    setVersion("old");
  };

  const selectNew = () => {
    const request = ++playRequest.current;
    setVersion("new");
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowVideo(false);
      return;
    }
    video.pause();
    video.currentTime = 0;
    setShowVideo(true);
    void video.play().catch(() => {
      if (playRequest.current === request) setShowVideo(false);
    });
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let triggered = false;
    const checkPosition = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect || triggered || rect.top > 0 || rect.bottom <= 0) return;
      triggered = true;
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
      selectNew();
    };
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);
    checkPosition();
    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, []);

  return (
    <div ref={cardRef} className={styles.comparison}>
      <h3>Strengthening the brand’s presence</h3>
      <div className={styles.comparisonControls} role="group" aria-label="Birmarket app design version">
        <SelectPill label="Old" selected={version === "old"} onClick={selectOld} />
        <SelectPill label="New" selected={version === "new"} onClick={selectNew} />
      </div>
      <Image
        className={styles.comparisonPhone}
        src={version === "new" ? "/homepage/birmarket/new-app.png" : "/homepage/birmarket/old-app.png"}
        width={691}
        height={1431}
        alt={version === "new" ? "Birmarket app after the brand refresh" : "Birmarket app before the brand refresh"}
        sizes="(max-width: 1079px) 59vw, 340px"
      />
      <video
        ref={videoRef}
        className={`${styles.comparisonPhone} ${styles.comparisonVideo}`}
        src="/homepage/birmarket/cloth-drop.mp4"
        poster="/homepage/birmarket/old-app.png"
        preload="auto"
        muted
        playsInline
        aria-hidden="true"
        hidden={!showVideo}
        onEnded={() => setShowVideo(false)}
        onError={() => setShowVideo(false)}
      />
    </div>
  );
}
