import cn from "classnames";
import "./Character.css";
interface Props {
  actual: string;
  expected: string;
}

const Character = ({ actual, expected }: Props) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  // special characters accepted
  const specialCharactersAllowed =
    (actual === "-" && expected === "—") ||
    (actual === "n" && expected === "ñ") ||
    (actual === "u" && expected === "ü") ||
    (actual === "u" && expected === "ú") ||
    (actual === "o" && expected === "ó") ||
    (actual === "i" && expected === "í") ||
    (actual === "e" && expected === "é") ||
    (actual === "a" && expected === "á") ||
    (actual === "'" && expected === "’");

  return (
    <span
      className={cn({
        CharacterError: !isCorrect && !isWhiteSpace,
        CharacterCorrect:
          specialCharactersAllowed || (isCorrect && !isWhiteSpace),
        CharacterErrorSpace: !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
};

export default Character;
