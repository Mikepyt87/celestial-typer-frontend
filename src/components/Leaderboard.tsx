import { Link, Navigate } from "react-router-dom";
import Account from "../models/Account";
import "./Leaderboard.css";

//* USED ON LINE 98 of Home.tsx
interface Props {
  topScores: Account[];
}

//* a functional React component. Takes in topScores as a Prop
const Leaderboard = ({ topScores }: Props) => {
  return (
    <Link to="/leaderboard">
      <div className="Leaderboard">
        <h2>TOP SCORES:</h2>

        <ul>
          {/* //* maps over 'topScores' array */}
          {topScores.map((account, index) => (
            // * renders a list of li elements with a p element containing the users name and acpm score
            <li key={index}>
              <p>
                {index + 1}.{" "}
                {/* <img
                  src={account.scores[account.scores.length - 1].profilePic}
                  alt={`${
                    account.scores[account.scores.length - 1].userName
                  }'s icon`}
                /> */}
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
