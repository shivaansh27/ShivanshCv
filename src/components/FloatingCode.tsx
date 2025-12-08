import { motion } from "framer-motion";
import { useMemo } from "react";

const SNIPPETS = [
  'const dev = "Shivansh";',
  "npm run build",
  "<Component />",
  "git push origin main",
  "async/await",
  "() => {}",
  "useState()",
  "export default",
];

const FloatingCode = () => {
  const positions = useMemo(
    () =>
      SNIPPETS.map((_, index) => ({
        left: `${10 + (index * 12) % 80}%`,
        top: `${15 + (index * 15) % 70}%`,
        delay: index * 1.5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {SNIPPETS.map((snippet, index) => {
        const { left, top, delay } = positions[index];

        return (
          <motion.div
            key={snippet}
            className="absolute font-mono text-xs text-accent/20 whitespace-nowrap"
            style={{ left, top }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.4, 0], y: [20, -20, -40] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          >
            {snippet}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingCode;
