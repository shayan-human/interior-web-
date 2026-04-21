"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Navbar.module.css";

import { siteConfig } from "@/lib/config";

const navLinks = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Press", href: "/press" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${
          mobileMenuOpen ? styles.menuOpen : ""
        }`}
      >
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            {siteConfig.shortName}
          </Link>

          {/* Desktop Nav */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href} className={styles.navLink}>
                  {link.name}
                  {isActive && <span className={styles.activeDot} />}
                </Link>
              );
            })}
            <Link href="/contact" className={styles.bookButton}>
              Book a Call &rarr;
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.mobileMenu}
          >
            <div className={styles.mobileNavLinks}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                    {isActive && <span className={styles.activeDot} />}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={styles.mobileBookButton}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Call &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
