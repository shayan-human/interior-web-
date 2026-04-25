'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import styles from './FeaturedGrid.module.css';

export default function FeaturedGrid() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.span 
          className={styles.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Selected projects
        </motion.span>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Recent Work
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
