import { ReactNode, useEffect, useState } from "react";
import Results from "../models/Results";
import ResultsContext from "./ResultsContext";
// import { User } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import AuthContext from "./AuthContext";

function ResultsContextProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Results | null>(null);
  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
}
export default ResultsContextProvider;

//user is done with the typing challenge
//Timer is up
