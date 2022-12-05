import "./TypingMainPage.css";
import { useEffect, useState } from "react";
import Article from "../../models/Article";
import { getAllArticles } from "../../services/spaceFlightApiService";
import GeneratedWords from "./GeneratedWords";
import CountdownTimer from "./CountdownTimer";
import RestartButton from "./RestartButton";
import Results from "./Results";
import UserTypings from "./UserTypings";
import { faker } from "@faker-js/faker";
import { motion } from "framer-motion";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";

// const words = faker.random.words(10);

// const randomArticle = (articles: Article[]): string => {
//   // let article: Article[] = [];
//   let randomIndex: number = Math.floor(Math.random() * articles.length);
//   // article.push(articles[randomIndex]);

//   return articles[randomIndex].summary;
// };

// TODO:
// 1. create function that pulls 100 random articles from API Endpoint.✓
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

const TypingMainPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getAllArticles().then((res) => setArticles(randomArticles(res)));
    console.log(articles);
  }, []);

  const { words, typed, timeLeft, errors, state, totalTyped } =
    useEngine(articles);

  // once articles load, page is rendered
  if (articles) {
    return (
      <>
        <div className="TypingMainPage">
          {/* elements from video */}
          <CountdownTimer timeLeft={timeLeft} />
          {/* <WordsContainer/> */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div
              // class: "position: relative, max-width: 576px;, add margin to top,
              // font-size: 30px; line-height: 36px;, line-height: 1.625;, adds line
              // breaks whenever necessary, without trying to preserve whole words"
              className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all"
            >
              <GeneratedWords key={words} words={words} />
              <UserTypings
                // class: "position: absolute, top: 0px; right: 0px; bottom: 0px; left: 0px;"
                className="absolute inset-0"
                words={words}
                userInput={typed}
              />
            </div>
            {/* <RestartButton
              // class: "auto center container, add margin to top, color: rgb(100 116 139);"
              className={"mx-auto mt-10 text-slate-500"}
              onRestart={restart}
            /> */}
          </motion.div>
          {/* <Results
            // class: "add margin to top"
            className="mt-10"
            state={state}
            errors={errors}
            accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
            total={totalTyped}
          /> */}
        </div>
      </>
    );
    // while waiting, page renders loading div
    // class can be altered in index.css
  } else {
    return <div className="loading">loading...</div>;
  }
};

export default TypingMainPage;
