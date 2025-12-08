import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard = ({ children, className = "" }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02, y: -4 }}   // ← clean hover, NO TILT
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{ transformStyle: "flat" }}     // ← IMPORTANT: removes tilt
    >
      {/* Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, hsl(var(--accent) / 0.18), transparent 60%)`,
        }}
      />

      {/* Glow Border Layer */}
      <motion.div
        className="absolute inset-0 z-10 rounded-2xl"
        animate={{ opacity: hovered ? 0.9 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, hsl(var(--accent) / 0.5), transparent 70%)`,
        }}
      />

      {/* MAIN CARD CONTENT (this prevents distortion) */}
      <div className="relative z-30 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/20 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
