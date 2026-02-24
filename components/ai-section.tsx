"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Cloud, Sparkles, BrainCircuit } from "lucide-react";

const aiSkills = [
  {
    title: "SAP Certified Generative AI",
    description: "Certified in enterprise-ready Generative AI development by SAP.",
    icon: <Cloud className="w-8 h-8" />,
  },
  {
    title: "Gemini API Integration",
    description: "Production integrations with safe prompts, fallbacks, and strict error handling.",
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    title: "Intelligent Workflows",
    description: "Designing AI-backed workflows with validation, guardrails, and automation.",
    icon: <BrainCircuit className="w-8 h-8" />,
  },
];

export function AISection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 border-t border-border relative overflow-hidden">
      {/* Subtle animated waveform behind cards */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center gap-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-foreground rounded-full"
            animate={{ height: ["10px", "100px", "10px"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Very faint moving grid */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">/ Capabilities</h2>
            <h3 className="text-5xl font-serif italic mb-8">Applied AI for Production</h3>
            <p className="text-xl font-light text-muted-foreground leading-relaxed mb-8">
              I treat AI as product infrastructure, not a demo feature. My focus is building systems that combine model capability with strong validation, predictable behavior, and measurable business outcomes.
            </p>
          </div>
          
          <div ref={ref} className="grid gap-6">
            {aiSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -5 }}
                className="group relative p-8 border-thin border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-foreground/50 dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <div className="flex items-start gap-6">
                  <div className="text-foreground/80 group-hover:text-foreground transition-colors">{skill.icon}</div>
                  <div>
                    <h4 className="font-mono text-lg mb-2">{skill.title}</h4>
                    <p className="text-muted-foreground font-light">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
