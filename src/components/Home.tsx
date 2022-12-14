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
import { Link } from "react-router-dom";
import { all } from "q";
import UserTypings from "./TypingGame/UserTypings";

//* React component used to display the home page
const Home = () => {
  // will be used for canvas element
  const { width } = useWindowDimensions();
  //* useContext hook to access the 'account' object from 'AuthContext'
  const { account, setAccount } = useContext(AuthContext);
  const [txtOnScreen, setTxtOnScreen] = useState("");

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

  const expectedTxt =
    "Click here to improve your performance and maybe one day you will type at the speed of light!"; /* The text */

  const typedTxtArray = [
    "Click here to improve uypr proformance and mabye one day you will typreat the speed of light!",
    // "Sign in to improve ypur performance and maybefone day you will type at the speed of light!",
    // "tign in to improve ypur performance and maybefone day you will type at the speed of light!",
  ];

  useEffect(() => {
    let i = 0;
    const speed = 150; /* The speed/duration of the effect in milliseconds */

    const getRandomIndex = () =>
      Math.floor(Math.random() * typedTxtArray.length);

    let typedTxt = typedTxtArray[getRandomIndex()];

    const typeWriter = () => {
      // first conditional is for testing purposes
      if (typedTxt.length === expectedTxt.length) {
        if (expectedTxt[i - 3] !== typedTxt[i - 3]) {
          setTimeout(() => {
            setTxtOnScreen(typedTxt.slice(0, i - 2));
            typedTxt = expectedTxt.slice(0, i) + typedTxt.slice(i);
            i = i - 3;
          }, 0);
          setTimeout(typeWriter, speed);
        } else {
          if (i <= typedTxt.length) {
            setTxtOnScreen(typedTxt.slice(0, i));
            i++;
            if (i > typedTxt.length) {
              setTimeout(() => {
                i = 0;
                setTxtOnScreen("");
                setTimeout(typeWriter, speed);
                typedTxt = typedTxtArray[getRandomIndex()];
              }, 1000);
            }
            setTimeout(typeWriter, speed);
          }
        }
      }
    };
    typeWriter();
  }, []);

  //* renders a 'Header' and 'Leaderboard' component.
  return (
    <div className="Home">
      <Header />
      {/* //* if the users 'account' object has an 'initialSetup' property that is set to true, the 'Home' component also renders a 'UsernameForm' for the user to set */}
      {account?.initalSetUp && (
        <UsernameForm newAccountName={insertAccountname} />
      )}
      <div className="canvas-container">
        {allUserScores[0] && (
          <>
            <div className="words-container">
              <div className="words">{expectedTxt}</div>
              <UserTypings words={expectedTxt} userInput={txtOnScreen} />
            </div>
            <Canvas
              allUserScores={allUserScores}
              canvasHeight={400}
              canvasWidth={600}
            />
          </>
        )}
      </div>
      {/* <Leaderboard topScores={topFive(allUserScores)} /> */}
      <section>
        <p className="articles-header">↓Browse Articles↓</p>
        <div className="articles-container">
          {/* if articles array is not empty, map the objects to the page */}

          {/* //* maps over the 'articles' array, rendering a title and image */}
          {articles.map((article) => (
            <Link
              to={`/articlesPage/${article.id}`}
              key={`${article.id}_${article.publishedAt}`}
            >
              <div className="article">
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
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
