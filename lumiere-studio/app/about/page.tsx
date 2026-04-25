'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import styles from './AboutPage.module.css';
import { siteConfig } from '@/lib/config';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const frameY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className={styles.main}>
      {/* "Out of Syllabus" Sticky Hero Section */}
      <section ref={containerRef} className={styles.heroSticky}>
        <div className={styles.heroContent}>
          {/* Moving Background Text Layer */}
          <motion.div style={{ x: textX }} className={styles.bgText}>
            ARCHITECTURAL MANIFESTO
          </motion.div>

          {/* Floating Frame Layer */}
          <motion.div 
            style={{ y: frameY }} 
            className={styles.heroFrame}
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <div className={styles.heroImageWrapper}>
              <motion.div style={{ scale: imageScale }} className={styles.heroImage}>
                <Image 
                  src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1600&q=80" 
                  alt="Minimalist architectural void"
                  fill
                  priority
                  className={styles.heroImage}
                />
              </motion.div>
            </div>

            <motion.span className={styles.subLabel} variants={fadeInUp}>
              SINCE 2024
            </motion.span>
            <motion.h1 className={styles.mainTitle} variants={fadeInUp}>
              Curating<br/><span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Silence.</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.section}>
        <div className={styles.philosophy}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className={styles.label}>OUR PHILOSOPHY</span>
            <h2 className={styles.philosophyText}>
              At {siteConfig.name}, we believe that space is not a vacuum to be filled, but a narrative to be told.
            </h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className={styles.philosophyDetail}
          >
            <p>
              Founded on the principle of architectural silence, our designs prioritize the emotional resonance of a room. We work with the inherent properties of light and natural materials to create interiors that don't just look beautiful—they feel intentional.
            </p>
            <p style={{ marginTop: '24px' }}>
              Every line, every texture, and every shadow is a deliberate choice in our pursuit of functional poetry.
            </p>
          </motion.div>
        </div>

        {/* Process Section */}
        <div className={styles.process}>
          <span className={styles.label}>OUR PROCESS</span>
          <motion.div 
            className={styles.processGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {[
              { num: '01', title: 'Observation', desc: 'We begin by studying the dialogue between the existing structure and its environment.' },
              { num: '02', title: 'Conceptualization', desc: 'Developing a unique architectural narrative that aligns with the client’s vision.' },
              { num: '03', title: 'Realization', desc: 'Bringing the concept to life through meticulous craftsmanship and material precision.' }
            ].map((step, idx) => (
              <motion.div key={idx} className={styles.processCard} variants={fadeInUp}>
                <span className={styles.processNumber}>{step.num}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
