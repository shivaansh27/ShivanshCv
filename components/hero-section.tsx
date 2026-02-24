"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";

const codeSnippet = `
function initSystem() {
  const kernel = new Core({
    threads: 16,
    memory: '64GB',
    architecture: 'x86_64'
  });
  
  kernel.boot().then(() => {
    console.log('System online.');
    startServices();
  });
}

class NeuralNet {
  constructor(layers) {
    this.layers = layers;
    this.weights = this.initializeWeights();
  }
  
  forward(inputs) {
    let current = inputs;
    for (const layer of this.layers) {
      current = layer.activate(current, this.weights);
    }
    return current;
  }
}
`;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const name = "SHIVANSH SHARMA";
  const letters = Array.from(name);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden"
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`,
        }}
      />

      {/* Animated Code Texture */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none overflow-hidden flex items-center justify-center"
        initial={{ y: 0 }}
        animate={{ y: "-50%" }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
      >
        <pre className="font-mono text-[10px] leading-relaxed whitespace-pre text-foreground">
          {codeSnippet.repeat(10)}
        </pre>
      </motion.div>

      <motion.div style={{ y, opacity }} className="max-w-5xl w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.3em] mb-8 text-muted-foreground text-center md:text-left"
        >
          Full Stack Web Developer | AI Enthusiast
        </motion.p>

        <div className="relative inline-block mb-12 text-center md:text-left w-full">
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="font-serif text-7xl md:text-[10rem] leading-[0.85] tracking-tighter italic flex flex-wrap justify-center md:justify-start"
          >
            {letters.map((letter, index) => (
              <React.Fragment key={index}>
                {letter === " " ? (
                  <span className="basis-full md:basis-auto">{"\u00A0"}</span>
                ) : (
                  <motion.span variants={child}>{letter}</motion.span>
                )}
              </React.Fragment>
            ))}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-4 left-0 h-[1px] bg-foreground origin-left w-full md:w-auto md:right-0"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-md text-xl md:text-2xl font-light text-muted-foreground leading-relaxed"
          >
            I build modern <span className="text-foreground italic">full stack web applications</span> with scalable APIs, polished user experiences, and practical <span className="text-foreground italic">AI-powered features</span>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          >
            <a href="#projects" className="border-thin border-foreground px-8 py-4 text-sm font-mono uppercase tracking-widest text-center hover:bg-foreground hover:text-background transition-all active:scale-95">
              View Projects
            </a>
            <a href="#contact" className="bg-foreground text-background px-8 py-4 text-sm font-mono uppercase tracking-widest text-center hover:bg-background hover:text-foreground border-thin border-foreground transition-all active:scale-95">
              Let&apos;s Talk
            </a>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="text-muted-foreground w-6 h-6" />
      </motion.div>
    </section>
  );
}
