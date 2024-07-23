import React, { createContext, useState, useContext } from "react";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const ThemeContext = createContext();

export const useThemes = () => useContext(ThemeContext);

const baseThemeValues = {
  buttonBackground: "#4A3C93",
  buttonText: "#ffffff",
  headerBackground: "#4A3C93",
  headerText: "#ffffff",
};

const lightThemeValues = {
  background: "#D2C7E7",
  text: "white",
  ...baseThemeValues,
};

const darkThemeValues = {
  background: "#B3A2D0",
  text: "black",
  ...baseThemeValues,
};

export const ThemesProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeValues = theme === "light" ? lightThemeValues : darkThemeValues;

  const navigationTheme = {
    ...((theme === "light" ? DefaultTheme : DarkTheme)),
    colors: {
      ...(theme === "light" ? DefaultTheme.colors : DarkTheme.colors),
      background: themeValues.background,
      text: themeValues.text,
      card: themeValues.buttonBackground,
      border: "transparent",
      primary: themeValues.buttonText,
    },
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, themeValues, navigationTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
