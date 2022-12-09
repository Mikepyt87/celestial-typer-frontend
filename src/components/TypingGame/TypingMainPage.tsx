import "./TypingMainPage.css";
import { useEffect, useState } from "react";
import Article from "../../models/Article";
import { getAllArticles } from "../../services/spaceFlightApiService";
import UserTypings from "./UserTypings";
import { motion } from "framer-motion";
import useEngine from "./hooks/useEngine";
import { checkForMobile } from "../utils/functions";

// Pulls 100 random articles from API Endpoint.
const randomArticles = (articles: Article[]): Article[] => {
  let numOfArticles: Article[] = [];
  for (let i = 0; i < 100; i++) {
    let randomIndex: number = Math.floor(Math.random() * articles.length);
    let foundIndex: number = numOfArticles.findIndex((article) => {
      return article.id === articles[randomIndex].id;
    });
    if (foundIndex === -1) {
      numOfArticles.push(articles[randomIndex]);
    } else {
      i--;
    }
  }
  return numOfArticles;
};

const isAppRunningOnMobile = checkForMobile();

const TypingMainPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  // const [sound] = useSound(audio);

  useEffect(() => {
    getAllArticles().then((res) => setArticles(randomArticles(res)));
    // console.log(articles);
  }, []);

  const { words, typed, timeLeft, errors, state, totalTyped } =
    useEngine(articles);

  // once articles load, page is rendered
  if (articles[0]) {
    return (
      <div className="TypingMainPage">
        <h2 className="CountdownTimer">Time: {timeLeft}</h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="words-container">
            <div className="GeneratedWords">{words}</div>
            <UserTypings words={words} userInput={typed} />
          </div>
        </motion.div>
        {isAppRunningOnMobile && (
          <input
            type="text"
            className="mobile-keyboard"
            name="mobile-keyboard"
          />
        )}
      </div>
    );
    // while waiting, page renders loading div
    // class can be altered in index.css
  } else {
    return <div className="loading">loading...</div>;
  }
};

export default TypingMainPage;
