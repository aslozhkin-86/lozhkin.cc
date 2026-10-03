"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

import { DraggableIcon } from "../DraggableIcon";
import { useDragCollection } from "../interaction/useDragCollection";
import { useLayerOrder } from "../interaction/useLayerOrder";
import styles from "./CompanyHistory.module.css";

const companies = [
  {
    id: "ya",
    label: "Yandex",
    tags: "Technology, Russia",
    tooltip: "Where I grew from designer to manager. So much of how I work started here",
    x: 288,
    y: 288,
  },
  {
    id: "bir",
    label: "Bir",
    tags: "Fintech & E-commerce, Azerbaijan",
    tooltip: "My first full-time design management role. Plenty to learn across projects in Azerbaijan",
    x: 408,
    y: 281,
  },
  {
    id: "dolfin",
    label: "Dolfin",
    tags: "Fintech, UK",
    tooltip: "A rewarding challenge: making a complex trading product easier to use",
    x: 531,
    y: 295,
  },
  {
    id: "leo",
    label: "Lingualeo",
    tags: "EdTech, Russia",
    tooltip: "Making English learning feel a little friendlier was a joy",
    x: 651,
    y: 304,
  },
  {
    id: "tbank",
    label: "T-bank",
    tags: "Fintech, Russia",
    tooltip: "Helped the team move from Sketch to Figma, with a few side projects along the way",
    x: 776,
    y: 281,
  },
  {
    id: "ec",
    label: "Novotelecom",
    tags: "Telecom, Russia",
    tooltip: "My first serious job. My God, was that really 2010?",
    x: 928,
    y: 297,
  },
] as const;

const companyIds = companies.map(({ id }) => id);
const companyIconSize = 81;
const companyIconInset = (90 - companyIconSize) / 2;
type CompanyId = (typeof companies)[number]["id"];
type Company = (typeof companies)[number];
type CompanyStyle = CSSProperties & Record<`--${string}`, string | number>;
const mobileQuery = "(max-width: 999px), (hover: none), (pointer: coarse)";

function CompanyTooltipContent({
  company,
  titleId,
  descriptionId,
}: {
  company: Company;
  titleId?: string;
  descriptionId?: string;
}) {
  return (
    <>
      <strong className={styles.tooltipTitle} id={titleId}>{company.label}</strong>
      <span className={styles.tooltipTags}>{company.tags}</span>
      <span className={styles.tooltipDescription} id={descriptionId}>{company.tooltip}</span>
    </>
  );
}

