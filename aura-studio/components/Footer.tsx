import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <span className={styles.wordmark}>AURA</span>
          <p className={styles.tagline}>
            Architectural interior design firm specializing in minimalist geometry and atmospheric environments.
          </p>
        </div>

        <div className={styles.linksColumn}>
          <span className={styles.columnTitle}>Nav</span>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/work" className={styles.link}>Work</Link>
          <Link href="/studio" className={styles.link}>Studio</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>

        <div className={styles.linksColumn}>
          <span className={styles.columnTitle}>Social</span>
          <Link href="#" className={styles.link}>Instagram</Link>
          <Link href="#" className={styles.link}>Pinterest</Link>
          <Link href="#" className={styles.link}>LinkedIn</Link>
          <Link href="#" className={styles.link}>Behance</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} AURA STUDIO. ALL RIGHTS RESERVED.
        </p>
        <p className={styles.copyright}>
          Privacy Policy / Terms of Service
        </p>
      </div>
    </footer>
  );
}
