import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";
import Article from "../../../models/Article";

const useWords = (articles: Article[]) => {
  let index: number = 0;
  const [words, setWords] = useState<string>("");

  const updateWords = useCallback(() => {
    if (articles[index]) {
      setWords(articles[index].summary);
      index++;
    }
  }, [articles]);

  return { words, updateWords };
};

export default useWords;
