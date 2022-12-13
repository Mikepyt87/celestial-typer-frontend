import Caret from "./Caret";
import Character from "./Character";

interface Props {
  userInput: string;
  words: string;
}

//* receives 'userInput' and 'words' Props. 'userInput' represents the text the user has typed so far and 'words' represents the text the user is supposed to type.
const UserTypings = ({ userInput, words }: Props) => {
  //* splits the 'userInput' prop into individual characters
  const typedCharacters = userInput.split("");

  return (
    <div className="UserTypings">
      {/* //* maps over each character */}
      {typedCharacters.map((char, index) => (
        //* rendering a 'Character' component for each one
        <Character
          key={`${char}_${index}`}
          //* 'Character' receives 'actual' and 'expected' props, which represent the character the user typed and the character they were supposed to type
          actual={char}
          //* displays the expected character and it's respective class based on if it matches the 'actual' character.
          expected={words[index]}
        />
      ))}
      <Caret />
    </div>
  );
};

export default UserTypings;
