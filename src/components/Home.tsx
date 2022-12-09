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

// returns 10 random articles
// input is the response from the Space Flight Api endpoint
const tenRandomArticles = (articles: Article[]): Article[] => {
  let randomArticles: Article[] = [];
  // loops 10 times
  for (let i = 0; i < 10; i++) {
    let randomIndex: number = Math.floor(Math.random() * articles.length);
    // check to see if tenRandomArticles array already contains the next selected object
    let foundIndex: number = randomArticles.findIndex((article) => {
      return article.id === articles[randomIndex].id;
    });
    if (foundIndex === -1) {
      // if the findIndex method does not return anything, add the object to tenRandomArticles array
      randomArticles.push(articles[randomIndex]);
    } else {
      // if there is a matching object in the array, then loop again
      i--;
    }
  }
  return randomArticles;
};

declare global {
  interface Window {
    mobileAndTabletcheck: any;
    opera: any;
  }
}

const Home = () => {
  const { account, setAccount } = useContext(AuthContext);

  // useState that holds an array of ten randomized objects from Space Flight Api endpoint
  const [articles, setArticles] = useState<Article[]>();
  // console.log(articles);
  const [userData, setUserData] = useState<Account>();

  const [allUserScores, setAllUserScores] = useState<Account[]>([]);

  const sortScores = (array: Account[]) => {
    if (array[0]) {
      array.sort((a, b) => {
        const scoreA =
          a.scores[a.scores.length - 1].adjustedCharactersPerMinute;
        const scoreB =
          b.scores[b.scores.length - 1].adjustedCharactersPerMinute;
        if (scoreA > scoreB) {
          return -1;
        }
        if (scoreA < scoreB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }
  };

  useEffect(() => {
    // calls Space Flight Api service function
    getAllArticles().then((res) => {
      // sets articles to ten random objects
      setArticles(tenRandomArticles(res));
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

  // once articles load, page is rendered
  if (articles) {
    return (
      <div className="Home">
        <Header />
        {account?.initalSetUp && (
          <UsernameForm newAccountName={insertAccountname} />
        )}
        <Leaderboard topScores={allUserScores} />
        <div className="articles-container">
          {/* if articles array is not empty, map the objects to the page */}
          {articles.length > 0 &&
            articles.map((article) => (
              <div
                key={`${article.id}_${article.publishedAt}`}
                className="article"
              >
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
    // while waiting, page renders loading div
    // class can be altered in index.css
  } else {
    return <div className="loading">loading...</div>;
  }
};

export default Home;
