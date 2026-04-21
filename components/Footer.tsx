import Link from "next/link";
import styles from "./Footer.module.css";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>{siteConfig.shortName} STUDIO</h2>
            <p className={styles.tagline}>"{siteConfig.description}"</p>
          </div>
          
          <div className={styles.links}>
            <Link href="/work" className={styles.link}>Work</Link>
            <Link href="/press" className={styles.link}>Press</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>

          <div className={styles.socials}>
            <Link href="#" className={styles.socialLink}>IG</Link>
            <Link href="#" className={styles.socialLink}>LI</Link>
            <Link href="#" className={styles.socialLink}>PI</Link>
          </div>
        </div>

        <div className={styles.divider} />
        
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>© {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
