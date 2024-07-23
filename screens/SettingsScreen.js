import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PressableButton from '../components/PressableButton';
import { useThemes } from '../components/ThemeContext';

const SettingsScreen = () => {
  const {toggleTheme} = useThemes();

  return (
    <View style={styles.container}>
      <PressableButton
        pressedFunction={toggleTheme}
        componentStyle={styles.button}
      >
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </PressableButton>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#4A3C93",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
