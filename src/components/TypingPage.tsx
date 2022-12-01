import { useEffect, useState } from "react";
import Article from "../models/Article";
import { getAllArticles } from "../services/spaceFlightApiService";
import "./TypingPage.css";

const randomArticle = (articles: Article[]) => {
  let article: Article[] = [];
  let randomIndex: number = Math.floor(Math.random() * articles.length);

  article.push(articles[randomIndex]);

  return article;
};

const TypingPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [textInput, setTextInput] = useState("");
  useEffect(() => {
    getAllArticles().then((res) => {
      setArticles(randomArticle(res));
    });
  }, []);

  return (
    <div className="TypingPage">
      {articles.map((article) => (
        <p>{article.summary}</p>
      ))}
      <label htmlFor="text-input"></label>
      <input
        type="text"
        id="text-input"
        name="text-input"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
    </div>
  );
};

export default TypingPage;
