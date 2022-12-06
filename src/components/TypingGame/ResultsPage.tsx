import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import ResultsContext from "../../context/ResultsContext";
import RestartButton from "./RestartButton";
import Results from "./Results";
import "./ResultsPage.css";
import { calculateAccuracyPercentage } from "./utils/helpers";

const ResultsPage = () => {
  const { results } = useContext(ResultsContext);
  console.log(results);

  if (results) {
    return (
      <div className="ResultsPage">
        ResultsPage works
        <Results
          state={"finish"}
          errors={results.errors}
          accuracyPercentage={calculateAccuracyPercentage(
            results.errors,
            results.total
          )}
          total={results.total}
        />
        <Link to="/typing-page">
          <button>Im a button</button>
        </Link>
      </div>
    );
  } else {
    return <Navigate to="/typing-page" />;
  }
};

export default ResultsPage;
