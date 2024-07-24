import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AddActivityScreen from './screens/AddActivityScreen';
import AddDietScreen from './screens/AddDietScreen';
import { ActivityProvider } from './components/ActivityContext';
import { DietProvider } from './components/DietContext';
import { ThemesProvider, useThemes } from './components/ThemeContext';
import TabNavigator from './components/TabNavigator';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { navigationTheme } = useThemes();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AddActivity" component={AddActivityScreen}/>
        <Stack.Screen name="AddDiet" component={AddDietScreen} />
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