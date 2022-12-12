// import { User } from "firebase/auth";
import { createContext } from "react";
import Results from "../models/Results";

export interface ResultsContextModel {
  results: Results | null; // null when not logged in
  setResults: (results: Results) => void;
}
const defaultValue: ResultsContextModel = {
  results: null,
  setResults: () => {},
};
//* object that stores data about the results of the game
const ResultsContext = createContext(defaultValue);
export default ResultsContext;
