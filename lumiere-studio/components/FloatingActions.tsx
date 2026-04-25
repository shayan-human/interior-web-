"use client";

import { useState, useEffect } from "react";
import styles from "./FloatingActions.module.css";
import { MessageCircle, Star } from "lucide-react";
import ReviewModal from "./ReviewModal";
import { siteConfig } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAutoPopped, setHasAutoPopped] = useState(false);

  useEffect(() => {
    // Auto popup after 45 seconds if not already opened
    const timer = setTimeout(() => {
      if (!hasAutoPopped && !isModalOpen) {
        setIsModalOpen(true);
        setHasAutoPopped(true);
      }
    }, 45000); // 45 seconds

    return () => clearTimeout(timer);
  }, [hasAutoPopped, isModalOpen]);

  const openWhatsApp = () => {
    window.open(siteConfig.socials.whatsapp, "_blank");
  };

  return (
    <>
      <div className={styles.container}>
        <motion.button
          className={styles.reviewTrigger}
          onClick={() => window.open(siteConfig.reviewLink, "_blank")}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          title="Give us a review"
        >
          <Star size={24} />
        </motion.button>

        <motion.button
          className={styles.whatsappButton}
          onClick={openWhatsApp}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          title="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </motion.button>
      </div>

      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
