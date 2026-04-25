'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TestimonialSlider.module.css';

export default function TestimonialSlider() {
  return (
    <section className={styles.section}>
      <motion.p 
        className={styles.quote}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
      </motion.p>
      
      <motion.div 
        className={styles.author}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Le Corbusier
      </motion.div>
    </section>
  );
}
