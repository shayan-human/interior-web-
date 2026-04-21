'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import styles from './PressPage.module.css';
import { ArrowUpRight } from 'lucide-react';

const pressFeatures = [
  {
    publication: 'Architectural Digest',
    title: 'Minimalism Reimagined: The Silent Luxury of Noor Interior',
    date: 'April 2024',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1000&q=80'
  },
  {
    publication: 'Vogue Living',
    title: 'The Art of Living Well: Inside the Paris Penthouse',
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80'
  },
  {
    publication: 'Elle Decoration',
    title: 'Quiet Spaces: Exploring the Narrative of Light',
    date: 'January 2024',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&q=80'
  },
  {
    publication: 'Wallpaper*',
    title: 'Noor Interior: A New Standard for Architectural Intention',
    date: 'December 2023',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80'
  },
  {
    publication: 'Iconic Design',
    title: 'Functional Poetry: The Philosophy of the Modern Studio',
    date: 'October 2023',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'
  },
  {
    publication: 'The Architects Journal',
    title: 'Materiality and Light: The Evolution of Narrative Space',
    date: 'August 2023',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1000&q=80'
  }
];

export default function PressPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <motion.span 
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          EDITORIAL ARCHIVES
        </motion.span>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Selected Press.
        </motion.h1>
      </header>

      <motion.div 
        className={styles.grid}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {pressFeatures.map((feature, idx) => (
          <motion.article key={idx} className={styles.card} variants={fadeInUp}>
            <div className={styles.imageContainer}>
              <Image 
                src={feature.image} 
                alt={`${feature.publication} editorial`}
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.publication}>{feature.publication}</span>
              <h2 className={styles.articleTitle}>{feature.title}</h2>
              <p className={styles.date}>{feature.date}</p>
              <div className={styles.link}>
                READ FEATURE <ArrowUpRight size={14} />
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </main>
  );
}
