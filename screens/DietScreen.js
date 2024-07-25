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
  const { diets, setDiets } = useDiet();

  // useEffect hook to handle real-time updates from Firestore
  useEffect(() => {
    // Subscribe to changes in the "diets" collection
    const unsubscribe = onSnapshot(
      collection(database, "diets"),
      (querySnapShot) => {
        let newDiets = [];
        if (!querySnapShot.empty) {
          // Push each document's data into the newDiets array
          querySnapShot.forEach((docSnapShot) => {
            newDiets.push({ ...docSnapShot.data(), id: docSnapShot.id });
          });
        }
        // Update the diets state with the new data
        setDiets(newDiets);
      }
    );
    // Set up the header right button to navigate to the "AddDiet" screen
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
    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [navigation]);

  // Handler function to navigate to the "AddDiet" screen with item data
  const handleEditNavigate = (item) => {
    navigation.navigate("AddDiet", { item });
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
