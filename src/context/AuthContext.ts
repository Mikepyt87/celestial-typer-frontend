import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/Account";
import Article from "../models/Article";

//* object that is used to store data about a user's auth state
export interface AuthContextModel {
  user: User | null; //* null when not logged in. Stores info about current user
  account: Account | null; //* store info about the users account
  setAccount: (account: Account) => void; //* update value of the 'account' property with a default of an empty function
  addGameResults: (errors: number, totalTyped: number, acpm: number) => void;
  isFav: (id: number) => boolean;
  addFavorite: (article: Article) => void;
  deleteFavorite: (id: number) => void;
}

//* intended to be used with 'useContext' hook and update data about the users auth state
const defaultValue: AuthContextModel = {
  user: null,
  account: null,
  setAccount: () => {},
  addGameResults: () => {},
  isFav: () => false,
  addFavorite: () => {},
  deleteFavorite: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
