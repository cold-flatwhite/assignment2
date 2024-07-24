import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import PressableButton from "./PressableButton";
import { useNavigation } from '@react-navigation/native';


const ItemsList = ({ data, editScreen}) => {
  const navigation = useNavigation();
  
  const handlePress = (item) => {
    console.log(item);
    navigation.navigate(editScreen, { item });
  };

  const renderItem = ({ item }) => (
    <PressableButton
      pressedFunction={() => handlePress(item)}
      componentStyle={styles.itemContainer}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemType}>{item.itemType}</Text>
        <View style={styles.special}>
          {item.special && <Entypo name="warning" size={24} color="yellow" />}
        </View>
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
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemType: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    flex: 2,
  },
  special: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 11,
    marginLeft: 5,
    backgroundColor: "white",
    fontWeight: "bold",
    padding: 5,
    flex: 3,
    textAlign: "center",
  },
  data: {
    fontSize: 11,
    backgroundColor: "white",
    fontWeight: "bold",
    padding: 5,
    marginLeft: 5,
    flex: 2,
    textAlign: "center",
  },
});
