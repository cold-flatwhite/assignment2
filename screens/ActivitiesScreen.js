import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import ItemsList from "../components/ItemsList";
import { useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from "@expo/vector-icons";


const ActivitiesScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      tabBarIcon: () => (
        <FontAwesome5 name="running" size={24} color="grey" />
      ),
      headerRight: () => (
        <Pressable onPress={() => alert('Button Pressed!')}>
        <AntDesign name="plus" size={24} color="black" />
        <FontAwesome5 name="running" size={24} color="grey" />
      </Pressable>
      ),
    });
  }, [navigation]);
  const data = [
    {
      id: 1,
      itemType: "Walking",
      data: "30 min",
      date: "Mon Jul 15 2024",
      special: false,
    },
    {
      id: 2,
      itemType: "Running",
      data: "45 min",
      date: "Mon Jul 16 2024",
      special: true,
    },
    {
      id: 3,
      itemType: "Weights",
      data: "60 min",
      date: "Mon Jul 17 2024",
      special: false,
    },
    {
      id: 4,
      itemType: "Yoga",
      data: "40 min",
      date: "Mon Jul 18 2024",
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
