"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

function BlogCard({
  post,
  index,
  isInView,
}: {
  post: (typeof blogPosts)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -8 }}
      className="blog-card group relative flex flex-col p-8 border-thin border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-foreground/50 dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
    >
      {/* Top row: date + read time */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            {post.date}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-xl font-serif italic mb-4 leading-snug group-hover:text-foreground transition-colors">
        {post.title}
      </h4>

      {/* Excerpt */}
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8 flex-1">
        {post.excerpt}
      </p>

      {/* Bottom row: tags + arrow */}
      <div className="flex items-end justify-between mt-auto">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted border-thin border-border px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="relative overflow-hidden w-8 h-8 flex items-center justify-center shrink-0">
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>

      {/* Animated bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-foreground"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.a>
  );
}

export function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-24 px-6 border-t border-border relative">
      {/* Faint diagonal lines texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-8"
        >
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              / Blog
            </h2>
            <h3 className="text-5xl font-serif italic">Latest Dispatches</h3>
          </div>
          <p className="max-w-md text-muted-foreground font-light leading-relaxed">
            Thoughts on building production systems, shipping AI features, and
            engineering lessons from the trenches.
          </p>
        </motion.div>

        {/* Blog grid */}
        <div
          ref={ref}
          className="blog-container grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
