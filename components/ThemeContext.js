import React, { createContext, useState, useContext } from "react";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import stylesHelper from "../styles/stylesHelper";

const ThemeContext = createContext();

export const useThemes = () => useContext(ThemeContext);

const baseThemeValues = {
  buttonBackground: stylesHelper.themes.commonButtonBackground,
  buttonText: stylesHelper.themes.commonButtonText,
  headerBackground: stylesHelper.themes.commonHeaderBackground,
  headerText: stylesHelper.themes.commonHeaderText,
};

const lightThemeValues = {
  background: stylesHelper.themes.lightBackground,
  text: stylesHelper.themes.lightText,
  ...baseThemeValues,
};

const darkThemeValues = {
  background: stylesHelper.themes.darkBackground,
  text: stylesHelper.themes.darkText,
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
