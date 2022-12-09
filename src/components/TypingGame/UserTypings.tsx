import Caret from "./Caret";
import Character from "./Character";
import "./UserTypings.css";
interface Props {
  userInput: string;
  words: string;
}

const UserTypings = ({ userInput, words }: Props) => {
  const typedCharacters = userInput.split("");

  return (
    <div className="UserTypings">
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
