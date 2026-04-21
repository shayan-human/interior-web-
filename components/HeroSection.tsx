"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import GoldDivider from "./GoldDivider";
import styles from "./HeroSection.module.css";
import { siteConfig } from "@/lib/config";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const maskVariants = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration: 1.2, ease: "easeOut" as const } },
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" as const } },
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundWrapper}>
        <motion.div
          animate={{ scale: [1, 1.1] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920" 
            alt={`${siteConfig.name} Interior Space`}
            fill
            priority
            className={styles.backgroundImage}
          />
        </motion.div>
        <div className={styles.overlay} />
      </div>

      <motion.div 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mask-line">
          <motion.p className={styles.label} variants={maskVariants}>
            INTERIOR DESIGN STUDIO
          </motion.p>
        </div>
        
        <div className={styles.headlineGroup}>
          <div className="mask-line">
            <motion.h1 className={styles.headline} variants={maskVariants}>
              We design
            </motion.h1>
          </div>
          <div className="mask-line">
            <motion.h1 className={`${styles.headline} ${styles.italic}`} variants={maskVariants}>
              spaces
            </motion.h1>
          </div>
          <div className="mask-line">
            <motion.h1 className={styles.headline} variants={maskVariants}>
              that live.
            </motion.h1>
          </div>
        </div>

        <motion.div variants={fadeVariants} className={styles.dividerWrapper}>
          <GoldDivider width="80px" />
        </motion.div>

        <div className="mask-line">
          <motion.p className={styles.subtext} variants={maskVariants}>
            {siteConfig.name} crafts interiors that resonate with purpose, blending light, texture, and architectural precision into breathing spaces.
          </motion.p>
        </div>

        <motion.div className={styles.ctas} variants={fadeVariants}>
          <Link href="/work" className={styles.ctaOutline} data-cursor-interact>
            View Our Work
          </Link>
          <Link href="/contact" className={styles.ctaFilled} data-cursor-interact>
            Book a Consultation
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>SCROLL</span>
      </motion.div>
    </section>
  );
}
