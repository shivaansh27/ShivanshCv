import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypewriterText = ({
  text,
  className = "",
  delay = 0,
  speed = 50,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      let i = 0;

      intervalId = setInterval(() => {
        if (i <= text.length) {
          setDisplayedText(text.slice(0, i));
          i++;
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayedText}

      {/* Cursor */}
      <motion.span
        className="inline-block w-[3px] h-[1em] bg-accent ml-1 align-middle"
        animate={
          done
            ? { opacity: 0 } // fade out when finished
            : { opacity: [1, 0] } // blink while typing
        }
        transition={{
          duration: 0.5,
          repeat: done ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
    </span>
  );
};

export default TypewriterText;
