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

const ResultsPage = () => {
  const { results } = useContext(ResultsContext);
  const { account, setAccount } = useContext(AuthContext);

  // console.log(account);

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

  // change later
  const checkForFavorite = (article: Article) => {
    let foundMatch = false;
    for (let i = 0; i < account!.favoritedArticles.length; i++) {
      if (account?.favoritedArticles[i].id === article.id) {
        foundMatch = true;
        console.log(account.favoritedArticles[i]);
      }
    }
    if (foundMatch) {
      console.log("already have");
    } else {
      addFavoriteToAccount(article);
      console.log(article);
      console.log(account?.favoritedArticles);
      console.log("added");
    }
  };

  if (results) {
    return (
      <div className="ResultsPage">
        <Results
          state={"finish"}
          errors={results.errors}
          accuracyPercentage={calculateAccuracyPercentage(
            results.errors,
            results.total
          )}
          total={results.total}
        />
        <div>
          {results.article.map((article, index) => (
            <div key={`${article.id} ${index}`}>
              <div>{article.title}</div>
              <img src={article.imageUrl} alt={article.title} />
              <button onClick={() => checkForFavorite(article)}>
                Favorite
              </button>
            </div>
          ))}
        </div>
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
