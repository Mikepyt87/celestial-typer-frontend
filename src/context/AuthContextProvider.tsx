import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../firebaseConfig";
import Account from "../models/Account";
import {
  createNewAccount,
  getUserData,
  updateAccountDetails,
} from "../services/AccountApiService";
import Article from "../models/Article";
import Score from "../models/Score";

//* functional React component used to provide data about a users auth stat TO child components.
function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  //* useEffect to only register once at start
  useEffect(() => {
    //* listens for changes to the auth state
    return auth.onAuthStateChanged((newUser) => {
      //* if changed 'user' is set to the newUser obj || null if no user logged in
      if (newUser) {
        setUser(newUser);
        getUserData(newUser.uid).then((res) => {
          if (res) {
            setAccount(res);
          } //* if it's a new is logged in, listener retrieves the users account data
          else {
            createNewAccount({
              profilePic: newUser.photoURL || "",
              userName: newUser.displayName || "",
              scores: [],
              favoritedArticles: [],
              uid: newUser.uid,
              initalSetUp: true,
            }).then((response) => setAccount(response));
          }

          // console.log(res);
        });
      } else {
        setUser(null);
        setAccount(null);
      }
    });
  }, []);

  const addGameResults = (errors: number, totalTyped: number, acpm: number) => {
    //* First checks to verify account exists. if(account exists) then the function creates a copy of the 'account' object and 'scores' array and appends the results to the end of the 'scores' array within the account object.
    if (account) {
      const copyOfAccount: Account = { ...account };
      const copyOfScores: Score[] = [...copyOfAccount.scores];
      copyOfScores.unshift({
        errors: errors,
        total: totalTyped,
        adjustedCharactersPerMinute: acpm,
        userName: account.userName,
        profilePic: account.profilePic,
      });
      copyOfAccount.scores = copyOfScores;
      updateAccountDetails(copyOfAccount).then((res) => {
        getUserData(account.uid).then((response) => {
          setAccount(response);
        });
      });
    }
  };

  const isFav = (idToCheck: number): boolean => {
    return account!.favoritedArticles.some((fav) => fav.id === idToCheck);
  };

  const addFavorite = (article: Article): void => {
    const copyOfAccount = { ...account! };
    const copyOfFavoriteArticles = copyOfAccount.favoritedArticles;
    copyOfFavoriteArticles?.unshift(article);
    copyOfAccount.favoritedArticles = copyOfFavoriteArticles;
    updateAccountDetails(copyOfAccount).then((res) => {
      getUserData(account!.uid).then((response) => {
        setAccount(res);
      });
    });
  };

  const deleteFavorite = (id: number): void => {
    const index: number = account!.favoritedArticles.findIndex(
      (fav) => fav.id === id
    );

    if (index !== -1) {
      const copyOfAccount = { ...account! };
      const copyOfFavoriteArticles = copyOfAccount.favoritedArticles;
      copyOfFavoriteArticles?.splice(index, 1);
      copyOfAccount.favoritedArticles = copyOfFavoriteArticles;
      updateAccountDetails(copyOfAccount).then((res) => {
        getUserData(account!.uid).then((response) => {
          setAccount(res);
        });
      });
    }
  };

  return (
    //* provides account data to child components so the child components can access and update the auth state.
    <AuthContext.Provider
      value={{
        user,
        account,
        setAccount,
        addGameResults,
        isFav,
        addFavorite,
        deleteFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
