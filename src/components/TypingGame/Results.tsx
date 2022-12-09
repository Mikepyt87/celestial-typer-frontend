import { motion } from "framer-motion";
import { State } from "./hooks/useEngine";
import { formatPercentage } from "./utils/helpers";
import "./Results.css";
import { Link } from "react-router-dom";

interface Props {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
}

const Results = ({ state, errors, accuracyPercentage, total }: Props) => {
  if (state !== "finish") {
    return null;
  }

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (
    <motion.ul initial={initial} animate={animate} className="Results">
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="accuracy"
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1 }}
        className="errors"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.4 }}
        className="typed"
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
