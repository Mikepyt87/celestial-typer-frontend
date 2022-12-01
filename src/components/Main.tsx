import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Article from "../models/Article";
import { getAllArticles } from "../services/spaceFlightApiService";
import "./Main.css";

const randomArticles = (articles: Article[]) => {
  let numOfArticles: Article[] = [];
  for (let i = 0; i < 10; i++) {
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

const Main = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    getAllArticles().then((res) => {
      setArticles(randomArticles(res));
    });
  }, []);

  return (
    <div className="Main">
      <Link to="/typing-page">
        <button>Move to typing page</button>
      </Link>
      <div>
        {articles.length > 0 &&
          articles.map((article) => (
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
