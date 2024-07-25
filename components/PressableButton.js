import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import stylesHelper from "../styles/stylesHelper";

const PressableButton = ({ children, pressedFunction, componentStyle }) => {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => {
        return [styles.defaultStyle, componentStyle, pressed && styles.pressableStyle];
      }}
    >
      <View>{children}</View>
    </Pressable>
  );
};

export default PressableButton;

const styles = StyleSheet.create({
    pressableStyle: {
        opacity: stylesHelper.opacity.low,
      },
    defaultStyle : {
        padding : stylesHelper.spacing.extraSmall,
    }
});