export function CompanyHistory() {
  const layers = useLayerOrder<CompanyId>(companyIds);
  const icons = useDragCollection(companyIds, {
    enabled: () => window.matchMedia(
      "(min-width: 1000px) and (hover: hover) and (pointer: fine)",
    ).matches,
    onDragStart: (id) => layers.bringToFront(id as CompanyId),
  });
  const [openTooltip, setOpenTooltip] = useState<CompanyId | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ left: number; top: number } | null>(null);
  const openCompany = companies.find((company) => company.id === openTooltip);

  useEffect(() => {
    if (!openTooltip) return;

    function positionPopover() {
      const icon = document.querySelector<HTMLElement>(`[data-company-id="${openTooltip}"]`);
      if (!icon) return;
      const rect = icon.getBoundingClientRect();
      const width = window.innerWidth - 80;
      const center = Math.min(
        window.innerWidth - 40 - width / 2,
        Math.max(40 + width / 2, rect.left + rect.width / 2),
      );
      // Document coordinates keep the popover attached during native scrolling.
      // Clamp horizontally to retain the existing 40 px screen gutters.
      setPopoverPosition({ left: center + window.scrollX, top: rect.top + window.scrollY - 16 });
    }

    positionPopover();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenTooltip(null);
        document.querySelector<HTMLElement>(`[data-company-id="${openTooltip}"]`)?.focus({ preventScroll: true });
      }
    }

    const mediaQuery = window.matchMedia(mobileQuery);
    function onMediaChange() {
      if (!mediaQuery.matches) setOpenTooltip(null);
    }

    function onOutsideClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      if (popoverRef.current?.contains(event.target) || event.target.closest("[data-company-id]")) return;
      setOpenTooltip(null);
    }

    const resizeObserver = new ResizeObserver(positionPopover);
    const icon = document.querySelector<HTMLElement>(`[data-company-id="${openTooltip}"]`);
    if (icon?.parentElement) resizeObserver.observe(icon.parentElement);
    window.addEventListener("resize", positionPopover);
    document.addEventListener("click", onOutsideClick);
    document.addEventListener("keydown", onKeyDown);
    mediaQuery.addEventListener("change", onMediaChange);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", positionPopover);
      document.removeEventListener("click", onOutsideClick);
      document.removeEventListener("keydown", onKeyDown);
      mediaQuery.removeEventListener("change", onMediaChange);
    };
  }, [openTooltip]);

  const popoverReady = popoverPosition !== null;
  useEffect(() => {
    if (openTooltip && popoverReady) closeButtonRef.current?.focus({ preventScroll: true });
  }, [openTooltip, popoverReady]);

  function closeTooltip() {
    if (!openTooltip) return;
    setOpenTooltip(null);
    document.querySelector<HTMLElement>(`[data-company-id="${openTooltip}"]`)?.focus({ preventScroll: true });
  }

  function toggleTooltip(id: string) {
    if (!window.matchMedia(mobileQuery).matches) return;
    setPopoverPosition(null);
    setOpenTooltip((current) => current === id ? null : id as CompanyId);
  }

  return (
    <section className={styles.section} aria-labelledby="company-history-title"
      data-dragging={Boolean(icons.draggingId)}>
      <Image
        alt=""
        className={styles.divider}
        draggable={false}
        height={40}
        src="/hero/redesign/line.svg"
        width={205}
      />

      <h2 className={styles.title} id="company-history-title">
        Thanks for the room to try,<br />get things wrong, and grow
      </h2>

      <div className={styles.icons} role="group" aria-label="Companies I worked with">
        {companies.map((company) => {
          const offset = icons.offsets[company.id] ?? { x: 0, y: 0 };
          const style: CompanyStyle = {
            "--icon-x": `calc(${company.x / 1280 * 100}% + ${companyIconInset}px)`,
            "--icon-y": `${company.y + companyIconInset}px`,
            "--icon-width": `${companyIconSize}px`,
            "--icon-height": `${companyIconSize}px`,
            "--icon-z": layers.zIndex(company.id),
            "--drag-x": `${offset.x}px`,
            "--drag-y": `${offset.y}px`,
          };

          return (
            <DraggableIcon
              key={company.id}
              className={styles.company}
              dataKind="company"
              dragging={icons.draggingId === company.id}
              id={company.id}
              imageClassName={styles.image}
              label={company.label}
              onBeginDrag={icons.beginDrag}
              onEndDrag={icons.endDrag}
              onMove={icons.moveItem}
              onTooltipToggle={toggleTooltip}
              open={openTooltip === company.id}
              popoverId={openTooltip === company.id ? "company-popover" : undefined}
              sizes={`${companyIconSize}px`}
              src={`/hero/companies/${company.id}.png`}
              unoptimized
              style={style}
              tooltip={<CompanyTooltipContent company={company} />}
              tooltipClassName={styles.companyTooltip}
            />
          );
        })}
      </div>
      {openCompany && createPortal(
          <div
            aria-describedby="company-popup-description"
            aria-labelledby="company-popup-title"
            className={styles.popover}
            id="company-popover"
            key={openCompany.id}
            ref={popoverRef}
            role="dialog"
            style={{
              left: popoverPosition?.left,
              top: popoverPosition?.top,
              visibility: popoverPosition ? undefined : "hidden",
            }}
          >
            <CompanyTooltipContent
              company={openCompany}
              titleId="company-popup-title"
              descriptionId="company-popup-description"
            />
            <button
              aria-label={`Close ${openCompany.label} details`}
              className={styles.popupClose}
              onClick={closeTooltip}
              ref={closeButtonRef}
              type="button"
            >
              <Image alt="" height={24} src="/hero/companies/close-tooltip.svg" width={24} />
            </button>
          </div>,
        document.body,
      )}
    </section>
  );
}
