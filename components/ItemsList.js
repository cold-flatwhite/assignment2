import React from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import PressableButton from "./PressableButton";

const ItemsList = ({ data, navigation }) => {
  const handlePress = (item) => {
    console.log('Navigating to', item);
  };

  const renderItem = ({ item }) => (
    <PressableButton
      pressedFunction={() => handlePress(item)}
      componentStyle = {styles.itemContainer}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemType}>{item.itemType}</Text>
        {item.special && <Entypo name="warning" size={24} color="yellow" />}
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.data}>{item.data}</Text>
      </View>
    </PressableButton>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
    marginVertical: 15,
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: "#4A3C93",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "90%",
  },
  itemContent: {
    flex : 1,
    width : "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemType: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    flex : 2,
  },
  date: {
    fontSize: 16,
    marginLeft: 5,
    backgroundColor: "white",
    padding: 5,
  },
  data: {
    fontSize: 16,
    backgroundColor: "white",
    padding: 5,
    marginLeft: 5,
  },
});
