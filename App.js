import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DietScreen from "./screens/DietScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const defaultSetting = {
  headerStyle: { backgroundColor: "#4A3C93" },
  headTintColor: "white",
  headerTitleStyle: { color: "white" },
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={defaultSetting}>
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultSetting}>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
