import { Link, Navigate } from "react-router-dom";
import Account from "../models/Account";
import "./Leaderboard.css";

interface Props {
  topScores: Account[];
}

const Leaderboard = ({ topScores }: Props) => {
  return (
    <Link to="/leaderboard">
      <div className="Leaderboard">
        <h2>TOP SCORES:</h2>

        <ul>
          {topScores.map((account, index) => (
            <li key={index}>
              <p>
                {index + 1}.{" "}
                {account.scores[account.scores.length - 1].userName}{" "}
                {
                  account.scores[account.scores.length - 1]
                    .adjustedCharactersPerMinute
                }
                cpm
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default Leaderboard;
