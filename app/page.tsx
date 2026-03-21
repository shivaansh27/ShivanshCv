"use client";

import { FormEvent, useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SkillsSection } from "@/components/skills-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { AISection } from "@/components/ai-section";
import { TimelineSection } from "@/components/timeline-section";
import { BlogSection } from "@/components/blog-section";
import { MobileNav } from "@/components/mobile-nav";
import { MagneticButton } from "@/components/magnetic-button";
import { ArrowRight, ArrowUp, Github, Linkedin, Check, Download } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence, useMotionValueEvent } from "motion/react";

const FOOTER_LINKS = {
  resume: "https://drive.google.com/file/d/1gPrstZJy3a_6vZmh-06vzifVNf6665Lv/view?usp=sharing",
  colophon: "https://github.com/shivaansh27/portfolio",
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Show scroll-to-top after scrolling past 30%
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowScrollTop(latest > 0.15);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setFormError("Please fill in all fields before submitting your message.");
      setFormSuccess("");
      return;
    }

    setFormError("");
    setFormSuccess("Message drafted successfully. If your mail client did not open, email shivanshsharma2704@gmail.com directly.");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:shivanshsharma2704@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="relative z-10">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-50"
        style={{ scaleX }}
      />
      <div className="grain"></div>
      <div className="grid-pattern fixed inset-0 pointer-events-none"></div>

      <nav className="fixed top-0 w-full z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-mono text-sm tracking-tighter">S.SHARMA / 2026</span>
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <a href="#about" className="relative group hover:text-foreground transition-colors">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all group-hover:w-full"></span>
            </a>
            <a href="#projects" className="relative group hover:text-foreground transition-colors">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all group-hover:w-full"></span>
            </a>
            <a href="#stack" className="relative group hover:text-foreground transition-colors">
              Stack
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all group-hover:w-full"></span>
            </a>
            <a href="#timeline" className="relative group hover:text-foreground transition-colors">
              Timeline
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all group-hover:w-full"></span>
            </a>
            <a href="#blog" className="relative group hover:text-foreground transition-colors">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="relative group hover:text-foreground transition-colors">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all group-hover:w-full"></span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </nav>

      <HeroSection />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="about"
        className="py-24 px-6 border-t border-border bg-background"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">/ Philosophy</h2>
            <p className="text-3xl font-serif italic leading-snug">
              &quot;Great software stays calm under pressure: clear architecture, reliable behavior, and code that remains easy to evolve.&quot;
            </p>
            <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
              <p>I am a full stack web developer who builds complete products end to end, from responsive frontend experiences to robust backend services and databases.</p>
              <p>As an AI enthusiast, I enjoy integrating intelligent features into real-world apps while keeping performance, usability, and maintainability at the center.</p>
            </div>
            {/* Resume Download */}
            <a
              href={FOOTER_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-thin border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border border-thin border-border">
            <div className="bg-background p-10 flex flex-col justify-center items-center text-center">
              <span className="text-5xl font-serif mb-2">05+</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Production Projects</span>
            </div>
            <div className="bg-background p-10 flex flex-col justify-center items-center text-center">
              <span className="text-5xl font-serif mb-2">10+</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Core Technologies</span>
            </div>
            <div className="bg-background p-10 flex flex-col justify-center items-center text-center">
              <span className="text-5xl font-serif mb-2">1k+</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Concurrent Msgs/Sec</span>
            </div>
            <div className="bg-background p-10 flex flex-col justify-center items-center text-center">
              <span className="text-5xl font-serif mb-2">05+</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Open Source PRs</span>
            </div>
          </div>
        </div>
      </motion.section>

      <ProjectsSection />
      <AISection />
      <SkillsSection />
      <TimelineSection />
      <BlogSection />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="contact"
        className="py-24 px-6 border-t border-border bg-background"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-7xl md:text-9xl font-serif italic mb-12">Contact</h2>
            <p className="text-2xl text-muted-foreground font-light mb-12">Open to full stack web development and AI-focused opportunities where I can build impactful, production-ready products.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs uppercase text-muted-foreground w-24">Email</span>
                <a href="mailto:shivanshsharma2704@gmail.com" className="text-xl hover:underline">shivanshsharma2704@gmail.com</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs uppercase text-muted-foreground w-24">Social</span>
                <div className="flex gap-6">
                  <a href="https://github.com/shivaansh27" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors" aria-label="GitHub">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/shivanshsharma27/" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <form className="space-y-12" onSubmit={handleContactSubmit} noValidate>
            <div className="relative group">
              <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-focus-within:text-foreground transition-colors">Name</label>
              <input id="name" name="name" type="text" placeholder="Your Name" required className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-foreground py-4 px-0 text-xl font-light transition-colors outline-none" />
            </div>
            <div className="relative group">
              <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-focus-within:text-foreground transition-colors">Email Address</label>
              <input id="email" name="email" type="email" placeholder="Your Email" required className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-foreground py-4 px-0 text-xl font-light transition-colors outline-none" />
            </div>
            <div className="relative group">
              <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-focus-within:text-foreground transition-colors">Message</label>
              <textarea id="message" name="message" rows={4} placeholder="Hello, I&apos;d like to talk about..." required className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-foreground py-4 px-0 text-xl font-light transition-colors outline-none resize-none"></textarea>
            </div>
            {formError ? (
              <p className="font-mono text-xs uppercase tracking-widest text-red-500">{formError}</p>
            ) : null}
            <AnimatePresence mode="wait">
              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                  <p className="font-mono text-xs uppercase tracking-widest text-green-600 dark:text-green-400">{formSuccess}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <MagneticButton type="submit" className="group relative inline-flex items-center gap-4 border-thin border-foreground px-10 py-5 overflow-hidden transition-all hover:bg-foreground hover:text-background hover:scale-[1.03] active:scale-95">
              <span className="font-mono text-xs uppercase tracking-[0.2em] relative z-10">Transmit Message</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </form>
        </div>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-20 px-6 border-t border-border bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              (C) 2026 SHIVANSH SHARMA. ENGINEERED IN INDIA.
            </p>
            <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <a href="#about" className="hover:text-foreground transition-colors">Top</a>
              <a href={FOOTER_LINKS.resume} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Resume</a>
              <a href={FOOTER_LINKS.colophon} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Colophon</a>
            </div>
          </div>
        </div>
      </motion.footer>

      <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
        <div className="flex gap-6 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="[writing-mode:vertical-rl] rotate-180">LAT: 31.2558 DEG N</span>
        </div>
      </div>
      {/* #2 fix: hide badge on mobile */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="bg-background border-thin border-border px-4 py-2 flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-mono text-[10px] uppercase tracking-widest">Available for Hire</span>
        </div>
      </div>

      {/* #9: Scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-20 md:right-6 z-40 p-3 bg-foreground text-background border-thin border-foreground hover:bg-background hover:text-foreground transition-all active:scale-90"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
