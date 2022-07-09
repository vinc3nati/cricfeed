import { useEffect, useLayoutEffect, useState } from "react";
import { preferredColorScheme, THEME_KEY } from "../utils/constants";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem(THEME_KEY) ||
      (matchMedia(preferredColorScheme).matches ? "dark" : "light")
  );

  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  useLayoutEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === "light") {
      document.documentElement.classList.remove("dark-theme");
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark-theme");
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = matchMedia(preferredColorScheme);
    const handleColorSchemeChange = () =>
      setTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleColorSchemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleColorSchemeChange);
  }, []);
  return { theme, toggleTheme };
};
