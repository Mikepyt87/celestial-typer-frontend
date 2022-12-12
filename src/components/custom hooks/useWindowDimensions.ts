import { useState, useEffect } from "react";

//* returns the current width and height of user's window
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  //* useState hook
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  //* useEffect hook
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    //* updates state when window is resized
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
