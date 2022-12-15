import "./Home.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Account from "../models/Account";
import Article from "../models/Article";
import {
  getallUsersScores,
  updateAccountDetails,
} from "../services/AccountApiService";
import { getAllArticles } from "../services/spaceFlightApiService";
import Canvas from "./Canvas";
import Header from "./Header";
import UserTypings from "./TypingGame/UserTypings";
import UsernameForm from "./UsernameForm";
import {
  isTouchDevice,
  randomArticles,
  shortenTitles,
  sortScores,
} from "./utils/functions";
import SingleArticle from "./SingleArticle";

//* React component used to display the home page
const Home = () => {
  //* useContext hook to access the 'account' object from 'AuthContext'
  const { account, setAccount } = useContext(AuthContext);
  const [txtOnScreen, setTxtOnScreen] = useState("");

  //* useState that holds an array of ten randomized objects from Space Flight Api endpoint
  const [articles, setArticles] = useState<Article[]>([]);
  const [allUserScores, setAllUserScores] = useState<Account[]>([]);

  useEffect(() => {
    setTimeout(() => {
      //* calls Space Flight Api service function
      getAllArticles().then((res) => {
        //* sets articles to ten random 'Article' objects from endpoint (if app is running in mobile, titles will be cut off after 45 characters)
        setArticles(shortenTitles(randomArticles(res, 10), isTouchDevice()));
      });
    }, 800);
  }, []);

  useEffect(() => {
    //* array of 'Account' objects sorted by score
    getallUsersScores().then((res) => {
      setAllUserScores(() => {
        sortScores(res);

        return res;
      });
    });
  }, []);

  //* updates the users account with a username when 'UsernameForm' is submitted
  const insertAccountname = (username: string) => {
    if (account) {
      const copyOfAccount = { ...account };
      copyOfAccount.userName = username;
      copyOfAccount.initalSetUp = false;
      updateAccountDetails(copyOfAccount).then((res) => setAccount(res));
    }
  };

  const typeWriterExpectedTxt =
    "Start game to improve your typing performance and maybe one day you will type at the speed of light!"; /* The text */

  // let arrayOfTypedTxt: string[] = [];

  // if (account) {
  // } else {
  //   arrayOfTypedTxt = [
  //     "Start game to improve uypr typing performance and maybedone day you will typreat the speed of light!",
  //     // "Sign in to improve ypur performance and maybefone day you will type at the speed of light!",
  //     // "tign in to improve ypur performance and maybefone day you will type at the speed of light!",
  //   ];
  // }

  useEffect(() => {
    let i = 0;
    const speed = 150; /* The speed/duration of the effect in milliseconds */

    // const getRandomIndex = () =>
    //   Math.floor(Math.random() * arrayOfTypedTxt.length);

    // let typedTxt = arrayOfTypedTxt[getRandomIndex()];
    let typedTxt =
      "Start game to improve uypr typing performance and maybedone day you will typreat the speed of light!";

    const typeWriter = () => {
      // first conditional is for testing purposes
      if (typedTxt.length === typeWriterExpectedTxt.length) {
        if (typeWriterExpectedTxt[i - 3] !== typedTxt[i - 3]) {
          setTimeout(() => {
            setTxtOnScreen(typedTxt.slice(0, i - 2));
            typedTxt = typeWriterExpectedTxt.slice(0, i) + typedTxt.slice(i);
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
                // typedTxt = arrayOfTypedTxt[getRandomIndex()];
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
              <div className="words">{typeWriterExpectedTxt}</div>

              <UserTypings
                words={typeWriterExpectedTxt}
                userInput={txtOnScreen}
              />
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
        <p className="articles-header">
          <span className="browse-arrow">↓</span>Browse Articles
          <span className="browse-arrow">↓</span>
        </p>
        <ul className="articles-container">
          {/* if articles array is not empty, map the objects to the page */}

          {/* //* maps over the 'articles' array, rendering a title and image */}
          {articles.map((article) => (
            <SingleArticle
              key={`${article.id}_${article.publishedAt}`}
              article={article}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
