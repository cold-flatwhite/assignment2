import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableButton from "../components/PressableButton";
import { useDiet } from "../components/DietContext";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import stylesHelper from "../styles/stylesHelper";
import { writeToDB } from "../Firebase/firestoreHelper";
import { deleteFromDb } from "../Firebase/firestoreHelper";
import { updateToDB } from "../Firebase/firestoreHelper";

const DietScreen = ({ route, navigation }) => {
  const { item } = route.params || {};

  const { setDiets, removeDiet, updateDiet } = useDiet();
  const [dietDescription, setDietDescription] = useState(
    item ? item.itemType : ""
  );
  const [calories, setCalories] = useState(item ? item.data : "");
  const [date, setDate] = useState(item ? new Date(item.date) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [special, setSpecial] = useState(item ? item.special : false);
  const [isSpecialChecked, setIsSpecialChecked] = useState(false);

  const collectionName = "diets";

  useEffect(() => {
    if (item) {
      navigation.setOptions({
        title: "Edit",
        headerRight: () => (
          <PressableButton
            componentStyle={styles.buttonStyle}
            pressedFunction={confirmDelete}
          >
            <AntDesign name="delete" size={24} color="white" />
          </PressableButton>
        ),
      });
    }
  }, [item, navigation]);

  const validateInputs = () => {
    if (!dietDescription) {
      Alert.alert("Invalid Input", "Please input a description for diet.");
      return false;
    }
    if (!calories) {
      Alert.alert("Invalid Input", "Please enter the calories.");
      return false;
    }
    if (isNaN(calories) || parseFloat(calories) <= 0) {
      Alert.alert("Invalid Input", "Please enter valid calories.");
      return false;
    }
    if (!date) {
      Alert.alert("Invalid Input", "Please enter a valid date.");
      return false;
    }
    return true;
  };

  const saveDietEntry = () => {
    const caloriesInNum = parseFloat(calories);
    const isSpecial = !isSpecialChecked && caloriesInNum > 800;

    const newDiet = {
      itemType: dietDescription,
      data: `${calories}`,
      date: date.toDateString(),
      special: isSpecial,
    };

    if (item) {
      updateToDB(item.id, collectionName, newDiet);
    } else {
      writeToDB(newDiet, collectionName);
    }
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    if (!date) {
      setDate(new Date());
    }
  };

  const handleDelete = () => {
    if (item) {
      deleteFromDb(item.id, collectionName);
      navigation.goBack();
    }
  };

  const confirmSave = () => {
    Alert.alert(
      "Import",
      "Are you sure you want to save these changes?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: saveDietEntry,
        },
      ],
      { cancelable: false }
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: handleDelete,
        },
      ],
      { cancelable: false }
    );
  };

  const handleSave = () => {
    if (!validateInputs()) return;
    if (item) {
      confirmSave();
    } else {
      saveDietEntry();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Descriptions *</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={dietDescription}
          onChangeText={setDietDescription}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Calories *</Text>
        <TextInput
          style={styles.input}
          value={calories}
          onChangeText={setCalories}
        />

        <Text style={styles.label}>Date *</Text>
        <PressableButton
          pressedFunction={handleDatePicker}
          componentStyle={[styles.input, styles.dateButton]}
        >
          <Text style={{ color: date ? "#000" : "#aaa" }}>
            {date ? date.toDateString() : ""}
          </Text>
        </PressableButton>

        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="inline"
            onChange={handleDateChange}
            style={styles.datePicker}
          />
        )}
      </View>

      {!showDatePicker && special && (
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            This item is marked as special. Select the checkbox if you would
            like to approve it.
          </Text>
          <Checkbox
            style={styles.checkbox}
            value={isSpecialChecked}
            onValueChange={setIsSpecialChecked}
            color={isSpecialChecked ? stylesHelper.colors.checkbox : undefined}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        {!showDatePicker && (
          <PressableButton
            pressedFunction={() => navigation.goBack()}
            componentStyle={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </PressableButton>
        )}
        {!showDatePicker && (
          <PressableButton
            pressedFunction={handleSave}
            componentStyle={[styles.button, styles.saveButton]}
          >
            <Text style={styles.buttonText}>Save</Text>
          </PressableButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: stylesHelper.flexSize.small,
    padding: stylesHelper.spacing.medium,
  },
  contentContainer: {
    flex: stylesHelper.flexSize.small,
    justifyContent: stylesHelper.justifyContent.flexStart,
    paddingTop: stylesHelper.spacing.small,
  },
  label: {
    fontSize: stylesHelper.fontSizes.medium,
    fontWeight: stylesHelper.fontWeights.bold,
    color: stylesHelper.colors.text,
    marginTop: stylesHelper.spacing.small,
  },
  input: {
    height: stylesHelper.dimensions.heightSmall,
    borderColor: stylesHelper.colors.primary,
    borderWidth: stylesHelper.borderWidths.thin,
    paddingHorizontal: stylesHelper.spacing.small,
    backgroundColor: stylesHelper.colors.secondary,
    justifyContent: stylesHelper.alignItems.center,
    borderRadius: stylesHelper.borderRadius.medium,
  },
  datePicker: {
    width: stylesHelper.dimensions.widthFull,
    backgroundColor: stylesHelper.colors.secondary,
    borderRadius: stylesHelper.borderRadius.small,
  },
  section: {
    flexDirection: stylesHelper.flex.row,
    alignItems: stylesHelper.alignItems.center,
    paddingVertical: stylesHelper.spacing.large,
  },
  paragraph: {
    fontSize: stylesHelper.fontSizes.small,
    fontWeight: stylesHelper.fontWeights.bold,
    color: stylesHelper.colors.text,
  },
  checkbox: {
    marginLeft: stylesHelper.spacing.extraSmall,
  },
  buttonContainer: {
    flexDirection: stylesHelper.flex.row,
    justifyContent: stylesHelper.justifyContent.spaceBetween,
    marginBottom: stylesHelper.spacing.large,
  },
  button: {
    paddingVertical: stylesHelper.spacing.small,
    paddingHorizontal: stylesHelper.spacing.extraLarge,
    borderRadius: stylesHelper.borderRadius.small,
  },
  cancelButton: {
    backgroundColor: stylesHelper.colors.danger,
  },
  saveButton: {
    backgroundColor: stylesHelper.colors.primary,
  },
  buttonText: {
    color: stylesHelper.colors.white,
    textAlign: stylesHelper.textAlign.center,
    fontWeight: stylesHelper.fontWeights.bold,
  },
  multilineInput: {
    height: stylesHelper.dimensions.heightMedium,
    textAlignVertical: stylesHelper.textAlignVertical.top,
  },
});

export default DietScreen;
