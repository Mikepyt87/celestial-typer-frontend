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
import useWindowDimensions from "./custom hooks/useWindowDimensions";

//* slices the top 5 from the 'allUserScores' array.
const topFive = (allUserScores: Account[]): Account[] => {
  return allUserScores.slice(0, 5);
};

//* React component used to display the home page
const Home = () => {
  // will be used for canvas element
  const { width } = useWindowDimensions();
  //* useContext hook to access the 'account' object from 'AuthContext'
  const { account, setAccount } = useContext(AuthContext);

  //* useState that holds an array of ten randomized objects from Space Flight Api endpoint
  const [articles, setArticles] = useState<Article[]>([]);
  //* console.log(articles);
  const [allUserScores, setAllUserScores] = useState<Account[]>([]);

  useEffect(() => {
    setTimeout(() => {
      getAllArticles().then((res) => {
        //* sets articles to ten random 'Article' objects from endpoint (if app is running in mobile, titles will be cut off after 45 characters)
        setArticles(shortenTitles(randomArticles(res, 10), isTouchDevice()));
      });
    }, 800);
    //* calls Space Flight Api service function

    //* array of 'Account' objects sorted by score
    getallUsersScores().then((res) => {
      setAllUserScores(() => {
        sortScores(res);

        return res;
      });
    });
  }, [account]);

  //* updates the users account with a username when 'UsernameForm' is submitted
  const insertAccountname = (username: string) => {
    if (account) {
      const copyOfAccount = { ...account };
      copyOfAccount.userName = username;
      copyOfAccount.initalSetUp = false;
      updateAccountDetails(copyOfAccount).then((res) => setAccount(res));
    }
  };

  //* once articles load, page is rendered

  //* displays only the top 5 users from 'allUserScores' (for canvas element)
  const topFiveScores: Account[] = topFive(allUserScores);

  //* renders a 'Header' and 'Leaderboard' component.
  return (
    <div className="Home">
      <Header />
      {/* {`mobile: ${isTouchDevice()}`} */}
      {/* //* if the users 'account' object has an 'initialSetup' property that is set to true, the 'Home' component also renders a 'UsernameForm' for the user to set */}
      {account?.initalSetUp && (
        <UsernameForm newAccountName={insertAccountname} />
      )}
      <div className="canvas-container">
        <Canvas
          topFiveScores={topFiveScores}
          canvasHeight={400}
          barWidth={92}
        />
      </div>
      <Leaderboard topScores={topFive(allUserScores)} />
      <div className="articles-container">
        {/* if articles array is not empty, map the objects to the page */}

        {/* //* maps over the 'articles' array, rendering a title and image */}
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
