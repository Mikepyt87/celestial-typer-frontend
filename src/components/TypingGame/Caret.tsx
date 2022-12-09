import { motion } from "framer-motion";
import "./Caret.css";

const Caret = () => {
  return (
    <motion.div
      aria-hidden={true}
      className="Caret"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
    />
  );
};

export default Caret;
