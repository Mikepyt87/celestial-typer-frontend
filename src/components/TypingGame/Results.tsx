import { motion } from "framer-motion";
import { State } from "./custom typingGame hooks/useEngine";
import { formatPercentage } from "./utils/helpers";
import "./Results.css";
import { Link } from "react-router-dom";

interface Props {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
}

//* displays the typing test results when test is finished. Determines whether test is finished or not
const Results = ({ state, errors, accuracyPercentage, total }: Props) => {
  //* if the state is finished, results will render null (nothing)
  if (state !== "finish") {
    return null;
  }

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  //* ...otherwise it will animate and display the number of errors, accuracy percentage, and total number or chars typed.
  return (
    <motion.ul initial={initial} animate={animate} className="Results">
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3 }} //! controls the duration and delay of each animation
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
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 2 }}
        className="typed"
      >
        <Link to="/typing-page">
          <p className="play-again-link">Play again?</p>
        </Link>
      </motion.li>
    </motion.ul>
  );
};

export default Results;
