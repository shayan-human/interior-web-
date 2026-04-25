'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import styles from './WorkPage.module.css';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Hospitality'];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(p => 
    activeCategory === 'All' || p.type === activeCategory
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>Our Work</span>
          <h1 className={styles.title}>Every space tells a story.</h1>
          <p className={styles.body}>
            A curated collection of projects where light, geometry, and intention converge.
          </p>
        </motion.div>

        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className={styles.grid}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
