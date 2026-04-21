"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./TestimonialSlider.module.css";
import { siteConfig } from "@/lib/config";

export default function TestimonialSlider() {
  const testimonials = [
    {
      id: 1,
      quote: `${siteConfig.shortName} transformed our penthouse into a living artwork. Every detail whispers intention.`,
      author: "ISABELLA M., PARIS"
    },
    {
      id: 2,
      quote: "Working with this studio was unlike anything we'd experienced. The space now tells our story.",
      author: "JAMES R., DUBAI"
    },
    {
      id: 3,
      quote: "Flawless execution, extraordinary vision. Our hotel lobby stopped guests in their tracks.",
      author: "SOFIA V., MILAN"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={styles.section}>
      <div 
        className={styles.container}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={styles.quoteMark}>"</div>

        <div className={styles.sliderContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className={styles.testimonialContent}
            >
              <p className={styles.quoteText}>{testimonials[currentIndex].quote}</p>
              <p className={styles.author}>{testimonials[currentIndex].author}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.controls}>
          <div className={styles.navButtons}>
            <button onClick={prev} className={styles.navButton} aria-label="Previous Testimonial">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className={styles.navButton} aria-label="Next Testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
