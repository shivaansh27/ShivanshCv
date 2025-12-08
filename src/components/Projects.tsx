import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SpotlightCard from "./SpotlightCard";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const projectsData = [
  {
    title: "LoopIn – Real-Time Social Chat Application",
    description:
      "Built a real-time chat platform supporting 1000+ concurrent message events with smooth UI interactions.",
    tags: ["Next.Js", "Firebase", "Cloudinary", "Vercel"],
    github: "https://github.com/shivaansh27/LoopIn",
    demo: "https://loopin-five.vercel.app/",
    gradient: "from-amber-500/15 to-orange-500/15",
    img: "li.png",
  },
  {
    title: "Flux Forms – Dynamic Form Generator",
    description:
      "FluxForm is an AI-powered platform designed to simplify the creation of forms, surveys, and questionnaires.",
    tags: ["Next.js", "Node.Js", "Python", "Neon"],
    github: "https://github.com/shivaansh27/FluxForm",
    demo: "https://flux-form.vercel.app/",
    gradient: "from-rose-500/15 to-pink-500/15",
    img: "ff.png",
  },
  {
    title: "Battle Arena – Tournament Platform",
    description:
      "Battle Arena allows easy creation, management, and publication of online tournament results.",
    tags: ["React", "Node.js", "Express.Js", "MongoDb"],
    github: "https://github.com/shivaansh27/Battle-Arena",
    demo: "https://battlearena.onrender.com/",
    gradient: "from-emerald-500/15 to-teal-500/15",
    img: "ba.png",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) => {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group h-full"
    >
      <SpotlightCard className="h-full">
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/30 flex flex-col relative h-full">
          
          <div
            className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
          >
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <img src={project.img} alt={project.title} className="h-full w-auto" />
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/80 to-transparent" />
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50 border-0">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="outline" size="sm" className="gap-2 rounded-full">
                  <a href={project.github} target="_blank">
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
              </motion.div>

              {project.demo && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button asChild size="sm" className="gap-2 rounded-full">
                    <a href={project.demo} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

const Projects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateScroll = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateScroll();
    emblaApi.on("select", updateScroll);
    emblaApi.on("reInit", updateScroll);
  }, [emblaApi, updateScroll]);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-widest uppercase block mb-4">
            Portfolio
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>

          <p className="text-muted-foreground text-lg">Some things I've built</p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {projectsData.map((project, i) => (
                <div
                  key={i}
                  className="flex-none w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="w-10 h-10 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="w-10 h-10 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
