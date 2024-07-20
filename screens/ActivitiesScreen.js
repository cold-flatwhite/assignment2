import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import ItemsList from "../components/ItemsList";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import { useActivity } from "../components/ActivityContext";

const ActivitiesScreen = ({ navigation }) => {
  const { activities } = useActivity();

  useEffect(() => {
    navigation.setOptions({
      tabBarIcon: () => <FontAwesome5 name="running" size={24} color="grey" />,
      headerRight: () => (
        <PressableButton
          componentStyle={styles.buttonStyle}
          pressedFunction={() => navigation.navigate('AddActivity')}
        >
          <View style={styles.iconContainer}>
            <AntDesign name="plus" size={20} color="white" />
            <FontAwesome5 name="running" size={20} color="white" />
          </View>
        </PressableButton>
      ),
    });
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <ItemsList data={activities} />
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D2C7E7",
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    marginRight: 5,
    padding: 5,
    alignContent: "center",
    justifyContent: "center",
  },
});
