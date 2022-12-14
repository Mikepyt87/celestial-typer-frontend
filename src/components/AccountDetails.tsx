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
    return (
      <div className="AccountDetails">
        <Header />
        <section className="account-details">
          <button onClick={() => setdeleteAccountConfirmation(true)}>
            Delete Account
          </button>
          {deleteAccountConfirmation && (
            <div>
              <button
                onClick={() => {
                  deleteAccount();
                }}
              >
                Are you sure?
              </button>
            </div>
          )}
          <h3>Username: {account?.userName}</h3>
          <div className="doughnutChart">
            <DoughnutChart />
          </div>
          <h3>Scores:</h3>
          <ul className="scores-ul">
            {account?.scores.map((score, index) => (
              <AccountScores key={index} score={score} />
            ))}
          </ul>
          <h3>Favorited Articles:</h3>
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
        </section>
      </div>
    );
  }
  //* if the 'uid' does not match or if there is no user signed in, it redirects the user to the home page
  else {
    return <Navigate to="/" />;
  }
};

export default AccountDetails;
