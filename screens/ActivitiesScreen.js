import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import ItemsList from "../components/ItemsList";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import { useActivity } from "../components/ActivityContext";
import { FontAwesome5 } from "@expo/vector-icons";
import stylesHelper from "../styles/stylesHelper";

const ActivitiesScreen = ({ navigation }) => {
  const { activities } = useActivity();

  useEffect(() => {
    navigation.setOptions({
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
      <ItemsList data={activities} editScreen="AddActivity"/>
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: stylesHelper.flexSize.small,
    padding: stylesHelper.spacing.small,
  },
  iconContainer: {
    flexDirection: stylesHelper.flex.row, 
    alignItems: stylesHelper.alignItems.center, 
  },
  buttonStyle: {
    marginRight: stylesHelper.spacing.small, 
    padding: stylesHelper.spacing.small, 
    alignContent: stylesHelper.alignItems.center,
    justifyContent: stylesHelper.justifyContent.center, 
  },
});
