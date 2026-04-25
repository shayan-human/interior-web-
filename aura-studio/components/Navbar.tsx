'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home', metadata: 'Intro' },
  { href: '/work', label: 'Work', metadata: 'Projects' },
  { href: '/studio', label: 'Studio', metadata: 'About' },
  { href: '/contact', label: 'Contact', metadata: 'Inquiry' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.logo}>
          AURA
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.cta}>
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.menuButton} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <motion.div 
            className={styles.bar} 
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          />
          <motion.div 
            className={styles.bar} 
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.div 
            className={styles.bar} 
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={styles.overlay}
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.overlayContent}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={link.href} 
                    className={styles.overlayItem}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={styles.index}>0{i + 1}</span>
                    <span className={styles.label}>{link.label}</span>
                    <span className={styles.meta}>{link.metadata}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
