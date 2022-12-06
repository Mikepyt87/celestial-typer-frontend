import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";
import Article from "../../../models/Article";

const useWords = (articles: Article[]) => {
  const [attemptedArticles, setAttemptedArticles] = useState<Article[]>([]);
  const cachedArticles = (article: Article) => {
    // setAttemptedArticles((prev)=> [...prev, article]) or
    setAttemptedArticles([...attemptedArticles, article]);
  };
  let index: number = 0;
  if (!index) {
    cachedArticles(articles[0]);
  }
  const [words, setWords] = useState<string>("");

  const updateWords = useCallback(() => {
    if (articles[index]) {
      setWords(articles[index].summary);
      index++;
      cachedArticles(articles[index]);
    }
  }, [articles]);

  return { words, updateWords, attemptedArticles };
};

export default useWords;
