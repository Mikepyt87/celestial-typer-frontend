import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";
import Article from "../../../models/Article";

const useWords = (articles: Article[], index: number) => {
  const [words, setWords] = useState<string>(articles[index].summary);

  const updateWords = useCallback(
    () => {
      setWords(articles[index].summary);
    },
    [
      // not sure what goes here
    ]
  );

  return { words, updateWords };
};

export default useWords;
