import { useContext } from "react";
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
  const { account, setAccount } = useContext(AuthContext);

  console.log(results);

  //* updates user account by adding the 'Article' to the 'favoritedArticles' array in the 'Account' object
  const addFavoriteToAccount = (article: Article) => {
    if (account) {
      const copyOfAccount: Account = { ...account };
      const copyOfFavorites: Article[] = [...copyOfAccount.favoritedArticles];
      copyOfFavorites.push(article);
      copyOfAccount.favoritedArticles = copyOfFavorites;
      updateAccountDetails(copyOfAccount).then((res) => {
        getUserData(account.uid).then((response) => {
          setAccount(response);
        });
      });
    }
  };

  //* Checks if the 'Article' has been added to the 'favoritedArticles' array. If not, the 'addFavoriteToAccount' method is called to add 'Article' to the users account.
  const checkForFavorite = (article: Article) => {
    let foundMatch = false;
    for (let i = 0; i < account!.favoritedArticles.length; i++) {
      if (account?.favoritedArticles[i].id === article.id) {
        foundMatch = true;
        console.log(account.favoritedArticles[i]);
      }
    }
    //* if the 'Article' has been found, do not add it
    if (foundMatch) {
      console.log("already have");
      //*if not, add it
    } else {
      addFavoriteToAccount(article);
      console.log(article);
      console.log(account?.favoritedArticles);
      console.log("added");
    }
  };

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
              <button
                onClick={() => checkForFavorite(article)}
                className="favorite-button"
              >
                Favorite Article
              </button>
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
