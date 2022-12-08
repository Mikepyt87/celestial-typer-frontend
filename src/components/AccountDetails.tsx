import { useContext, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getUserData } from "../services/AccountApiService";
import "./AccountDetails.css";

const AccountDetails = () => {
  const { account, setAccount } = useContext(AuthContext);

  const uid: string | undefined = useParams().uid;

  useEffect(() => {
    getUserData(uid!).then((res) => setAccount(res));
  }, []);

  if (account!.uid! === uid) {
    return (
      <div className="AccountDetails">
        <Link to="/">
          <button>Return Home</button>
        </Link>
        <p>Username: {account?.userName}</p>
        <p>Scores:</p>
        <ul>
          {account?.scores.map((score, index) => (
            <li key={index}>
              <p>
                {score.errors} Errors, {score.total} Keystrokes,{" "}
                {score.adjustedCharactersPerMinute}cpm
              </p>
            </li>
          ))}
        </ul>
        <p>Favorited Articles:</p>
        <ul>
          {account?.favoritedArticles.map((article, index) => (
            <li key={`${article.id}${index}`}>
              <p>{article.title}</p>
              <img src={article.imageUrl} alt={article.title} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default AccountDetails;
