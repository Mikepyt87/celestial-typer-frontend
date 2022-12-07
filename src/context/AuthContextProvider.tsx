import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../firebaseConfig";
import Account from "../models/Account";
import { createNewAccount, getUserData } from "../services/AccountApiService";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
        getUserData(newUser.uid).then((res) => {
          if (res) {
            setAccount(res);
          } else {
            createNewAccount({
              profilePic: newUser.photoURL || "",
              userName: newUser.displayName || "",
              scores: [],
              favoritedArticles: [],
              uid: newUser.uid,
              initalSetUp: true,
            }).then((response) => setAccount(response));
          }

          console.log(res);
        });
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, account, setAccount }}>
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
