import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ResultsContextProvider from "./context/ResultsContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResultsContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ResultsContextProvider>
  </React.StrictMode>
);
