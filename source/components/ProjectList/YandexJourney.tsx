import styles from "./ProjectList.module.css";

const journey = ["Cart", "Checkout", "Delivery", "Tracking", "History", "Returns"];

export function YandexJourney() {
  return (
    <div className={styles.journey} aria-label="Purchase journey: Cart, Checkout, Delivery, Tracking, History, Returns">
      <div className={styles.journeyTrack}>
        {[0, 1].map((copy) => (
          <div className={styles.journeyItems} aria-hidden={copy === 1} key={copy}>
            {journey.map((step) => <span className={styles.journeyStep} key={step}>{step}<span aria-hidden="true" className={styles.journeyArrow}>→</span></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
