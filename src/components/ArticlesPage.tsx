import "./ArticlesPage.css";
import { useEffect, useState } from "react";
import replacementImg from "../assets/nasa_logo.jpg";
import { useParams } from "react-router-dom";
import Article from "../models/Article";
import { getSpecificArticle } from "../services/spaceFlightApiService";
import Header from "./Header";

const ArticlesPage = () => {
  const articleId: string | undefined = useParams().articleId;

  const [article, setArticle] = useState<Article[]>();

  useEffect(() => {
    getSpecificArticle(+articleId!).then((res) => setArticle(res));
  }, [articleId]);

  return (
    <>
      <Header />
      <main className="ArticlesPage">
        {article?.map((article) => (
          <section
            key={`${article.id}_${article.publishedAt}`}
            className="articles-page-articles-container"
          >
            <h3 className="article-title">{article.title}</h3>
            <div className="article-details">
              <p className="article-summary">{article.summary}</p>
              <a href={article.url} target="_blank" rel="noreferrer">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="article-image"
                  // if image is not found, then load replacementImg
                  onError={({ currentTarget }) => {
                    currentTarget.src = replacementImg;
                  }}
                  title="Click image to visit article site"
                />
              </a>
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default ArticlesPage;
