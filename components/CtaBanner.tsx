import Link from "next/link";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.headline}>Ready to transform your space?</h2>
        <p className={styles.subtext}>
          Book a complimentary consultation with our studio.
        </p>
        <Link href="/contact" className={styles.button}>
          Book Now &rarr;
        </Link>
      </div>
    </section>
  );
}
