import "./TypingMainPage.css";
import { faker } from "@faker-js/faker"; /*2.7M (gzipped: 883k)*/
import { useEffect, useState } from "react";
import Article from "../../models/Article";
import { getAllArticles } from "../../services/spaceFlightApiService";
import GeneratedWords from "./GeneratedWords";
import CountdownTimer from "./CountdownTimer";
import RestartButton from "../RestartButton";
import Results from "./Results";
import UserTypings from "../UserTypings";

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
// 2. hold those articles inside a useState variable.✓

// 3. display first random article summary on page.✓

// 4. declare useState variable that holds all articles that were started for useContext.

// 5. create function that displays the next article from the array of articles.
// 6. display that article on the page.

const TypingMainPage = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 0,
      title: "",
      url: "",
      imageUrl: "",
      newsSite: "",
      summary: "",
      publishedAt: "",
      updatedAt: "",
    },
  ]);
  const [articlesThatHaveBeenStarted, setArticlesThatHaveBeenStarted] =
    useState<Article[]>([]);

  const [index, setIndex] = useState(0);

  // const [summary, setSummary] = useState<String[]>([]);

  useEffect(() => {
    getAllArticles().then((res) => setArticles(randomArticles(res)));
  }, []);

  return (
    // <div className="TypingPage text-4xl text-center text-slate-500">
    //   <p>
    //     {articles.map((article) => (
    //       <div>{article.summary}</div> // maybe split(" ")
    //     ))}
    //   </p>
    //   </div>
    <>
      {/* elements from video */}
      <CountdownTimer timeLeft={30} />
      {/* <WordsContainer/> */}
      <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">
        <GeneratedWords words={articles[index].summary} />
        <UserTypings
          className="absolute inset-0"
          userInput={articles[index].summary}
        />
      </div>
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={() => null}
      />
      <Results
        className="mt-10"
        errors={10}
        accuracyPercentage={100}
        total={200}
      />
    </>
  );
};

export default TypingMainPage;
