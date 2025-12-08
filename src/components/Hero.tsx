import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import TypewriterText from "./TypewriterText";
import FloatingCode from "./FloatingCode";
import MagneticButton from "./MagneticButton";
import GlowingButton from "./GlowingButton";

const Hero = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
  id="home"
  className="flex flex-col items-center justify-start px-6 pt-32 pb-60 relative overflow-hidden"

>

      <FloatingCode />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
          y: parallaxY,
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(var(--accent) / 0.5), hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.5))",
          filter: "blur(80px)",
          y: parallaxY,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl relative z-10"
        style={{ opacity }}
      >
        <motion.p
          variants={itemVariants}
          className="text-sm uppercase tracking-[0.3em] text-accent mb-6 font-medium"
        >
          Software Engineer
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
        >
          <span className="block mb-2">Hey, I'm</span>
          <span className="relative inline-block">
            <TypewriterText
              text="Shivansh Sharma"
              className="bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
              delay={800}
              speed={80}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          I'm a software engineer based in India. I enjoy building full-stack apps, solving real
          problems, and working with modern web technologies.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton strength={0.3}>
            <GlowingButton asChild variant="default" size="lg" className="gap-2">
              <a
                href="https://github.com/shivaansh27/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </GlowingButton>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <GlowingButton asChild variant="outline" size="lg" className="gap-2">
              <a
                href="https://www.linkedin.com/in/shivanshsharma27"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </GlowingButton>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <GlowingButton asChild variant="outline" size="lg" className="gap-2">
              <a href="mailto:shivanshsharma2704@gmail.com">
                <Mail className="h-5 w-5" />
                E-mail
              </a>
            </GlowingButton>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-10"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
          <ChevronDown className="h-6 w-6 text-muted-foreground relative z-10" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
