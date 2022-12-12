import { useContext, useEffect, useState } from "react";
import Article from "../models/Article";
import { getAllArticles } from "../services/spaceFlightApiService";
import "./Home.css";
import replacementImg from "../assets/nasa_logo.jpg";
import AuthContext from "../context/AuthContext";
import UsernameForm from "./UsernameForm";
import {
  getallUsersScores,
  updateAccountDetails,
} from "../services/AccountApiService";
import Account from "../models/Account";
import Leaderboard from "./Leaderboard";
import Header from "./Header";
import {
  isTouchDevice,
  randomArticles,
  shortenTitles,
  sortScores,
} from "./utils/functions";
import Canvas from "./Canvas";

const topFive = (allUserScores: Account[]): Account[] => {
  return allUserScores.slice(0, 5);
};

const Home = () => {
  const { account, setAccount } = useContext(AuthContext);
  const [height, setHeight] = useState(0);

  //? useState that holds an array of ten randomized objects from Space Flight Api endpoint
  const [articles, setArticles] = useState<Article[]>([]);
  //? console.log(articles);
  const [allUserScores, setAllUserScores] = useState<Account[]>([]);

  useEffect(() => {
    // calls Space Flight Api service function
    getAllArticles().then((res) => {
      // sets articles to ten random objects from endpoint (if app is running in mobile, titles will be cut off after 45 characters)
      setArticles(shortenTitles(randomArticles(res, 10), isTouchDevice()));
    });
    getallUsersScores().then((res) => {
      setAllUserScores(() => {
        sortScores(res);

        return res;
      });
    });
  }, [account]);

  const insertAccountname = (username: string) => {
    if (account) {
      const copyOfAccount = { ...account };
      copyOfAccount.userName = username;
      copyOfAccount.initalSetUp = false;
      updateAccountDetails(copyOfAccount).then((res) => setAccount(res));
    }
  };

  //? once articles load, page is rendered

  const topFiveScores: Account[] = topFive(allUserScores);

  return (
    <div className="Home">
      <Header />
      {/* {`mobile: ${isTouchDevice()}`} */}
      {account?.initalSetUp && (
        <UsernameForm newAccountName={insertAccountname} />
      )}
      {/* <Canvas topFiveScores={topFiveScores} /> */}
      <Leaderboard topScores={topFive(allUserScores)} />
      <div className="articles-container">
        {/* if articles array is not empty, map the objects to the page */}

        {articles.map((article) => (
          <div key={`${article.id}_${article.publishedAt}`} className="article">
            {/* renders title and image from each object */}
            <p className="article-title">{article.title}</p>
            <img
              src={article.imageUrl}
              alt={article.title}
              className="article-image"
              // if image is not found, then load replacementImg
              onError={({ currentTarget }) => {
                currentTarget.src = replacementImg;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
