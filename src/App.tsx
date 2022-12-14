import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import AccountDetails from "./components/AccountDetails";
import ArticlesPage from "./components/ArticlesPage";

import Home from "./components/Home";
import LeaderboardPage from "./components/LeaderboardPage";
import ResultsPage from "./components/TypingGame/ResultsPage";
import TypingMainPage from "./components/TypingGame/TypingMainPage";

//* this is our Celestial Typer app!!!
function App() {
  //* don't forget about the Routes!!!
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/typing-page" element={<TypingMainPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/account-details/:uid" element={<AccountDetails />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route
            path="/articlesPage/:articleId"
            element={<ArticlesPage />}
          ></Route>
          {/* wildcard */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
