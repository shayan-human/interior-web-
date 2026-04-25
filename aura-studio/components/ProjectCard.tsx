'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={styles.imageContainer}>
        <Image 
          src={project.image} 
          alt={project.name}
          fill
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.type}>{project.type}</span>
          <span className={styles.year}>{project.year}</span>
        </div>
        
        <h3 className={styles.name}>{project.name}</h3>
        
        <p className={styles.description}>
          {project.description}
        </p>
        
        <span className={styles.location}>{project.location}</span>
      </div>
    </motion.div>
  );
}
