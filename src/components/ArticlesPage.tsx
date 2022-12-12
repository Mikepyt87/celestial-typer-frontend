import { useEffect, useState } from "react";
import replacementImg from "../assets/nasa_logo.jpg";
import { Link, useParams } from "react-router-dom";
import Article from "../models/Article";
import { getSpecificArticle } from "../services/spaceFlightApiService";
import "./ArticlesPage.css";
import Header from "./Header";

const ArticlesPage = () => {
  const articleId: string | undefined = useParams().articleId;

  const [article, setArticle] = useState<Article[]>();

  useEffect(() => {
    getSpecificArticle(+articleId!).then((res) => setArticle(res));
  }, []);

  return (
    <>
      <Header />
      <main className="ArticlesPage">
        {article?.map((article) => (
          <section key={`${article.id}_${article.publishedAt}`}>
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
            <img
              src={article.imageUrl}
              alt={article.title}
              className="article-image"
              // if image is not found, then load replacementImg
              onError={({ currentTarget }) => {
                currentTarget.src = replacementImg;
              }}
            />
          </section>
        ))}
      </main>
    </>
  );
};

export default ArticlesPage;
