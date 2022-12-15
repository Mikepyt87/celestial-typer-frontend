import Score from "../models/Score";

interface Props {
  score: Score;
}

const AccountScores = ({ score }: Props) => {
  return (
    <li>
      <p>
        {score.errors} Errors, {score.total} Keystrokes,{" "}
        {score.adjustedCharactersPerMinute}cpm
      </p>
    </li>
  );
};

export default AccountScores;
