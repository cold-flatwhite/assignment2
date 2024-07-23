import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import DietScreen from '../screens/DietScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Activities') {
              iconName = 'running';
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            } else if (route.name === 'Diet') {
              iconName = 'fast-food';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Settings') {
              iconName = 'settings';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'gold',
          tabBarInactiveTintColor: 'grey',
        })}
      >
        <Tab.Screen
          name="Activities"
          component={ActivitiesScreen}
        />
        <Tab.Screen
          name="Diet"
          component={DietScreen}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    );
  };
  
  export default TabNavigator;