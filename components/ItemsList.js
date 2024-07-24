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
import { useNavigation } from "@react-navigation/native";
import stylesHelper from "../styles/stylesHelper";

const ItemsList = ({ item, editNavigateHandler}) => {
  const navigation = useNavigation();

  return (
    <View key={item.id} style={styles.itemContainer}>
      <PressableButton
        pressedFunction={() => editNavigateHandler(item)}
        componentStyle={styles.buttonStyle}
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
    </View>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  list: {
    paddingBottom: stylesHelper.spacing.medium,
    marginVertical: stylesHelper.spacing.medium,
    alignItems: stylesHelper.alignItems.center,
  },
  itemContainer: {
    backgroundColor: stylesHelper.colors.primary,
    marginTop : stylesHelper.spacing.small,
    width : stylesHelper.dimensions.widthFull,
  },
  buttonStyle : {
    backgroundColor: stylesHelper.colors.primary,
    padding: stylesHelper.spacing.small,
    borderRadius: stylesHelper.borderRadius.medium,
    width: stylesHelper.dimensions.widthFull,
  },
  itemContent: {
    flex: stylesHelper.flexSize.small,
    width: stylesHelper.dimensions.widthFull,
    flexDirection: stylesHelper.flex.row,
    alignItems: stylesHelper.alignItems.center,
    justifyContent: stylesHelper.justifyContent.spaceBetween,
  },
  itemType: {
    fontSize: stylesHelper.fontSizes.extraSmall,
    color: stylesHelper.colors.white,
    fontWeight: stylesHelper.fontWeights.bold,
    flex: stylesHelper.flexSize.medium,
  },
  special: {
    flex: stylesHelper.flexSize.small,
    justifyContent: stylesHelper.justifyContent.center,
    alignItems: stylesHelper.alignItems.center,
  },
  date: {
    fontSize: stylesHelper.fontSizes.extraSmall,
    marginLeft: stylesHelper.spacing.extraSmall,
    backgroundColor: stylesHelper.colors.white,
    fontWeight: stylesHelper.fontWeights.bold,
    padding: stylesHelper.spacing.extraSmall,
    flex: stylesHelper.flexSize.large,
    textAlign: stylesHelper.textAlign.center,
  },
  data: {
    fontSize: stylesHelper.fontSizes.extraSmall,
    backgroundColor: stylesHelper.colors.white,
    fontWeight: stylesHelper.fontWeights.bold,
    padding: stylesHelper.spacing.extraSmall,
    marginLeft: stylesHelper.spacing.extraSmall,
    flex: stylesHelper.flexSize.medium,
    textAlign: stylesHelper.textAlign.center,
  },
});
