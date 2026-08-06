"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

const timeline = [
  { year: "Aug 2026", role: "Systems Engineer", company: "TCS", description: "Starting as a Systems Engineer, focused on enterprise systems and software engineering." },
  { year: "Mar 2026 - Jul 2026", role: "Programmer Analyst Trainee", company: "Cognizant", description: "Underwent intensive training in enterprise technologies and software development practices." },
  { year: "2022 - Present", role: "B.Tech Computer Science & Engineering", company: "Lovely Professional University", description: "CGPA: 7.91. Ranked in the Top 10 of a college Web-A-Thon after delivering a SaaS product prototype." },
];

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-24 last:mb-0 pl-12 md:pl-0">
      <motion.div
        className="absolute left-[0px] md:left-1/2 top-2 md:top-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent z-10 -translate-x-1/2 md:-translate-y-1/2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        whileInView={{ boxShadow: "0 0 15px var(--accent)" }}
      />

      <div className={`hidden md:block w-5/12 ${isEven ? "text-right pr-12" : "invisible"}`}>
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2"
            >
              {item.year}
            </motion.div>
            <h4 className="text-2xl font-serif mb-1">{item.role}</h4>
            <h5 className="font-mono text-sm mb-4">{item.company}</h5>
            <p className="text-muted-foreground font-light text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        )}
      </div>

      <div className={`w-full md:w-5/12 ${!isEven ? "md:text-left md:pl-12" : "md:hidden"}`}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2"
          >
            {item.year}
          </motion.div>
          <h4 className="text-2xl font-serif mb-1">{item.role}</h4>
          <h5 className="font-mono text-sm mb-4">{item.company}</h5>
          <p className="text-muted-foreground font-light text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="py-28 px-6 border-t border-border relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-24 text-center">/ Journey</h2>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-accent -translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          {timeline.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
