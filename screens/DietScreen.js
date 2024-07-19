import React from 'react';
import { StyleSheet, View } from 'react-native';
import ItemsList from '../components/ItemsList';
import { useEffect } from 'react';
import PressableButton from '../components/PressableButton';
import { AntDesign, Ionicons} from "@expo/vector-icons";

const data = [
    { id: '1', itemType: 'Breakfast', data: 500, date: 'Mon Jul 15 2024', special: false },
    { id: '2', itemType: 'Lunch', data: 850, date: 'Mon Jul 01 2024', special: true },
    { id: '3', itemType: 'Dinner', data: 600, date: 'Tue Jul 09 2024', special: false },
  ];

const DietScreen = ({navigation}) => {
    useEffect(() => {
        navigation.setOptions({
          tabBarIcon: () => <Ionicons name="fast-food" size={24} color="grey" />
,
          headerRight: () => (
            <PressableButton
              componentStyle={styles.buttonStyle}
              pressedFunction={() => alert("Button Pressed!")}
            >
              <View style={styles.iconContainer}>
                <AntDesign name="plus" size={20} color="white" />
                <Ionicons name="fast-food" size={20} color="white" />
              </View>
            </PressableButton>
          ),
        });
      }, [navigation]);
    return (
        <View style={styles.container}>
        <ItemsList data={data} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B4B3DB',
        padding: 10,
      },
      iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonStyle: {
        marginRight: 5,
        padding: 5,
        alignContent: "center",
        justifyContent: "center",
      },
})

export default DietScreen;
