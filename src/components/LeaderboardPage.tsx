import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Account from "../models/Account";
import { getallUsersScores } from "../services/AccountApiService";
import Header from "./Header";
import Leaderboard from "./Leaderboard";
import "./LeaderboardPage.css";
import { sortScores } from "./utils/functions";

//* react component used to render the Leaderboard page
const LeaderboardPage = () => {
  //* provides currently logged in users account info
  const { account } = useContext(AuthContext);
  const [allUserScores, setAllUserScores] = useState<Account[]>([]);

  useEffect(() => {
    getallUsersScores().then((res) => {
      setAllUserScores(() => {
        //* sorts scores based on their last score
        sortScores(res);
        return res;
      });
    });
  }, [account]);

  // * pass to Leaderboard to be displayed
  return (
    <div className="LeaderboardPage">
      <Header />
      <div className="leaderboard-page-header">
        <h2 className="leaderboard-h2">Leaderboard</h2>
      </div>
      <Leaderboard topScores={allUserScores} />
    </div>
  );
};

export default LeaderboardPage;
