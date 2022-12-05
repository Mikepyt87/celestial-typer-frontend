import Caret from "./Caret";
import Character from "./Character";

interface Props {
  userInput: string;
  words: string;
  className?: string;
}

const UserTypings = ({ userInput, words, className }: Props) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => (
        <Character
          key={`${char}_${index}`}
          actual={char}
          expected={words[index]}
        />
      ))}
      <Caret />
    </div>
  );
};

export default UserTypings;
