import { Text, View, Button, StyleSheet } from "react-native";
import ItemsList from "../components/ItemsList";

const ActivitiesScreen = ({ navigation }) => {
  const data = [
    {
      id: 1,
      activityType: "Walking",
      duration: 30,
      date: "2023-07-17",
      special: false,
    },
    {
      id: 2,
      activityType: "Running",
      duration: 45,
      date: "2023-07-16",
      special: true,
    },
    {
      id: 3,
      activityType: "Weights",
      duration: 60,
      date: "2023-07-15",
      special: false,
    },
    {
      id: 4,
      activityType: "Yoga",
      duration: 40,
      date: "2023-07-14",
      special: false,
    },
  ];

  return (
    <View style={styles.container}>
        <ItemsList data={data} />
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B4B3DB",
    padding: 10,
  },
});
