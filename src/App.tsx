import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import ResultsPage from "./components/TypingGame/ResultsPage";
import TypingMainPage from "./components/TypingGame/TypingMainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/typing-page" element={<TypingMainPage />} />
          <Route path="/results" element={<ResultsPage />} />
          {/* wildcard */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
