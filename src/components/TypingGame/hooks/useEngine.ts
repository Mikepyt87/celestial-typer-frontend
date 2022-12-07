import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultsContext from "../../../context/ResultsContext";
import Article from "../../../models/Article";
import {
  countErrors,
  // debug
} from "../utils/helpers";
import useCountdown from "./useCountdown";
import useTypings from "./useTypings";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";

const COUNTDOWN_SECONDS = 20;

const useEngine = (articles: Article[]) => {
  const { setResults } = useContext(ResultsContext);
  const navigate = useNavigate();

  const [state, setState] = useState<State>("start");
  const [errors, setErrors] = useState(0);

  const { timeLeft, startCountdown } = useCountdown(COUNTDOWN_SECONDS);
  const { words, updateWords, attemptedArticles } = useWords(articles);
  const { cursor, typed, clearTyped, totalTyped } = useTypings(
    state !== "finish",
    articles
  );

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    // debug(`cursor: ${cursor} - words.length: ${words.length}`);
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  // as soon the user starts typing the first letter, we start
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // when the time is up, we've finished
  useEffect(() => {
    if (!timeLeft && state === "run") {
      sumErrors();
      // debug("time is up...");
      setState("finish");
    }
    if (state === "finish") {
      setResults({
        errors: errors,
        total: totalTyped,
        article: attemptedArticles,
      });
      navigate("/results");
    }
  }, [timeLeft, state, sumErrors]);

  /**
   * when the current words are all filled up,
   * we generate and show another set of words
   */
  useEffect(() => {
    if (areWordsFinished) {
      // debug("words are finished...");
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  return {
    state,
    words,
    typed,
    errors,
    timeLeft,
    totalTyped,
  };
};

export default useEngine;
