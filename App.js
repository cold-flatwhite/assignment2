import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import ActivitiesScreen from './screens/ActivitiesScreen';
import DietScreen from './screens/DietScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import AddDietScreen from './screens/AddDietScreen';
import EditActivityScreen from './screens/EditActivityScreen';
import EditDietScreen from './screens/EditDietScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ActivityProvider } from './components/ActivityContext';
import { DietProvider } from './components/DietContext';
import { ThemesProvider, useThemes } from './components/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          tabBarIcon: () => <FontAwesome5 name="running" size={24} color="grey" />,
        }}
      />
      <Tab.Screen
        name="Diet"
        component={DietScreen}
        options={{
          tabBarIcon: () => <Ionicons name="fast-food" size={24} color="grey" />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => <Ionicons name="settings" size={24} color="grey" />,
        }}
      />
    </Tab.Navigator>
  );
};

const AppContent = () => {
  const { navigationTheme } = useThemes();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AddActivity" component={AddActivityScreen} />
        <Stack.Screen name="AddDiet" component={AddDietScreen} />
        <Stack.Screen name="EditActivity" component={EditActivityScreen} options={{ title: "Edit Activity" }} />
        <Stack.Screen name="EditDiet" component={EditDietScreen} options={{ title: "Edit Diet" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ActivityProvider>
      <DietProvider>
        <ThemesProvider>
          <AppContent />
        </ThemesProvider>
      </DietProvider>
    </ActivityProvider>
  );
}