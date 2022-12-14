import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ResultsContext from "../../context/ResultsContext";
import Account from "../../models/Account";
import { getUserData } from "../../services/AccountApiService";
import Header from "../Header";
import SingleArticle from "../SingleArticle";
import Results from "./Results";
import "./ResultsPage.css";
import { calculateAccuracyPercentage } from "./utils/helpers";

//* functional React component used to display results from the game
const ResultsPage = () => {
  //* accesses data from 'ResultsContext' and 'AuthContext'
  const { results } = useContext(ResultsContext);
  const { account } = useContext(AuthContext);

  const [accountDetails, setAccountDetails] = useState<Account>();

  useEffect(() => {
    getUserData(account!.uid).then((res) => setAccountDetails(res));
  }, [accountDetails, account]);

  //* if results has been altered, display results page
  if (results) {
    return (
      <div className="ResultsPage">
        <Header />
        <Results
          state={"finish"}
          errors={results.errors}
          accuracyPercentage={calculateAccuracyPercentage(
            results.errors,
            results.total
          )}
          total={results.total}
        />
        <p className="articles-header">
          <span className="results-arrow">↓</span>Article Summaries Typed
          <span className="results-arrow">↓</span>
        </p>
        <ul className="results-article-container">
          {results.article.map((article, index) => (
            <SingleArticle key={`${article.id} ${index}`} article={article} />
          ))}
        </ul>
      </div>
    );
  } else {
    return <Navigate to="/typing-page" />;
  }
};

export default ResultsPage;
