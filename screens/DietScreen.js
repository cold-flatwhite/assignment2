import React from 'react';
import { StyleSheet, View } from 'react-native';
import ItemsList from '../components/ItemsList';

const data = [
    { id: '1', itemType: 'Breakfast', data: 500, date: 'Mon Jul 15 2024', special: false },
    { id: '2', itemType: 'Lunch', data: 850, date: 'Mon Jul 01 2024', special: true },
    { id: '3', itemType: 'Dinner', data: 600, date: 'Tue Jul 09 2024', special: false },
  ];

const DietScreen = () => {
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
})

export default DietScreen;
