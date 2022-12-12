import { useCallback, useEffect, useRef, useState } from "react";

//* 'useCountdown' hook to create countdown timer of a specific value in seconds (line 36 && 22 of 'useEngine' hook)
const useCountdown = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  //* indicates whether the timer has reached 0
  const hasTimerEnded = timeLeft <= 0;
  //* indicates whether timer interval is running or not
  const isRunning = intervalRef.current != null;

  //* callback function to start the countdown
  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      //* 'setInterval' method to create countdown interval that updates every second (1000 miliseconds). Function only starts if 'hasTimerEnded' variable is false (has not yet reached 0) and 'isRunning' variable is false (countdown interval is NOT currently running)
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
  }, [setTimeLeft, hasTimerEnded, isRunning]);

  // when the countdown reaches 0, clear the countdown interval
  useEffect(() => {
    if (hasTimerEnded) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }
  }, [hasTimerEnded]);

  //* hook used to create 2 side effects. 1. clear the 'setInterval()' back to its initial value once the timer reaches 0 and 2. clear the interval
  useEffect(() => {
    return () => clearInterval(intervalRef.current!);
  }, []);

  return { timeLeft, startCountdown };
};

export default useCountdown;
