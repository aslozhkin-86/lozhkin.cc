"use client";

import { useEffect, useState } from "react";

import styles from "./WhiteboardHeader.module.css";

type PermissionedOrientationEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

function axisDirection(value: number, current: number, enter: number, exit: number) {
  if (current === 0 && value < -exit) return 0;
  if (current === 2 && value > exit) return 2;
  return value < -enter ? 0 : value > enter ? 2 : 1;
}

function directionIndex(x: number, y: number, current: number, enter: number, exit: number) {
  const column = axisDirection(x, current % 3, enter, exit);
  const row = axisDirection(y, Math.floor(current / 3), enter, exit);
  return row * 3 + column;
}

export function GazePortrait() {
  const [direction, setDirection] = useState(4);
  const [canEnableMotion, setCanEnableMotion] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const [motionDenied, setMotionDenied] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    const availabilityFrame = window.requestAnimationFrame(() => {
      setCanEnableMotion(coarsePointer.matches && "DeviceOrientationEvent" in window && !reducedMotion.matches);
    });

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      const x = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      // The middle 40% of each viewport axis keeps the portrait looking forward.
      setDirection((current) => directionIndex(x, y, current, 0.4, 0.3));
    };
    const onReducedMotionChange = () => {
      setCanEnableMotion(coarsePointer.matches && "DeviceOrientationEvent" in window && !reducedMotion.matches);
      if (reducedMotion.matches) setDirection(4);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    reducedMotion.addEventListener("change", onReducedMotionChange);
    return () => {
      window.cancelAnimationFrame(availabilityFrame);
      window.removeEventListener("pointermove", onPointerMove);
      reducedMotion.removeEventListener("change", onReducedMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!motionEnabled) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let origin: { beta: number; gamma: number } | null = null;
    const timeout = window.setTimeout(() => {
      if (origin) return;
      setMotionEnabled(false);
      setMotionDenied(true);
    }, 2500);
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (reducedMotion.matches || event.beta === null || event.gamma === null) return;
      if (!origin) {
        window.clearTimeout(timeout);
        setMotionReady(true);
      }
      origin ??= { beta: event.beta, gamma: event.gamma };
      const angle = window.screen.orientation?.angle ?? 0;
      const sideways = Math.abs(angle) === 90;
      const x = sideways ? event.beta - origin.beta : event.gamma - origin.gamma;
      const y = sideways ? event.gamma - origin.gamma : event.beta - origin.beta;
      setDirection((current) => directionIndex(x, y, current, 14, 9));
    };
    window.addEventListener("deviceorientation", onOrientation);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [motionEnabled]);

  const enableMotion = async () => {
    try {
      const orientation = DeviceOrientationEvent as PermissionedOrientationEvent;
      if (orientation.requestPermission && await orientation.requestPermission() !== "granted") {
        setMotionDenied(true);
        return;
      }
      setMotionDenied(false);
      setMotionEnabled(true);
    } catch {
      setMotionDenied(true);
    }
  };

  return (
    <div className={styles.portraitControl}>
      <div className={styles.portraitFrame} role="img" aria-label="Alexander Lozhkin">
        <span
          className={styles.gazeFrame}
          style={{ backgroundPosition: `${3 + (direction % 3) * 47}% ${3 + Math.floor(direction / 3) * 47}%` }}
          aria-hidden="true"
        />
      </div>
      {canEnableMotion && !motionReady && (
        <button className={styles.motionButton} type="button" onClick={enableMotion} disabled={motionEnabled} aria-live="polite">
          {motionEnabled ? "Connecting motion…" : motionDenied ? "Motion unavailable · retry" : "Enable motion"}
        </button>
      )}
    </div>
  );
}
