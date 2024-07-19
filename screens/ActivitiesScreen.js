import { Text, View, Button } from "react-native";
import ItemsList from "../components/ItemsList";
const ActivitiesScreen = ({}) => {
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
    <View>
      <ItemsList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>Type: {item.activityType}</Text>
            <Text>Special: {item.special ? "Yes" : "No"}</Text>
            <Text>Duration: {item.duration} minutes</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ActivitiesScreen;
