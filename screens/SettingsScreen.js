import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PressableButton from '../components/PressableButton';
import { useThemes } from '../components/ThemeContext';
import stylesHelper from '../styles/stylesHelper';

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
    flex: stylesHelper.flexSize.small,
    justifyContent: stylesHelper.justifyContent.center,
    alignItems: stylesHelper.alignItems.center,
  },
  button: {
    padding: stylesHelper.spacing.small,
    borderRadius: stylesHelper.borderRadius.small,
    backgroundColor: stylesHelper.colors.primary,
  },
  buttonText: {
    color: stylesHelper.colors.white,
    textAlign: stylesHelper.textAlign.center,
    fontWeight: stylesHelper.fontWeights.bold,
  },
});
