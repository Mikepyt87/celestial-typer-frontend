import { useContext, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getUserData } from "../services/AccountApiService";
import "./AccountDetails.css";

//* shows the details of a users account.
const AccountDetails = () => {
  //* AuthContext to get the userser account info
  const { account, setAccount } = useContext(AuthContext);
  //* useParams hook to get 'uid'
  const uid: string | undefined = useParams().uid;

  useEffect(() => {
    getUserData(uid!).then((res) => setAccount(res));
  }, []);

  //* will only display account details if the 'uid' matches the 'uid' of the user signed in.
  if (account?.uid! === uid) {
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
  }
  //* if the 'uid' does not match or if there is no user signed in, it redirects the user to the home page
  else {
    return <Navigate to="/" />;
  }
};

export default AccountDetails;
