import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ResultsContextProvider from "./context/ResultsContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResultsContextProvider>
      <App />
    </ResultsContextProvider>
  </React.StrictMode>
);
