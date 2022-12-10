import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Account from "../models/Account";
import { getallUsersScores } from "../services/AccountApiService";
import Leaderboard from "./Leaderboard";
import "./LeaderboardPage.css";
import { sortScores } from "./utils/functions";

const LeaderboardPage = () => {
  const { account } = useContext(AuthContext);
  const [allUserScores, setAllUserScores] = useState<Account[]>([]);

  useEffect(() => {
    getallUsersScores().then((res) => {
      setAllUserScores(() => {
        sortScores(res);
        return res;
      });
    });
  }, [account]);

  return (
    <div className="LeaderboardPage">
      <div className="leaderboard-page-header">
        <h2 className="leaderboard-h2">Leaderboard</h2>
        <nav>
          <ul className="leaderboard-page-header-list">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/typing-page">
              <li>Typing Page</li>
            </Link>
          </ul>
        </nav>
      </div>
      <Leaderboard topScores={allUserScores} />
    </div>
  );
};

export default LeaderboardPage;
