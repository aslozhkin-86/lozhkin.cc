"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import styles from "./BirmarketVision.module.css";

export function VisionHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => setPlaying(false));
  };

  const reset = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setPlaying(false);
  };

  return (
    <div className={`${styles.placeholder} ${styles.hero} ${styles.videoCard}`}>
      <video
        ref={videoRef}
        className={styles.video}
        src="/homepage/birmarket/vision-2027/hero.mp4"
        poster="/homepage/birmarket/vision-2027/hero-poster.jpg"
        muted
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onEnded={reset}
        aria-label="Birmarket 2027 concept overview animation"
      />
      {!playing && (
        <button className={styles.playButton} type="button" onClick={play} aria-label="Play Birmarket 2027 concept video">
          <Image src="/homepage/birmarket/vision-2027/play.svg" alt="" width={144} height={144} />
        </button>
      )}
    </div>
  );
}
