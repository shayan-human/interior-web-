"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Instagram, Linkedin, Twitter } from "./BrandIcons";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Navbar.module.css";

import { siteConfig } from "@/lib/config";

const navLinks = [
  { name: "Home", href: "/" },
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
            <div className={styles.navSocials}>
              <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
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
              
              <div className={styles.mobileSocials}>
                <a href={siteConfig.socials.instagram} className={styles.mobileSocialIcon}>
                  <Instagram size={24} />
                </a>
                <a href={siteConfig.socials.linkedin} className={styles.mobileSocialIcon}>
                  <Linkedin size={24} />
                </a>
                <a href={siteConfig.socials.twitter} className={styles.mobileSocialIcon}>
                  <Twitter size={24} />
                </a>
              </div>

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
