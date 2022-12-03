import { motion } from "framer-motion";
import { formatPercentage } from "./utils/helpers";

const Results = ({
  errors,
  accuracyPercentage,
  total,
  className,
}: {
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
}) => {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  return (
    <motion.ul
      // class: "display: flex, flex-direction: column, centers items vertically, Font Size (primary comes from tailwind.config), vertical spacing"
      className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        // class: "font-size: 20px; line-height: 28px;, font-weight: 600"
        className="text-xl font-semibold"
        transition={{ ...duration, delay: 0.5 }}
      >
        Results
      </motion.li>

      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        // class: "color: rgb(239 68 68);"
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.4 }}
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
