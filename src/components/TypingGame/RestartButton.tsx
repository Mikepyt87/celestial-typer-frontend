import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

interface Props {
  onRestart: () => void;
  className?: string;
}

const RestartButton = ({ onRestart: handleRestart, className = "" }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  return (
    <button
      // class: display style, border-radius: 4px, horizontial padding, vertical padding, when hovering: background color
      className={`block rounded px-8 py-2 hover:bg-slate-700/50 ${className}`}
      onClick={handleRestart}
    >
      <MdRefresh
        // class: "width, height"
        className="w-6 h-6"
      />
    </button>
  );
};

export default RestartButton;
