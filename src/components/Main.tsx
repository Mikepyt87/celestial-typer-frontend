import { useEffect, useState } from "react";
import Article from "../models/Article";
import { getAllArticles } from "../services/spaceFlightApiService";
import "./Main.css";

const Main = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    getAllArticles().then((res) => {
      setArticles(res);
    });
  }, []);

  const randomArticles = (articles: Article[]) => {
    let numOfArticles: Article[] = [];
    for (let i = 0; i < 10; i++) {
      numOfArticles.push(articles[Math.floor(Math.random() * articles.length)]);
    }
    return numOfArticles;
  };

  const numOfArticles: Article[] = randomArticles(articles);

  return (
    <div className="Main">
      Space
      <div>
        {articles.length > 0 &&
          numOfArticles.map((article) => (
            <div key={`${article.id}${Math.floor(Math.random() * 1000)}`}>
              <p>{article.title}</p>
              <img src={article.imageUrl} alt={article.title} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Main;
