'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.glassBox}>
          {/* Left Column — Info */}
          <div className={styles.infoCol}>
            <span className={styles.label}>Let's Talk</span>
            <h1 className={styles.title}>Start your project.</h1>
            <div className={styles.divider} />
            
            <div className={styles.contactList}>
              <p className={styles.contactItem}>
                <span className={styles.arrow}>→</span> hello@aurastudio.co
              </p>
              <p className={styles.contactItem}>
                <span className={styles.arrow}>→</span> Available globally
              </p>
              <p className={styles.contactItem}>
                <span className={styles.arrow}>→</span> We respond within 24 hours
              </p>
            </div>
          </div>

          {/* Right Column — Form */}
          <div className={styles.formCol}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className={styles.form}
                >
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Name</label>
                    <input 
                      type="text"
                      placeholder="John Doe" 
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Project Type</label>
                    <select className={styles.select} defaultValue="">
                      <option value="" disabled>Select a category</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Message</label>
                    <textarea 
                      placeholder="How can we help you?" 
                      required
                      className={styles.textarea}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Send Message
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={styles.success}
                >
                  <CheckCircle2 className={styles.successIcon} size={48} />
                  <h2 className={styles.successTitle}>Thank you.</h2>
                  <p className={styles.successBody}>
                    We've received your inquiry and will be in touch within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className={styles.submitBtn}
                    style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', marginTop: '32px' }}
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
