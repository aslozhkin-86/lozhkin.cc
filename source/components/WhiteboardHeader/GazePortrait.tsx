"use client";

import { useEffect, useRef, useState } from "react";

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
  const portraitRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(4);
  const [reaction, setReaction] = useState<"age" | "bottom" | null>(null);
  const [bubbleReaction, setBubbleReaction] = useState<"age" | "bottom" | null>(null);
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

    const desktopMotion = window.matchMedia("(min-width: 1080px) and (hover: hover) and (pointer: fine)");
    if (desktopMotion.matches) {
      for (const src of ["/hero/minimal/surprised-left.jpg", "/hero/minimal/interested-down.jpg"]) {
        const portrait = new window.Image();
        portrait.src = src;
      }
    }
    const ageCaption = document.getElementById("hero-design-years");
    let ageHovered = false;
    let bottomActive = false;
    let ageShown = false;
    let bottomShown = false;
    let ageTimer: number | undefined;
    let bottomTimer: number | undefined;
    let ageBubbleTimer: number | undefined;
    let bottomBubbleTimer: number | undefined;

    const clearAge = () => {
      window.clearTimeout(ageTimer);
      window.clearTimeout(ageBubbleTimer);
      ageTimer = undefined;
      ageBubbleTimer = undefined;
      ageHovered = false;
      ageShown = false;
      setReaction((current) => current === "age" ? null : current);
      setBubbleReaction((current) => current === "age" ? null : current);
    };
    const clearBottom = () => {
      window.clearTimeout(bottomTimer);
      window.clearTimeout(bottomBubbleTimer);
      bottomTimer = undefined;
      bottomBubbleTimer = undefined;
      bottomActive = false;
      bottomShown = false;
      setReaction((current) => current === "bottom" ? null : current);
      setBubbleReaction((current) => current === "bottom" ? null : current);
    };
    const canReact = () => desktopMotion.matches && !reducedMotion.matches;
    const onAgeEnter = (event: PointerEvent) => {
      if (!canReact() || (event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
      clearBottom();
      ageHovered = true;
      ageTimer = window.setTimeout(() => {
        if (!ageHovered) return;
        ageShown = true;
        setReaction("age");
        setDirection(6);
        ageBubbleTimer = window.setTimeout(() => {
          if (ageHovered && canReact()) setBubbleReaction("age");
        }, 150);
      }, 500);
    };
    const onAgeLeave = () => clearAge();

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || (event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
      const portrait = portraitRef.current?.getBoundingClientRect();
      if (!portrait) return;
      const x = (event.clientX - (portrait.left + portrait.width / 2)) / (window.innerWidth / 2);
      const y = (event.clientY - (portrait.top + portrait.height / 2)) / (window.innerHeight / 2);
      // The 50%-of-viewport safe area follows the portrait's position on screen.
      if (!ageShown && !bottomShown) setDirection((current) => directionIndex(x, y, current, 0.5, 0.375));

      const hero = portraitRef.current?.closest("header")?.getBoundingClientRect();
      const inHero = !!hero && event.clientY >= hero.top && event.clientY <= hero.bottom;
      const inBottomBand = canReact() && inHero && event.clientY >= window.innerHeight * 0.8;
      if (inBottomBand && !ageHovered) {
        if (!bottomActive) {
          bottomActive = true;
          bottomTimer = window.setTimeout(() => {
            if (!bottomActive) return;
            bottomShown = true;
            setReaction("bottom");
            setDirection(7);
            bottomBubbleTimer = window.setTimeout(() => {
              if (bottomActive && canReact()) setBubbleReaction("bottom");
            }, 150);
          }, 2000);
        }
      } else if (bottomActive) clearBottom();
    };
    const onReducedMotionChange = () => {
      setCanEnableMotion(coarsePointer.matches && "DeviceOrientationEvent" in window && !reducedMotion.matches);
      if (reducedMotion.matches) {
        clearAge();
        clearBottom();
        setDirection(4);
      }
    };
    const onWindowLeave = () => { clearAge(); clearBottom(); };
    const onPointerOut = (event: PointerEvent) => {
      // A null destination means the pointer left the document, not a child element.
      if (!event.relatedTarget) onWindowLeave();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    ageCaption?.addEventListener("pointerenter", onAgeEnter);
    ageCaption?.addEventListener("pointerleave", onAgeLeave);
    window.addEventListener("blur", onWindowLeave);
    window.addEventListener("scroll", onWindowLeave, { passive: true });
    window.addEventListener("resize", onWindowLeave);
    reducedMotion.addEventListener("change", onReducedMotionChange);
    return () => {
      window.clearTimeout(ageTimer);
      window.clearTimeout(bottomTimer);
      window.clearTimeout(ageBubbleTimer);
      window.clearTimeout(bottomBubbleTimer);
      window.cancelAnimationFrame(availabilityFrame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      ageCaption?.removeEventListener("pointerenter", onAgeEnter);
      ageCaption?.removeEventListener("pointerleave", onAgeLeave);
      window.removeEventListener("blur", onWindowLeave);
      window.removeEventListener("scroll", onWindowLeave);
      window.removeEventListener("resize", onWindowLeave);
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

  const reactionPortrait = reaction === "age"
    ? "/hero/minimal/surprised-left.jpg"
    : reaction === "bottom" ? "/hero/minimal/interested-down.jpg" : null;

  return (
    <div className={styles.portraitControl}>
      <div ref={portraitRef} className={styles.portraitFrame} role="img" aria-label="Alexander Lozhkin">
        <span
          className={styles.gazeFrame}
          style={reactionPortrait ? {
            backgroundImage: `url("${reactionPortrait}")`,
            backgroundSize: "112% 112%",
            backgroundPosition: "center",
          } : { backgroundPosition: `${3 + (direction % 3) * 47}% ${3 + Math.floor(direction / 3) * 47}%` }}
          aria-hidden="true"
        />
      </div>
      {bubbleReaction === reaction && reaction && <span className={`${styles.gazeBubble} ${reaction === "age" ? styles.ageBubble : styles.bottomBubble}`} role="status">
        {reaction === "age" ? "oh, Jesus" : "what is there"}
      </span>}
      {canEnableMotion && !motionReady && (
        <button className={styles.motionButton} type="button" onClick={enableMotion} disabled={motionEnabled} aria-live="polite">
          {motionEnabled ? "Connecting motion…" : motionDenied ? "Motion unavailable · retry" : "Enable motion"}
        </button>
      )}
    </div>
  );
}
