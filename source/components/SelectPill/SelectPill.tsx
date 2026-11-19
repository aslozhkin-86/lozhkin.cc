import type { ButtonHTMLAttributes } from "react";

import styles from "./SelectPill.module.css";

type SelectPillProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: string;
  selected: boolean;
};

export function SelectPill({ label, selected, className, type = "button", ...props }: SelectPillProps) {
  return (
    <button
      {...props}
      aria-pressed={selected}
      className={[styles.pill, className].filter(Boolean).join(" ")}
      data-selected={selected}
      type={type}
    >
      {label}
    </button>
  );
}
