import React from "react";
import { StyleSheet, View } from "react-native";
import ItemsList from "../components/ItemsList";
import { useEffect } from "react";
import PressableButton from "../components/PressableButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useDiet } from "../components/DietContext";
import stylesHelper from "../styles/stylesHelper";

const DietScreen = ({ navigation }) => {
  const {diets} = useDiet();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          componentStyle={styles.buttonStyle}
          pressedFunction={() => navigation.navigate("AddDiet")}
        >
          <View style={styles.iconContainer}>
            <AntDesign name="plus" size={20} color="white" />
            <Ionicons name="fast-food" size={20} color="white" />
          </View>
        </PressableButton>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ItemsList data={diets} editScreen = "AddDiet"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: stylesHelper.flexSize.medium,
    padding: stylesHelper.spacing.small,
  },
  iconContainer: {
    flexDirection: stylesHelper.flex.row,
    alignItems: stylesHelper.alignItems.center,
  },
  buttonStyle: {
    marginRight: stylesHelper.spacing.small,
    padding: stylesHelper.spacing.small,
    alignContent: stylesHelper.alignItems.center,
    justifyContent: stylesHelper.justifyContent.center,
  },
});

export default DietScreen;
