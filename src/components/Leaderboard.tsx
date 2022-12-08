import Account from "../models/Account";
import "./Leaderboard.css";

interface Props {
  topScores: Account[];
}

const Leaderboard = ({ topScores }: Props) => {
  return (
    <div className="Leaderboard">
      <h2>TOP SCORES:</h2>
      <ul>
        {topScores.map((account, index) => (
          <li key={index}>
            {index + 1}: {account.userName}{" "}
            {
              account.scores[account.scores.length - 1]
                .adjustedCharactersPerMinute
            }
            cpm
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
