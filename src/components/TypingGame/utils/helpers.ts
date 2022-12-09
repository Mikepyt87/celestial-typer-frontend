// accept only letters and whitespaces
export const isKeyboardCodeAllowed = (code: string) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space" ||
    code === "Comma" ||
    code === "Quote" ||
    code === "Period" ||
    code === "Slash" ||
    code === "Backquote" ||
    code === "Minus" ||
    code === "Equal" ||
    code === "Semicolon"
  );
};

export const countErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (
      (actualChar === "-" && expectedChar === "—") ||
      (actualChar === "n" && expectedChar === "ñ") ||
      (actualChar === "u" && expectedChar === "ü") ||
      (actualChar === "u" && expectedChar === "ú") ||
      (actualChar === "o" && expectedChar === "ó") ||
      (actualChar === "i" && expectedChar === "í") ||
      (actualChar === "e" && expectedChar === "é") ||
      (actualChar === "a" && expectedChar === "á") ||
      (actualChar === "'" && expectedChar === "’")
    ) {
    } else if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }

  return 0;
};

export const formatPercentage = (percentage: number) => {
  return `${percentage.toFixed(0)}%`;
};

// export const debug = (str: string) => {
//   if (process.env.NODE_ENV === "development") {
//     console.debug(str);
//   }
// };
