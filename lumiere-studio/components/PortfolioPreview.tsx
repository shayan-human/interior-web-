"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./PortfolioPreview.module.css";

const projects = [
  {
    id: "01",
    title: "The Onyx Residence",
    category: "Residential Architecture",
    description: "A masterclass in restraint. This private villa balances monumental scale with intimate, meticulously curated living spaces.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",
    bg: "var(--bg-void)",
  },
  {
    id: "03",
    title: "Vellum Office",
    category: "Commercial Interior",
    description: "Brutalist warmth for modern workflows. A workspace defined by raw materiality and intentional light.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    bg: "var(--bg-void)",
  },
  {
    id: "04",
    title: "The Meridian Hotel",
    category: "Hospitality Design",
    description: "A boutique experience defined by cinematic lighting, tactile materials, and an unwavering attention to detail.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    bg: "var(--bg-dark)",
  },
];

export default function PortfolioPreview() {
  return (
    <section className={styles.section}>
      {projects.map((project, index) => {
        const isEven = index % 2 !== 0;

        return (
          <div 
            key={project.id}
            className={`${styles.projectRow} ${isEven ? styles.reverse : ""}`}
            style={{ backgroundColor: project.bg }}
          >
            <motion.div 
              className={styles.imageCol}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.image}
                />
              </div>
            </motion.div>

            <motion.div 
              className={styles.textCol}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.textContent}>
                <span className={styles.number}>{project.id}</span>
                <span className={styles.category}>{project.category}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <Link href="/work" className={styles.link}>
                  View Project &rarr;
                </Link>
              </div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
