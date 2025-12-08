import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import MagneticButton from "./MagneticButton";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/shivaansh27" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/shivanshsharma27" },
  { icon: Mail, label: "Email", href: "mailto:shivanshsharma2704@gmail.com" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <motion.div {...fadeUp(0)}>
          <motion.span
            className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Contact
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            {...fadeUp(0.1)}
          >
            Get In Touch
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
            {...fadeUp(0.2)}
          >
            Currently open for business (and existential conversations). Whether you’ve got a job,
            a joke, or just wanna say “yo”, hit that button!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10"
          >
            <MagneticButton strength={0.2}>
              <motion.a
                href="mailto:shivanshsharma2704@gmail.com"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium text-base relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="relative z-10 flex items-center gap-2.5">
                  <Send className="h-4 w-4" />
                  Say Hello
                </span>

                <span className="absolute inset-0 rounded-full bg-accent blur-xl opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
              </motion.a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-5 mb-16"
          >
            {socialLinks.map((link, index) => (
              <MagneticButton key={link.label} strength={0.4}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-card/60 border border-border/30 transition-all duration-300 hover:border-accent/30 hover:bg-card group"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                </motion.a>
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>

        <motion.footer className="pt-8">
          <motion.p className="text-sm text-muted-foreground" {...fadeUp(0.6)}>
            © 2025 Shivansh Sharma. All rights reserved.
          </motion.p>

          <motion.p className="text-xs text-muted-foreground/60 mt-3 italic" {...fadeUp(0.9)}>
            If you’ve scrolled this far, you might as well hire me 😉
          </motion.p>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
