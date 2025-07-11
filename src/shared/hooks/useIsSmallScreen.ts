import { useEffect, useState } from "react";

export const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");
    setIsSmallScreen(mediaQuery.matches);
    const listener = (event: MediaQueryListEvent) => setIsSmallScreen(event.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return isSmallScreen;
};
