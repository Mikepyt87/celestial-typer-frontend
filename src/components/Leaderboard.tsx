import Account from "../models/Account";
import "./Leaderboard.css";

interface Props {
  topScores: Account[];
}

const Leaderboard = ({ topScores }: Props) => {
  return (
    <div className="Leaderboard">
      <ul>
        {topScores.map((account, index) => (
          <li key={index}>
            {index + 1}: {account.userName}{" "}
            {account.scores[0].adjustedCharactersPerMinute}cpm
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
