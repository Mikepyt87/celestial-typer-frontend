import cn from "classnames";
interface Props {
  actual: string;
  expected: string;
}

const Character = ({ actual, expected }: Props) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhiteSpace,
        // class: "Font color (primary comes from tailwind.config)"
        "text-primary-400": isCorrect && !isWhiteSpace,
        "bg-red-500/50": !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
};

export default Character;
