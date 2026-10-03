"use client";

import Image from "next/image";
import {
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import styles from "./DraggableIcon.module.css";

type DraggableIconProps = {
  className?: string;
  dataKind: string;
  dragging: boolean;
  id: string;
  imageClassName?: string;
  label: string;
  onBeginDrag: (event: ReactPointerEvent<HTMLElement>, id: string) => boolean;
  onEndDrag: (event: ReactPointerEvent<HTMLElement>, id: string) => void;
  onMove: (event: ReactPointerEvent<HTMLElement>, id: string) => void;
  onTooltipToggle?: (id: string) => void;
  open?: boolean;
  popoverId?: string;
  sizes: string;
  src: string;
  style: CSSProperties & Record<`--${string}`, string | number>;
  tooltip?: ReactNode;
  tooltipClassName?: string;
  unoptimized?: boolean;
};

export function DraggableIcon({
  className,
  dataKind,
  dragging,
  id,
  imageClassName,
  label,
  onBeginDrag,
  onEndDrag,
  onMove,
  onTooltipToggle,
  open = false,
  popoverId,
  sizes,
  src,
  style,
  tooltip,
  tooltipClassName,
  unoptimized = false,
}: DraggableIconProps) {
  const [tooltipSuppressed, setTooltipSuppressed] = useState(false);
  const tooltipId = `${dataKind}-tooltip-${id}`;
  const dataAttribute = { [`data-${dataKind}-id`]: id };

  return (
    <div
      {...dataAttribute}
      className={`${styles.root} ${className ?? ""}`}
      data-dragging={dragging}
      data-open={open}
      data-tooltip-suppressed={tooltipSuppressed}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-describedby={open && tooltip && !popoverId ? tooltipId : undefined}
      aria-controls={popoverId}
      aria-haspopup={popoverId ? "dialog" : undefined}
      aria-expanded={onTooltipToggle ? open : undefined}
      onBlur={() => setTooltipSuppressed(false)}
      onClick={() => onTooltipToggle?.(id)}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && onTooltipToggle) {
          event.preventDefault();
          onTooltipToggle(id);
        }
      }}
      onPointerDown={(event) => {
        if (onBeginDrag(event, id)) setTooltipSuppressed(true);
      }}
      onPointerMove={(event) => onMove(event, id)}
      onPointerUp={(event) => onEndDrag(event, id)}
      onPointerCancel={(event) => onEndDrag(event, id)}
      onPointerLeave={() => {
        if (!dragging) setTooltipSuppressed(false);
      }}
    >
      <div className={`${styles.visual} ${imageClassName ?? ""}`}>
        <Image src={src} alt={label} fill sizes={sizes} draggable={false} unoptimized={unoptimized} style={{ objectFit: "contain" }} />
      </div>
      {tooltip ? (
        <div className={`${styles.tooltip} ${tooltipClassName ?? ""}`} id={tooltipId} role="tooltip">
          {tooltip}
        </div>
      ) : null}
    </div>
  );
}
