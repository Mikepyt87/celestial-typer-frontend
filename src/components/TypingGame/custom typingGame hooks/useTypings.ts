import { useCallback, useEffect, useRef, useState } from "react";
import Article from "../../../models/Article";
import { isKeyboardCodeAllowed } from "../utils/helpers";

const useTypings = (enabled: boolean, articles: Article[]) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState<string>("");
  const totalTyped = useRef(0);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }
      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setCursor((cursor) => cursor - 1);
          totalTyped.current -= 1;
          break;
        default:
          setTyped((prev) => prev.concat(key));
          setCursor((cursor) => cursor + 1);
          totalTyped.current += 1;
      }
    },
    [enabled]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  // attach the keydown event listener to record keystrokes
  useEffect(() => {
    if (articles[0]) {
      window.addEventListener("keydown", keydownHandler);
    }

    // Remove event listeners on cleanup
    // return () => {
    //   window.removeEventListener("keydown", keydownHandler);
    // };
  }, [keydownHandler, articles]);

  return {
    typed,
    cursor,
    clearTyped,
    totalTyped: totalTyped.current,
  };
};

export default useTypings;
