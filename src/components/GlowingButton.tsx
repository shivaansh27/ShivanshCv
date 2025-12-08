import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

interface GlowingButtonProps extends ComponentProps<typeof Button> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const GlowingButton = ({
  children,
  className,
  variant = "default",
  size = "lg",
  asChild,
  ...props
}: GlowingButtonProps) => {
  const isDefault = variant === "default";

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={cn(
          "absolute inset-0 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          isDefault ? "bg-accent/50" : "bg-accent/30"
        )}
      />

      <Button
        variant={variant}
        size={size}
        asChild={asChild}
        className={cn(
          "relative z-10 transition-all duration-300",
          isDefault && "shadow-lg shadow-accent/25 hover:shadow-accent/40",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default GlowingButton;
