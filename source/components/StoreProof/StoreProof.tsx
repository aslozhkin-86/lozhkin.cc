import Image from "next/image";

import styles from "./StoreProof.module.css";

type Rating = {
  value: string;
  store: string;
  href?: string;
};

type StoreProofProps = {
  ariaLabel: string;
  variant: "hero" | "homepage";
  awardSrc: string;
  awardWidth: number;
  rank?: { value: string; text: string };
  ratings: readonly Rating[];
};

export function StoreProof({ ariaLabel, variant, awardSrc, awardWidth, rank, ratings }: StoreProofProps) {
  return (
    <div className={`${styles.proof} ${styles[variant]}`} aria-label={ariaLabel}>
      <span className={styles.award} aria-label="App of the Day on the App Store">
        <Image alt="" src={awardSrc} width={awardWidth} height={48} />
      </span>
      {rank && (
        <span className={styles.proofItem}>
          <span className={styles.badge}>{rank.value}</span>
          <span>{rank.text}</span>
        </span>
      )}
      <span className={styles.ratings}>
        {ratings.map(({ value, store, href }) => {
          const content = <><span className={styles.badge}>{value}</span><span>{store}</span></>;
          return href ? (
            <a className={styles.proofItem} href={href} key={store} rel="noreferrer" target="_blank">{content}</a>
          ) : (
            <span className={styles.proofItem} key={store}>{content}</span>
          );
        })}
      </span>
    </div>
  );
}
