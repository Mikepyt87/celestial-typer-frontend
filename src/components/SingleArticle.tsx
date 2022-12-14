import { Link } from "react-router-dom";
import Article from "../models/Article";
import "./SingleArticle.css";
import replacementImg from "../assets/nasa_logo.jpg";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface Props {
  article: Article;
}

const SingleArticle = ({ article }: Props) => {
  const { account, isFav, addFavorite, deleteFavorite } =
    useContext(AuthContext);

  return (
    <>
      <li className="article">
        {/* renders title and image from each object */}
        <p className="article-title">{article.title}</p>
        <Link to={`/articlesPage/${article.id}`}>
          <img
            src={article.imageUrl}
            alt={article.title}
            className="article-image"
            // if image is not found, then load replacementImg
            onError={({ currentTarget }) => {
              currentTarget.src = replacementImg;
            }}
          />
        </Link>
        {!isFav(article.id) ? (
          <button
            onClick={() => addFavorite(article)}
            className="favorite-button"
          >
            Favorite Article
          </button>
        ) : (
          <button
            onClick={() => deleteFavorite(article.id)}
            className="favorite-button"
          >
            Unfavorite Article
          </button>
        )}
      </li>
    </>
  );
};

export default SingleArticle;
