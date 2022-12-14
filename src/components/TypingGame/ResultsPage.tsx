import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ResultsContext from "../../context/ResultsContext";
import Account from "../../models/Account";
import Article from "../../models/Article";
import {
  getUserData,
  updateAccountDetails,
} from "../../services/AccountApiService";
import Results from "./Results";
import "./ResultsPage.css";
import { calculateAccuracyPercentage } from "./utils/helpers";

//* functional React component used to display results from the game
const ResultsPage = () => {
  //* accesses data from 'ResultsContext' and 'AuthContext'
  const { results } = useContext(ResultsContext);
  const { account, setAccount, isFav, addFavorite, deleteFavorite } =
    useContext(AuthContext);

  const [accountDetails, setAccountDetails] = useState<Account>();

  useEffect(() => {
    getUserData(account!.uid).then((res) => setAccountDetails(res));
  }, [accountDetails]);

  //* if results has been altered, display results page
  if (results) {
    return (
      <div className="ResultsPage">
        <div className="results-page-header">
          <nav>
            <ul className="results-page-header-list">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/typing-page">
                <li>Typing Page</li>
              </Link>
            </ul>
          </nav>
        </div>
        <Results
          state={"finish"}
          errors={results.errors}
          accuracyPercentage={calculateAccuracyPercentage(
            results.errors,
            results.total
          )}
          total={results.total}
        />
        <div className="results-article-container">
          {results.article.map((article, index) => (
            <div key={`${article.id} ${index}`} className="results-article">
              <div className="results-article-title">{article.title}</div>
              <img src={article.imageUrl} alt={article.title} />
              {!isFav(article.id) ? (
                <button
                  onClick={() => addFavorite(article)}
                  className="favorite-button"
                >
                  Favorite Article
                </button>
              ) : (
                <button
                  onClick={() => deleteFavorite(article.id)}
                  className="favorite-button"
                >
                  Unfavorite Article
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <Navigate to="/typing-page" />;
  }
};

export default ResultsPage;
