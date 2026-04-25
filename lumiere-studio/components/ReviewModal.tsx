"use client";

import styles from "./ReviewModal.module.css";
import { X, Star, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const handleRedirect = () => {
    window.open(siteConfig.reviewLink, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className={styles.modalContent}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <X size={24} />
            </button>

            <div className={styles.redirectContent}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={styles.iconWrapper}
              >
                <Star size={64} fill="#d4af37" color="#d4af37" />
              </motion.div>
              
              <h2 className={styles.title}>Share Your Experience</h2>
              <p className={styles.subtitle}>
                Support Noor Interior by leaving a review on our official Google profile. It only takes a moment!
              </p>
              
              <button 
                onClick={handleRedirect}
                className={styles.submitBtn}
              >
                Continue to Google <ExternalLink size={18} style={{ marginLeft: "10px" }} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

