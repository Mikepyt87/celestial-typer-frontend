import Account from "../models/Account";
import "./Leaderboard.css";

interface Props {
  topScores: Account[];
}

//* a functional React component. Takes in topScores as a Prop
const Leaderboard = ({ topScores }: Props) => {
  return (
    <div className="Leaderboard">
      <h2>TOP SCORES:</h2>
      <ul>
        {/* //* maps over 'topScores' array */}
        {topScores.map((account, index) => (
          // * renders a list of li elements with a p element containing the users name and acpm score
          <li key={index}>
            <p>
              {index + 1}. {account.scores[account.scores.length - 1].userName}{" "}
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
  );
};

export default Leaderboard;
