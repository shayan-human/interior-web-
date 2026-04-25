'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './CTABanner.module.css';

export default function CTABanner() {
  return (
    <section className={styles.section}>
      <motion.span 
        className={styles.label}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Project Inquiry
      </motion.span>
      
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Ready to reimagine your space?
      </motion.h2>
      
      <motion.button 
        className={styles.btn}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Get in Touch
      </motion.button>
    </section>
  );
}
