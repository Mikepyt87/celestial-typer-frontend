import { useContext } from "react";
import { Link } from "react-router-dom";
import ResultsContext from "../../context/ResultsContext";
import RestartButton from "./RestartButton";
import Results from "./Results";
import "./ResultsPage.css";

const ResultsPage = () => {
  const { results } = useContext(ResultsContext);
  console.log(results);

  return (
    <div className="ResultsPage">
      ResultsPage works
      <Results
        state={"finish"}
        errors={results!.errors}
        accuracyPercentage={results!.accuracyPercentage}
        total={results!.total}
      />
      <Link to="/typing-page">
        <button>Im a button</button>
      </Link>
    </div>
  );
};

export default ResultsPage;
