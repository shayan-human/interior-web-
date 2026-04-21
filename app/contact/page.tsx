"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GoldDivider from "@/components/GoldDivider";
import styles from "./ContactPage.module.css";
import { siteConfig } from "@/lib/config";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.page}>
      <div className={styles.splitContainer}>
        
        {/* Left Panel - Editorial Setup */}
        <motion.div 
          className={styles.editorialPanel}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.editorialContent}>
            <p className={styles.label}>LET'S CREATE SOMETHING EXTRAORDINARY</p>
            <h1 className={styles.headline}>Start your project.</h1>
            
            <div className={styles.dividerWrapper}>
              <GoldDivider width="60px" />
            </div>

            <div className={styles.studioInfo}>
              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Studio</p>
                <p className={styles.infoText}>{siteConfig.location}</p>
              </div>
              
              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Contact</p>
                <p className={styles.infoText}>{siteConfig.email}<br/>{siteConfig.phone}</p>
              </div>

              <div className={styles.infoBlock}>
                <p className={styles.infoNotes}>We respond within 24 hours.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Form */}
        <motion.div 
          className={styles.formPanel}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isSubmitted ? (
            <motion.div 
              className={styles.successState}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className={styles.successHeadline}>Thank you.</h3>
              <p className={styles.successText}>We've received your inquiry and will be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name *" 
                  required 
                  className={styles.input}
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address *" 
                  required 
                  className={styles.input}
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.gridGroup}>
                <select 
                  name="projectType" 
                  className={`${styles.input} ${formState.projectType !== "" ? styles.selectedVal : ''}`}
                  value={formState.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Project Type *</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="hospitality">Hospitality</option>
                </select>

                <select 
                  name="budget" 
                  className={`${styles.input} ${formState.budget !== "" ? styles.selectedVal : ''}`}
                  value={formState.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Budget Range *</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k-500k">$100k - $500k</option>
                  <option value="500k+">$500k+</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <textarea 
                  name="message" 
                  placeholder="Project Details *" 
                  required 
                  rows={4}
                  className={styles.textarea}
                  value={formState.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit Inquiry
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  );
}
