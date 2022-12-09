import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Account from "../models/Account";
import { getallUsersScores } from "../services/AccountApiService";
import Leaderboard from "./Leaderboard";
import "./LeaderboardPage.css";

const LeaderboardPage = () => {
  const { account } = useContext(AuthContext);
  const [allUserScores, setAllUserScores] = useState<Account[]>([]);
  const sortScores = (array: Account[]) => {
    if (array[0]) {
      array.sort((a, b) => {
        const scoreA =
          a.scores[a.scores.length - 1].adjustedCharactersPerMinute;
        const scoreB =
          b.scores[b.scores.length - 1].adjustedCharactersPerMinute;
        if (scoreA > scoreB) {
          return -1;
        }
        if (scoreA < scoreB) {
          return 1;
        }
        return 0;
      });
    }
  };
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
      <Leaderboard topScores={allUserScores} />
    </div>
  );
};

export default LeaderboardPage;
