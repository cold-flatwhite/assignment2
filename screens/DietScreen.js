import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ItemsList from "../components/ItemsList";
import { useEffect } from "react";
import PressableButton from "../components/PressableButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useDiet } from "../components/DietContext";
import stylesHelper from "../styles/stylesHelper";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";


const DietScreen = ({ navigation }) => {
  const {diets, setDiets} = useDiet();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "diets"), (querySnapShot) => {
      let newDiets = [];
      if (!querySnapShot.empty) {
        querySnapShot.forEach((docSnapShot) => {
          newDiets.push({ ...docSnapShot.data(), id: docSnapShot.id });
        });
      }
      setDiets(newDiets);
    });
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
    return () => unsubscribe();
  }, [navigation]);

  const handleEditNavigate = (item) => {
    navigation.navigate("AddDiet", {item});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={diets}
        renderItem={({ item }) => {
          return (
            <ItemsList item={item} editNavigateHandler={handleEditNavigate} />
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: stylesHelper.flexSize.small,
    padding: stylesHelper.spacing.medium,
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
