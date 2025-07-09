import { useEffect, useState } from "react";

export const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1000px)");
    setIsLargeScreen(mediaQuery.matches);
    const listener = (event: MediaQueryListEvent) => setIsLargeScreen(event.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return isLargeScreen;
};
