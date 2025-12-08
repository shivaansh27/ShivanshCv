import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn(`404 – Route not found: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-screen items-center justify-center bg-background text-foreground"
    >
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-accent mb-3">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page doesn’t exist — maybe check the URL?
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
