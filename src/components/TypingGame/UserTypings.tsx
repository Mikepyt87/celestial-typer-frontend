import Caret from "./Caret";
import Character from "./Character";

const UserTypings = ({
  userInput,
  className,
}: {
  userInput: string;
  className?: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => (
        <Character key={`${char}_${index}`} char={char} />
      ))}
      <Caret />
    </div>
  );
};

export default UserTypings;
