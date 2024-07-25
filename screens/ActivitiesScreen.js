import {
  Text,
  View,
  Button,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import ItemsList from "../components/ItemsList";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import { useActivity } from "../components/ActivityContext";
import { FontAwesome5 } from "@expo/vector-icons";
import stylesHelper from "../styles/stylesHelper";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";

const ActivitiesScreen = ({ navigation }) => {
  const { activities, setActivities } = useActivity();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "activities"), (querySnapShot) => {
      let newActivities = [];
      if (!querySnapShot.empty) {
        querySnapShot.forEach((docSnapShot) => {
          newActivities.push({ ...docSnapShot.data(), id: docSnapShot.id });
        });
      }
      setActivities(newActivities);
    });
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          componentStyle={styles.buttonStyle}
          pressedFunction={() => navigation.navigate("AddActivity")}
        >
          <View style={styles.iconContainer}>
            <AntDesign name="plus" size={20} color="white" />
            <FontAwesome5 name="running" size={20} color="white" />
          </View> 
        </PressableButton>
      ),
    });
    return () => unsubscribe();
  }, []);

  const handleEditNavigate = (item) => {
    navigation.navigate("AddActivity", {item});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
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

export default ActivitiesScreen;

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
