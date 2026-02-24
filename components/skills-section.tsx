"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

const skills = [
  { name: "Node.js", details: "Async Programming - REST APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", projects: ["LoopIn", "Battle Arena"] },
  { name: "Express.js", details: "Middleware - Routing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", projects: ["Flux Forms", "Battle Arena"] },
  { name: "MongoDB", details: "Schema Design - Indexing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", projects: ["Battle Arena"] },
  { name: "TypeScript", details: "Strict typing - Scalable architecture", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", projects: ["General"] },
  { name: "React.js", details: "Component-driven UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", projects: ["LoopIn", "Flux Forms"] },
  { name: "PostgreSQL", details: "Relational data - SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", projects: ["Flux Forms"] },
  { name: "Firebase", details: "WebSockets - Real-time", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg", projects: ["LoopIn"] },
  { name: "Docker", details: "Containerization", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", projects: ["Flux Forms"] },
  { name: "C++", details: "High performance - Systems", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", projects: ["General"] },
  { name: "C#", details: ".NET Framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", projects: ["General"] },
  { name: "Git", details: "Version Control - CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", projects: ["General"] },
  { name: "JWT & RBAC", details: "Authentication - Security", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg", projects: ["LoopIn", "Battle Arena"] },
];

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.getElementsByClassName("skill-card");
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section id="stack" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-16 text-center">
          / Technical Toolkit
        </h2>
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="skills-container group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          {skills.map((skill, index) => {
            const isExpanded = expandedSkill === skill.name;
            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                className={`skill-card group/card relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-300 flex flex-col justify-start cursor-pointer ${isExpanded ? "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2" : "min-h-[200px]"}`}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl" xmlns="http://www.w3.org/2000/svg">
                  <motion.rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="16"
                    ry="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground/10 dark:text-foreground/20"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.1 + 0.2, ease: "easeInOut" }}
                  />
                </svg>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <motion.div
                      layout="position"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
                      className="h-10 w-10 relative"
                    >
                      <Image src={skill.icon} alt={skill.name} fill className="object-contain toolkit-logo" unoptimized />
                    </motion.div>
                    <motion.div layout="position" className="text-muted-foreground">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </motion.div>
                  </div>

                  <motion.div layout="position" className="mt-auto">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 + 0.4 }}
                      className="font-mono transition-all duration-300 group-hover/card:font-medium text-foreground text-xl mb-2"
                    >
                      {skill.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 + 0.5 }}
                      className="font-light text-muted-foreground transition-all duration-300 text-sm"
                    >
                      {skill.details}
                    </motion.p>
                  </motion.div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-border/50 pt-6"
                      >
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                          Applied In
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skill.projects.map((project) => (
                            <span key={project} className="bg-muted border-thin border-border px-3 py-1.5 text-xs font-mono rounded-sm">
                              {project}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
