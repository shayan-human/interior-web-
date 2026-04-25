'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import FloatingShards from './FloatingShards';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  },
};

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <FloatingShards />
      
      <motion.div 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.label} variants={itemVariants}>
          Interior Design Studio
        </motion.span>
        
        <motion.h1 className={styles.title} variants={itemVariants}>
          <span>Spaces built</span>
          <span className={styles.italic}>from silence.</span>
        </motion.h1>
        
        <motion.p className={styles.body} variants={itemVariants}>
          We craft interiors that hold light, proportion, and intention.
        </motion.p>
        
        <motion.div className={styles.actions} variants={itemVariants}>
          <button className={styles.btnGlass}>Explore Work</button>
          <button className={styles.btnSolid}>Book a Call</button>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className={styles.scrollLine}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className={styles.scrollText}>SCROLL</span>
      </motion.div>
    </section>
  );
}
