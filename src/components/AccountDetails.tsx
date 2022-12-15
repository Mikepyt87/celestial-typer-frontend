import { signOut } from "../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  deleteAccount as eraseAccountData,
  getUserData,
} from "../services/AccountApiService";
import "./AccountDetails.css";
import DoughnutChart from "./DoughnutChart";
import Header from "./Header";
import AccountScores from "./AccountScores";
import SingleArticle from "./SingleArticle";

//* shows the details of a users account.
const AccountDetails = () => {
  //* AuthContext to get the userser account info
  const { account, setAccount } = useContext(AuthContext);
  const [deleteAccountConfirmation, setdeleteAccountConfirmation] =
    useState(false);
  //* useParams hook to get 'uid'
  const uid: string | undefined = useParams().uid;

  useEffect(() => {
    getUserData(uid!).then((res) => setAccount(res));
  }, [setAccount, uid]);

  const deleteAccount = () => {
    eraseAccountData(account!._id!).then((res) => console.log(res));
    signOut();
  };

  //* will only display account details if the 'uid' matches the 'uid' of the user signed in.
  if (account?.uid! === uid) {
    if (account!.scores.length > 0 || account!.favoritedArticles.length > 0) {
      return (
        <div className="AccountDetails">
          <Header />
          <section>
            <button
              onClick={() => setdeleteAccountConfirmation(true)}
              className="delete-account-button"
            >
              Delete Account
            </button>
            {deleteAccountConfirmation && (
              <div className="delete-confirmation">
                <p className="warning">!warning!</p>
                <p className="warning-text">
                  account details can not be recovered!
                </p>{" "}
                <button
                  className="deleting-button"
                  onClick={() => setdeleteAccountConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteAccount();
                  }}
                  className="deleting-button confirm"
                >
                  Confirm Account Deletion
                </button>
              </div>
            )}
            <div className="account-details">
              <h3>Username: {account?.userName}</h3>
              {account!.scores.length > 0 && (
                <>
                  <div className="doughnutChart">
                    <DoughnutChart />
                  </div>
                  <h3>Scores:</h3>
                  <ul className="scores-ul">
                    {account?.scores.map((score, index) => (
                      <AccountScores key={index} score={score} />
                    ))}
                  </ul>
                </>
              )}
              {account!.favoritedArticles.length > 0 && (
                <>
                  <h3>
                    <span className="favorites-arrow">↓</span>Favorited Articles
                    <span className="favorites-arrow">↓</span>
                  </h3>
                  <div className="account-favorited-articles-container">
                    <ul className="account-favorited-articles">
                      {account?.favoritedArticles.map((article) => (
                        <SingleArticle
                          article={article}
                          key={`${article.id}_${article.publishedAt}`}
                        />
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <div className="AccountDetails">
          <Header />
          <h1 style={{ textAlign: "center" }}>
            <span style={{ color: "rgb(239 68 68)" }}>
              Account details empty:
            </span>{" "}
            Play a game or favorite some articles!
          </h1>
        </div>
      );
    }
  }
  //* if the 'uid' does not match or if there is no user signed in, it redirects the user to the home page
  else {
    return <Navigate to="/" />;
  }
};

export default AccountDetails;
