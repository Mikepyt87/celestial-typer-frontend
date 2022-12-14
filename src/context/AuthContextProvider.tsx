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

  const addFavorite = (article: Article): void => {
    const copyOfAccount = { ...account! };
    const copyOfFavoriteArticles = copyOfAccount.favoritedArticles;
    copyOfFavoriteArticles?.push(article);
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

  const isFav = (idToCheck: number): boolean => {
    return account!.favoritedArticles.some((fav) => fav.id === idToCheck);
  };

  return (
    //* provides account data to child components so the child components can access and update the auth state.
    <AuthContext.Provider
      value={{ user, account, setAccount, addFavorite, deleteFavorite, isFav }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;

//swing the hammer!!

// step one you want to set yp a put in your router object replaceOne as mongo command.
// step one part two: Make a function to make that endponint and thats in your serviec file endpoint
// step two: conditional show(render) a up form within one of our compoents frontend base on the intial setup logic.
// MVP notes creat a go fuck yourself****
//step three; In that form withing that submission on that form you will forms submission call your submission **call James and Andrea , function that we had to make in step one part two.

//THANK YOU
