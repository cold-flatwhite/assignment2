import React from "react";
import { StyleSheet, View } from "react-native";
import ItemsList from "../components/ItemsList";
import { useEffect } from "react";
import PressableButton from "../components/PressableButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useDiet } from "../components/DietContext";

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
      <ItemsList data={diets} editScreen = "EditDiet"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyle: {
    marginRight: 5,
    padding: 5,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default DietScreen;
