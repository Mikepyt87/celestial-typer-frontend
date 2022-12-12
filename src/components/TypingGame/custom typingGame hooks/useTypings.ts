import { useCallback, useEffect, useRef, useState } from "react";
import Article from "../../../models/Article";
import { isKeyboardCodeAllowed } from "../utils/helpers";

//* A function called useTypings that takes two aruments. 'enabled' set as a boolean to track whether the typing function is enabled or not and 'articles' that provides text to the user to type, based off the array of 'Article' objects.
const useTypings = (enabled: boolean, articles: Article[]) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState<string>("");
  const totalTyped = useRef(0);

  //* function that updates 'typed' and 'cursor' state variables based on the key that is pressed. Also updates 'totalTyped' for each character typed (+= 1) or deleted (-= 1)
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
    //* clear "typed" and "cursor" by setting to empty "" and []
    setTyped("");
    setCursor(0);
  }, []);

  //! attach the keydown event listener to record keystrokes
  useEffect(() => {
    //* allows keydown function to be called whenever a key is pressed on the keyboard.
    if (articles[0]) {
      window.addEventListener("keydown", keydownHandler);
    }

    //! Remove event listeners on cleanup
    // return () => {
    //   window.removeEventListener("keydown", keydownHandler);
    // };
  }, [keydownHandler, articles]);

  //* return elements so they can be used and manipulated by parent component.
  return {
    typed,
    cursor,
    clearTyped,
    totalTyped: totalTyped.current,
  };
};

export default useTypings;
