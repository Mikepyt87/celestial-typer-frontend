import "./TypingMainPage.css";
import { useEffect, useState } from "react";
import Article from "../../models/Article";
import { getAllArticles } from "../../services/spaceFlightApiService";
import UserTypings from "./UserTypings";
import { motion } from "framer-motion";
import useEngine from "./custom typingGame hooks/useEngine";
import { isTouchDevice, randomArticles } from "../utils/functions";
import { RingLoader } from "react-spinners";
import Header from "../Header";

const mobileChecker = isTouchDevice();

//* React component that displays the game.
const TypingMainPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getAllArticles().then((res) => setArticles(randomArticles(res, 100)));
    // console.log(articles);
  }, []);

  //* hook to manage the state of the game
  const { words, typed, timeLeft } = useEngine(articles);

  //* once articles load, page is rendered
  if (articles[0]) {
    return (
      <div className="TypingMainPage">
        <Header />
        <main>
          <h2 className="CountdownTimer">Time: {timeLeft}</h2>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="words-container">
              <div className="GeneratedWords">{words}</div>
              <UserTypings words={words} userInput={typed} />
            </div>
          </motion.div>
          {mobileChecker && (
            <input
              type="text"
              className="mobile-keyboard"
              name="mobile-keyboard"
            />
          )}
        </main>
      </div>
    );
    //* while waiting, page renders loading div
    //* class can be altered in index.css
  } else {
    return (
      <div className="loading">
        <p>loading...</p>
        <RingLoader className="loader" color="#f8c62c" />
      </div>
    );
  }
};

export default TypingMainPage;
