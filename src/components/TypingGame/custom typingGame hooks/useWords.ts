import { useCallback, useState } from "react";
import Article from "../../../models/Article";

const useWords = (articles: Article[]) => {
  //*State variable sets Article[] initial value to an empty array `([])`
  const [attemptedArticles, setAttemptedArticles] = useState<Article[]>([]);
  const cachedArticles = (article: Article) => {
    setAttemptedArticles((prev) => [...prev, article]);
  };
  let index: number = 0;

  const [words, setWords] = useState<string>("");

  const updateWords = useCallback(() => {
    //* used to update 'words' state variable with the summary of the current 'Article' object in the 'articles[]'
    if (articles[index]) {
      setWords(articles[index].summary);
      //* also adds current Article' object to the 'attemptedArticles' state variable with the current 'cachedArticles' function.
      cachedArticles(articles[index]);
      //* then increments 'index' variable to move on to the next 'Article' object in the 'articles' array
      index++;
    }
  }, [index, articles]);

  //* return elements so they can be used and manipulated by parent component.
  return { words, updateWords, attemptedArticles };
};

export default useWords;
