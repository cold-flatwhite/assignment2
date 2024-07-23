import React, { createContext, useState, useContext } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const ThemeContext = createContext();

export const useThemes = () => useContext(ThemeContext);

export const ThemesProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeValues = {
    dark: {
      background: "#D2C7E7",
      text: 'black',
      buttonBackground: '#4A3C93',
      buttonText: '#ffffff',
      headerBackground: '#333333',
      headerText: '#ffffff',
    },
    light: {
      backgroundColor: "#4A3C93",
      text: "white",
      buttonBackground: '#4A3C93',
      buttonText: '#ffffff',
      headerBackground: '#4A3C93',
      headerText: '#ffffff',
    }
  };

  const navigationTheme = theme === 'light' ? {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: themeValues.light.background,
      text: themeValues.light.text,
      card: themeValues.light.buttonBackground,
      border: 'transparent',
      primary: themeValues.light.buttonText,
    },
  } : {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: themeValues.dark.background,
      text: themeValues.dark.text,
      card: themeValues.dark.buttonBackground,
      border: 'transparent',
      primary: themeValues.dark.buttonText,
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeValues, navigationTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
