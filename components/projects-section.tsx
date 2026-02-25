"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Github, ExternalLink } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  fullDescription: string;
  githubUrl: string | null;
  liveUrl: string | null;
};

const projects: Project[] = [
  {
    id: "loopin",
    title: "LoopIn - Social Media Chat",
    description: "Real-time chat platform built for high-concurrency communication.",
    image: "/loopin.png",
    tags: ["NODE.JS", "FIREBASE", "NEXT.JS", "POSTGRESQL", "CLOUDINARY"],
    fullDescription: "Engineered a real-time communication backend capable of handling 1000+ concurrent messages with stable low-latency delivery. Implemented token-based authentication, secure API boundaries, and Cloudinary media pipelines. Hardened deployment with production-ready CORS and environment configuration practices.",
    githubUrl: "https://github.com/shivaansh27/LoopIn",
    liveUrl: "https://loopin-five.vercel.app/",
  },
  {
    id: "fluxforms",
    title: "Flux Forms - Dynamic Generator",
    description: "AI-assisted form builder with a modular API architecture.",
    image: "/FluxForm.png",
    tags: ["REACT", "NODE.JS","MONGODB", "GEMINI API"],
    fullDescription: "Designed modular Express.js REST endpoints supporting 15+ dynamic form scenarios. Built server-side validation middleware that reduced invalid submissions by 40%. Integrated Gemini-powered generation with structured fallbacks and robust error handling for dependable UX.",
    githubUrl: "https://github.com/shivaansh27/FluxForm",
    liveUrl: "https://flux-form.vercel.app/",
  },
  {
    id: "battlearena",
    title: "Battle Arena - Tournament Platform",
    description: "Tournament platform powered by secure, performance-focused APIs.",
    image: "/BattleArena.png",
    tags: ["NODE.JS", "EXPRESS", "MONGODB", "REACT"],
    fullDescription: "Built a backend system managing 500+ tournament registrations with JWT authentication and RBAC authorization. Improved read performance through targeted MongoDB indexing with Mongoose. Enforced strict server-side validation to maintain data integrity across registration workflows.",
    githubUrl: "https://github.com/shivaansh27/Battle-Arena",
    liveUrl: "https://battlearena.onrender.com/",
  },
  {
    id: "evalio",
    title: "Evalio - Ai Mock Interview Platform",
    description: " AI-powered mock interview platform that generates personalized interview questions based on a user’s resume and target role",
    image: "/Evalio.png",
    tags: ["NODE.JS", "EXPRESS", "MONGODB", "REACT","JWT","OPENAI","DEEPGRAM"],
    fullDescription: "Evalio is a full-stack mock interview platform that helps job seekers practice technical and behavioral interviews in a structured and realistic way. Users can upload their resume, select a target job role and experience level, and generate personalized interview sessions powered by AI. The platform supports voice-based responses and provides detailed performance reports with question-wise scoring, feedback insights, and interview history tracking. Built using React, Node.js, Express, and MongoDB, Evalio follows a clean Route → Controller → Service architecture with secure JWT-based authentication, Google OAuth integration, file validation, and rate-limited endpoints. The focus was on building a scalable backend, structured workflows, and practical AI integration within a real-world application.",
    githubUrl: "https://github.com/shivaansh27/Evalio",
    liveUrl: "https://evalio-interview.vercel.app/",
  },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onClick={onClick}
      className="min-w-[320px] md:min-w-[500px] snap-start group cursor-pointer relative"
    >
      <div className="aspect-video bg-muted border-thin border-border overflow-hidden mb-6 relative rounded-sm">
        <motion.div
          className="w-full h-full relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover grayscale opacity-50 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ pathLength: 0 }}
            whileHover={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </svg>

        <div className="absolute bottom-6 left-6 flex gap-2" style={{ transform: "translateZ(20px)" }}>
          {project.tags.map((tag) => (
            <span key={tag} className="bg-background/10 backdrop-blur-md border-thin border-border px-3 py-1 text-[10px] font-mono text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.h4
          className="text-2xl font-serif mb-2 transition-transform duration-300 group-hover:-translate-y-1"
        >
          {project.title}
        </motion.h4>
        <p className="text-muted-foreground text-sm font-light mb-4">
          {project.description}
        </p>
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          whileHover={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs font-mono uppercase tracking-widest border-b border-foreground pb-1 inline-block">
            Study Case
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-32 border-t border-border relative z-20">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">/ Work</h2>
          <h3 className="text-5xl font-serif italic">Selected Artifacts</h3>
        </div>
        <div className="hidden md:flex gap-2">
          <button onClick={scrollLeft} className="p-2 border-thin border-border hover:bg-foreground hover:text-background transition-colors active:scale-95">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={scrollRight} className="p-2 border-thin border-border hover:bg-foreground hover:text-background transition-colors active:scale-95">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto px-6 pb-12 hide-scrollbar snap-x snap-mandatory"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="fixed inset-0 md:inset-10 lg:inset-20 z-50 bg-background border-thin border-border overflow-y-auto rounded-xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="relative h-[40vh] md:h-[60vh] w-full">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 bg-background/50 backdrop-blur-md border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 md:p-16 max-w-4xl mx-auto">
                <div className="flex gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="bg-muted border-thin border-border px-3 py-1 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <h2 className="text-4xl md:text-6xl font-serif italic">{selectedProject.title}</h2>
                  <div className="flex gap-4">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border-thin border-border hover:bg-foreground hover:text-background transition-colors font-mono text-xs uppercase tracking-widest"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-foreground text-background border-thin border-foreground hover:bg-background hover:text-foreground transition-colors font-mono text-xs uppercase tracking-widest"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
