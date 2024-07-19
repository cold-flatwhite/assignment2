import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import DietScreen from "./screens/DietScreen";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const defaultSetting = {
  headerStyle : {backgroundColor : "#4A3C93"},
  headTintColor : "white",
  headerTitleStyle: { color: "white" },
}

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={defaultSetting}>
      <Tab.Screen
        name="Activities"
        component={ActivitiesScreen}
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
