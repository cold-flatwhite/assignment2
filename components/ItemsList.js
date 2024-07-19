import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
const ItemsList = ({data}) => {

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemType}>{item.itemType}</Text>
          {item.special && <Entypo name="warning" size={24} color="yellow" />}
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.data}>{item.data}</Text>
        </View>
      );

    return (
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    );
}

export default ItemsList;

const styles = StyleSheet.create({
    list: {
      paddingBottom: 20,
      marginVertical : 15,
      alignItems : 'center',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#4A3C93',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      width : '90%',
      justifyContent : 'center',
    },
    itemType: {
      fontSize: 16,
      color: 'white',
      flex : 1,
      fontWeight :'bold',
    },
    date: {
      fontSize: 16,
      marginLeft: 5,
      backgroundColor : 'white',
      padding : 5,
    },
    data: {
      fontSize: 16,
      backgroundColor : 'white',
      padding : 5,
        marginLeft: 5,
    },
  });