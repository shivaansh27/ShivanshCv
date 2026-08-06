"use client";

import { FormEvent, useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SkillsSection } from "@/components/skills-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { AISection } from "@/components/ai-section";
import { TimelineSection } from "@/components/timeline-section";
import { AchievementsSection } from "@/components/achievements-section";
import { BlogSection } from "@/components/blog-section";
import { MobileNav } from "@/components/mobile-nav";
import { MagneticButton } from "@/components/magnetic-button";
import { Magnetic } from "@/components/magnetic";
import { ArrowRight, ArrowUp, Github, Linkedin, Check, Download } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence, useMotionValueEvent } from "motion/react";

const FOOTER_LINKS = {
  resume: "/resume.pdf",
  colophon: "https://github.com/shivaansh27/portfolio",
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Show scroll-to-top after scrolling past 30%
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowScrollTop(latest > 0.15);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setFormError("Please fill in all fields before submitting your message.");
      setFormSuccess("");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // No form backend configured: fall back to opening the visitor's mail client.
    if (!accessKey) {
      setFormError("");
      setFormSuccess("Opening your mail client to send this message. If it didn't open, email shivanshsharma2704@gmail.com directly.");
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:shivanshsharma2704@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio inquiry from ${name}`,
          name,
          email,
          message,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result?.message || "Submission failed");
      }
      setFormSuccess("Message sent. I'll get back to you soon.");
      form.reset();
    } catch {
      setFormError("Something went wrong sending your message. Please email shivanshsharma2704@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative z-10">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      <div className="grain" aria-hidden="true"></div>
      <div className="grid-pattern fixed inset-0 pointer-events-none" aria-hidden="true"></div>

      <nav className="fixed top-0 w-full z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-mono text-sm tracking-tighter">S.SHARMA / 2026</span>
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {["about", "projects", "stack", "timeline", "achievements", "blog", "contact"].map((section) => (
              <Magnetic key={section}>
                <a
                  href={`#${section}`}
                  className={`relative group transition-colors ${
                    activeSection === section ? "text-accent" : "hover:text-foreground"
                  }`}
                >
                  {section}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-accent transition-all ${
                      activeSection === section ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              </Magnetic>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Magnetic>
              <div><ThemeToggle /></div>
            </Magnetic>
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
        className="py-28 px-6 border-t border-border bg-background"
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
              className="inline-flex items-center gap-3 rounded-full border-thin border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent-foreground hover:bg-accent hover:border-accent transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border-thin border-border bg-background p-6 md:p-10 flex flex-col justify-center items-center text-center transition-colors hover:border-accent/50">
              <span className="text-4xl md:text-5xl font-serif mb-2 text-accent">05+</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Production Projects</span>
            </div>
            <div className="rounded-2xl border-thin border-border bg-background p-6 md:p-10 flex flex-col justify-center items-center text-center transition-colors hover:border-accent/50">
              <span className="text-4xl md:text-5xl font-serif mb-2 text-accent">10+</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Core Technologies</span>
            </div>
            <div className="rounded-2xl border-thin border-border bg-background p-6 md:p-10 flex flex-col justify-center items-center text-center transition-colors hover:border-accent/50">
              <span className="text-4xl md:text-5xl font-serif mb-2 text-accent">05+</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Open Source PRs</span>
            </div>
          </div>
        </div>
      </motion.section>

      <ProjectsSection />
      <AISection />
      <SkillsSection />
      <TimelineSection />
      <AchievementsSection />
      <BlogSection />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="contact"
        className="py-28 px-6 border-t border-border bg-background"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-7xl md:text-9xl font-serif italic mb-12">Contact</h2>
            <p className="text-2xl text-muted-foreground font-light mb-12">Open to full stack web development and AI-focused opportunities where I can build impactful, production-ready products.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs uppercase text-muted-foreground w-24">Email</span>
                <a href="mailto:shivanshsharma2704@gmail.com" className="text-xl hover:text-accent transition-colors">shivanshsharma2704@gmail.com</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs uppercase text-muted-foreground w-24">Social</span>
                <div className="flex gap-6">
                  <Magnetic>
                    <a href="https://github.com/shivaansh27" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex p-2 -m-2" aria-label="GitHub">
                      <Github className="w-6 h-6" />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href="https://linkedin.com/in/shivanshsharma27/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex p-2 -m-2" aria-label="LinkedIn">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
          <form className="space-y-12" onSubmit={handleContactSubmit} noValidate>
            <div className="relative group">
              <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-focus-within:text-accent transition-colors">Name</label>
              <input id="name" name="name" type="text" placeholder="Your Name" required className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-accent py-4 px-0 text-xl font-light transition-colors outline-none" />
            </div>
            <div className="relative group">
              <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-focus-within:text-accent transition-colors">Email Address</label>
              <input id="email" name="email" type="email" placeholder="Your Email" required className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-accent py-4 px-0 text-xl font-light transition-colors outline-none" />
            </div>
            <div className="relative group">
              <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-focus-within:text-accent transition-colors">Message</label>
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
                    className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-accent-foreground" />
                  </motion.div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">{formSuccess}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <MagneticButton
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex items-center gap-4 rounded-full bg-accent text-accent-foreground px-10 py-5 overflow-hidden transition-all hover:opacity-90 hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] relative z-10">
                {isSubmitting ? "Sending..." : "Transmit Message"}
              </span>
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
              © 2026 SHIVANSH SHARMA. ENGINEERED IN INDIA.
            </p>
            <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <a href="#about" className="hover:text-accent transition-colors">Top</a>
              <a href={FOOTER_LINKS.resume} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Resume</a>
              <a href={FOOTER_LINKS.colophon} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Colophon</a>
            </div>
          </div>
        </div>
      </motion.footer>

      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="rounded-full bg-background border-thin border-border px-4 py-2 flex items-center gap-3 shadow-sm">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="font-mono text-[10px] uppercase tracking-widest">Available for Hire</span>
        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-20 md:right-6 z-40 p-3 rounded-full bg-accent text-accent-foreground shadow-lg hover:opacity-90 transition-all active:scale-90"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
