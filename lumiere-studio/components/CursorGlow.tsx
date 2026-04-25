"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if the device has a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // We consider hovering over anchors or buttons, or elements with data-cursor-interact
      if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[data-cursor-interact]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isClient || !isPointerFine) return null;

  return (
    <>
      <motion.div
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "var(--gold)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000,
        }}
      />
      <motion.div
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(201,168,76,0.15)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          border: "1px solid var(--gold-muted)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
