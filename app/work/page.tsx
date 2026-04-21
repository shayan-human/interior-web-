"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GoldDivider from "@/components/GoldDivider";
import styles from "./WorkPage.module.css";

const ALL_PROJECTS = [
  // Residential
  { id: "1", title: "The Onyx Residence", category: "Residential", year: "2024", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200", aspect: "portrait" },
  { id: "2", title: "Maison Blanc", category: "Residential", year: "2024", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200", aspect: "landscape" },
  { id: "3", title: "Void House", category: "Residential", year: "2024", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200", aspect: "landscape" },
  { id: "4", title: "Negative Space", category: "Residential", year: "2023", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200", aspect: "portrait" },
  
  // Commercial
  { id: "5", title: "Vellum Office", category: "Commercial", year: "2024", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200", aspect: "landscape" },
  { id: "6", title: "The Archive Retail", category: "Commercial", year: "2023", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200", aspect: "portrait" },
  { id: "7", title: "Nexus Lobby", category: "Commercial", year: "2024", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200", aspect: "landscape" },
  { id: "8", title: "Co-Lab Workspace", category: "Commercial", year: "2023", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200", aspect: "portrait" },

  // Hospitality
  { id: "10", title: "The Meridian Hotel", category: "Hospitality", year: "2023", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200", aspect: "landscape" },
  { id: "11", title: "Solarium Lounge", category: "Hospitality", year: "2024", image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200", aspect: "landscape" },
];

const FILTERS = ["All", "Residential", "Commercial", "Hospitality"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className={styles.page}>
      {/* 4.1 Page Header */}
      <header className={styles.header}>
        <motion.p 
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          OUR WORK
        </motion.p>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Every space, a story.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GoldDivider />
        </motion.div>
      </header>

      {/* 4.2 Filter bar */}
      <div className={styles.filterBar}>
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilter : ''}`}
          >
            {filter}
            {activeFilter === filter && (
              <motion.div 
                layoutId="activeFilterIndicator"
                className={styles.activeIndicator}
              />
            )}
          </button>
        ))}
      </div>

      {/* 4.3 Project grid */}
      <motion.div layout className={styles.grid}>
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={project.id}
              className={`${styles.card} ${project.aspect === 'landscape' ? styles.landscape : styles.portrait}`}
            >
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay}>
                <div className={styles.cardContent}>
                  <p className={styles.cardCategory}>{project.category}</p>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <div className={styles.cardFooter}>
                    <p className={styles.cardYear}>{project.year}</p>
                    <span className={styles.cardLink}>View &rarr;</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
