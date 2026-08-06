"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, Code2, GitBranch, Trophy } from "lucide-react";

const achievements = [
  {
    title: "SAP Certified Generative AI Developer",
    issuer: "SAP",
    date: "Feb 2026",
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: "Software Engineering Virtual Experience",
    issuer: "J.P. Morgan",
    date: "Oct 2025",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    title: "Open Source Contributor",
    issuer: "GSSoC'25 & Hacktoberfest",
    date: "Jul 2025",
    icon: <GitBranch className="w-6 h-6" />,
  },
  {
    title: "Top 10 Finish, College Web-A-Thon",
    issuer: "Lovely Professional University",
    date: "SaaS product prototype",
    icon: <Trophy className="w-6 h-6" />,
  },
];

export function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-28 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 text-center">
          / Recognition
        </h2>
        <h3 className="text-5xl font-serif italic mb-16 text-center">Achievements</h3>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="rounded-2xl border-thin border-border bg-background p-6 flex flex-col gap-4 transition-colors hover:border-accent/50"
            >
              <div className="text-accent">{item.icon}</div>
              <div>
                <h4 className="font-mono text-sm leading-snug mb-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.issuer}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
