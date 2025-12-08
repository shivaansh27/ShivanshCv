import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const educationData = [
  {
    icon: GraduationCap,
    degree: "Bachelor of Technology in Computer Science",
    institution: "Lovely Professional University",
    period: "2022 – 2026",
    coursework:
      "Operating Systems, DBMS, Computer Networks, OOP, Web Development",
    skills: ["MERN", "TypeScript", "JavaScript", "MongoDB", "Git", "Cloud Computing"],
  },
  {
    icon: School,
    degree: "Higher Secondary Education (10+2)",
    institution: "Kendriya Vidyalaya",
    period: "2020 – 2022",
    coursework: "PCM with Computer Science",
    skills: ["Basic Programming", "Problem Solving"],
  },
  {
    icon: BookOpen,
    degree: "Secondary Education (10th)",
    institution: "St Francis Convent School",
    period: "2019 - 2020",
    coursework: "General Academics",
    skills: ["Mathematics", "Science"],
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const Education = () => {
  return (
   <section id="education" className="py-24 px-6 relative">
  <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-44 h-44 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />


      <div className="container mx-auto max-w-4xl relative">
        <motion.div {...fadeInUp(0)} className="text-center mb-16">
          <motion.span
            className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Background
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Education
          </h2>

          <p className="text-muted-foreground text-lg">My academic journey</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 via-border to-transparent hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ originY: 0 }}
          />

          {educationData.map((itemData, index) => (
            <motion.div
              key={itemData.degree}
              variants={item}
              className="relative pl-0 md:pl-20 mb-6 last:mb-0"
            >
              <div className="absolute left-[22px] top-6 w-6 h-6 rounded-full bg-accent/20 blur-sm hidden md:block" />

              <motion.div
                className="absolute left-6 top-6 w-4 h-4 rounded-full bg-accent hidden md:block z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
              />

              <motion.div
                className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-border/50 transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-secondary/50 border border-border/30">
                    <itemData.icon className="h-5 w-5 text-accent" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {itemData.degree}
                    </h3>

                    <p className="text-muted-foreground mb-1">
                      {itemData.institution}
                    </p>

                    <p className="text-sm text-muted-foreground/70 mb-3">
                      {itemData.period}
                    </p>

                    <p className="text-sm text-muted-foreground mb-4">
                      {itemData.coursework}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {itemData.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs bg-secondary/50 border-0"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
