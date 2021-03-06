import React from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "../../contexts/theme-context";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-switch">
      <MdLightMode className="theme-icon" />
      <label htmlFor="theme-switcher" className="theme-label">
        <input
          type="checkbox"
          name="theme-switcher"
          id="theme-switcher"
          className="theme-input"
          checked={theme && theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="theme-slider"></span>
      </label>
      <MdDarkMode className="theme-icon" />
    </div>
  );
};
