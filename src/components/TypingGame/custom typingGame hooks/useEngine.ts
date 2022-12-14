import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import ResultsContext from "../../../context/ResultsContext";
import Article from "../../../models/Article";
import { countErrors } from "../utils/helpers";
import useCountdown from "./useCountdown";
import useTypings from "./useTypings";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";

const COUNTDOWN_SECONDS = 60;

//* takes an array of 'Article' as input
const useEngine = (articles: Article[]) => {
  const { setResults } = useContext(ResultsContext);
  const { addGameResults } = useContext(AuthContext);
  const navigate = useNavigate();

  //* 'state' used to keep track of the current state of the game
  const [state, setState] = useState<State>("start");
  //* 'errors used to keep track of number of errors made by the user while typing
  const [errors, setErrors] = useState(0);

  //* 'useCountdown()' hook to create a 'timeLeft' state variable to keep track of time remaining. 'startCountdown' function to start timer.
  const { timeLeft, startCountdown } = useCountdown(COUNTDOWN_SECONDS);
  //* 'useWords' and 'useTypings' hooks to create content to be used in the 'words', 'updateWords', 'attemptedArticles', 'cursor', 'typed, 'clearTyped' and 'totalTyped' state variables that are used to provide the text for the user to type, keep track of the users progress, and manage user input.
  const { words, updateWords, attemptedArticles } = useWords(articles);
  const { cursor, typed, clearTyped, totalTyped } = useTypings(
    state !== "finish",
    articles
  );

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  //* keeps track and provides a total of errors the user typed by comparing 'typed' text to the text they're supposed to type 'wordsReached'
  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    //* 'countErrors()' returns the number of errors and adds it to the current value of 'errors' state varaiable using 'setErrors()' function which updates the 'errors' state variable with the total number of errors made by the user.
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  //* as soon the user starts typing the first letter, we start
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  //* when the time is up, we've finished
  useEffect(() => {
    //* if no time is left, game is set to "finish", and 'sumErrors' function is called to updated the total number of errors.
    if (!timeLeft && state === "run") {
      sumErrors();
      setState("finish");
    }
    //* if the state is set to "finish" charactersPerMinute, accuracy, and adjustedCharactersPerMinute are calclulated. YAY MATH!
    if (state === "finish") {
      const charactersPerMinute = (
        errors: number,
        totalTyped: number,
        time: number
      ): number => {
        const charactersPerMinute = (time / 60) * totalTyped;
        const accuracy = (totalTyped - errors) / totalTyped;
        const adjustedCharactersPerMinute = Math.floor(
          charactersPerMinute * accuracy
        );
        return adjustedCharactersPerMinute;
      };
      //* 'setResults' is called to update 'results'
      setResults({
        errors: errors,
        total: totalTyped,
        article: attemptedArticles,
      });
      //* 'insertUserScore' is called to save the users score to their account in the database
      addGameResults(
        errors,
        totalTyped,
        charactersPerMinute(errors, totalTyped, COUNTDOWN_SECONDS)
      );
      console.log(errors, totalTyped);
      //* 'navigate' is called to automatically navigate the user to the "/results" route
      navigate("/results");
    }
  }, [
    timeLeft,
    state,
    sumErrors,
    addGameResults,
    attemptedArticles,
    errors,
    navigate,
    setResults,
    totalTyped,
  ]);

  /**
   * when the current words are all filled up,
   * we generate and show another set of words
   */
  //* effect is only triggered when one of these values change
  useEffect(() => {
    if (areWordsFinished) {
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
