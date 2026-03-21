"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [hoveredProjectTitle, setHoveredProjectTitle] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      let foundLink = false;
      let foundProject = null;

      while (target && target !== document.body) {
        // Check for links/buttons
        if (
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          target.closest("a") ||
          target.closest("button")
        ) {
          foundLink = true;
        }

        // Check for specific data-cursor attributes
        if (target.dataset.cursor === "project") {
          foundProject = "View";
        }

        target = target.parentElement;
      }

      setIsHoveringLink(foundLink);
      setHoveredProjectTitle(foundProject);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Determine actual state
  const isProject = hoveredProjectTitle !== null;

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center rounded-full mix-blend-difference bg-white transition-all duration-300 ease-out hidden md:flex`}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: "-50%",
        y: "-50%",
        width: isProject ? 80 : isHoveringLink ? 40 : 16,
        height: isProject ? 80 : isHoveringLink ? 40 : 16,
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isProject ? 1 : 0 }}
        className="text-black font-mono text-[10px] uppercase font-bold tracking-widest pointer-events-none"
      >
        {hoveredProjectTitle}
      </motion.span>
    </motion.div>
  );
}
