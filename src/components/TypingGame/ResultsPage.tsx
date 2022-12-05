import { useContext } from "react";
import ResultsContext from "../../context/ResultsContext";
import "./ResultsPage.css";

const ResultsPage = () => {
  const { results } = useContext(ResultsContext);
  console.log(results);

  return <div className="ResultsPage">ResultsPage works</div>;
};

export default ResultsPage;
