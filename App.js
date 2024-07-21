import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DietScreen from "./screens/DietScreen";
import AddActivityScreen from "./screens/AddActivityScreen";
import { ActivityProvider } from "./components/ActivityContext";
import AddDietScreen from "./screens/AddDietScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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
      <Tab.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="running" size={24} color="grey" />
          ),
        }}
      />
      <Tab.Screen
        name="Diet"
        component={DietScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="fast-food" size={24} color="grey" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ActivityProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultSetting}>
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AddActivity" component={AddActivityScreen} />
          <Stack.Screen name="AddDiet" component={AddDietScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActivityProvider>
  );
}
