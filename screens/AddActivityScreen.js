import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableButton from "../components/PressableButton";
import { useActivity } from "../components/ActivityContext";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import stylesHelper from "../styles/stylesHelper";
import { writeToDB } from "../Firebase/firestoreHelper";
import { database } from "../Firebase/firebaseSetup";
import { deleteFromDb } from "../Firebase/firestoreHelper";
import { doc, onSnapshot } from "firebase/firestore";

const AddActivityScreen = ({ route, navigation }) => {
  const { item } = route.params || {};
  const { addActivity, updateActivity, removeActivity } = useActivity();

  const [activityType, setActivityType] = useState(item ? item.itemType : null);
  const [duration, setDuration] = useState(item ? item.data.split(" ")[0] : "");
  const [date, setDate] = useState(item ? new Date(item.date) : null);
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [special, setSpecial] = useState(item ? item.special : false);
  const [isSpecialChecked, setIsSpecialChecked] = useState(false);
  const [items, setItems] = useState([
    { label: "Walking", value: "walking" },
    { label: "Running", value: "running" },
    { label: "Swimming", value: "swimming" },
    { label: "Weights", value: "weights" },
    { label: "Yoga", value: "yoga" },
  ]);

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
  }, [navigation, item]);

  const validateInputs = () => {
    if (!activityType) {
      Alert.alert("Invalid Input", "Please select an activity.");
      return false;
    }
    if (!duration) {
      Alert.alert("Invalid Input", "Please enter a duration.");
      return false;
    }
    if (isNaN(duration) || parseFloat(duration) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid duration.");
      return false;
    }
    if (!date) {
      Alert.alert("Invalid Input", "Please enter a valid date.");
      return false;
    }
    return true;
  };

  const saveActivity = () => {
    if (!validateInputs()) {
      return;
    }
    const durationInMinutes = parseFloat(duration);
    const isSpecial =
      !isSpecialChecked &&
      (activityType === "running" || activityType === "weights") &&
      durationInMinutes > 60;

    const activity = {
      itemType: activityType,
      data: `${duration} min`,
      date: date.toDateString(),
      special: isSpecial,
    };

    if (item) {
      updateActivity(activity);
      Alert.alert("Success", "Activity updated successfully.");
    } else {
      writeToDB(activity, "activities")
      Alert.alert("Success", "Activity added successfully.");
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
      deleteFromDb(item.id, "activities");
      Alert.alert("Success", "Activity deleted successfully.");
      navigation.goBack();
    }
  };

  const confirmSave = () => {
    Alert.alert(
      "Save",
      `Are you sure you want to ${
        item ? "save changes" : "add this activity"
      }?`,
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: saveActivity,
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

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Activity *</Text>
        <DropDownPicker
          open={open}
          value={activityType}
          items={items}
          setOpen={setOpen}
          setValue={setActivityType}
          setItems={setItems}
          style={[styles.dropDown, styles.input]}
          containerStyle={styles.dropDownContainer}
          placeholder="Select An Activity"
        />

        <Text style={styles.label}>Duration (min) *</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
        />

        <Text style={styles.label}>Date *</Text>
        <PressableButton
          pressedFunction={handleDatePicker}
          componentStyle={styles.input}
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
            pressedFunction={confirmSave}
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
    paddingTop: stylesHelper.spacing.medium,
  },
  label: {
    fontSize: stylesHelper.fontSizes.medium,
    fontWeight: stylesHelper.fontWeights.bold,
    color: stylesHelper.colors.text,
    marginTop: stylesHelper.spacing.small,
  },
  dropDownContainer: {
    marginBottom: stylesHelper.spacing.medium,
    zIndex: stylesHelper.zIndex.high,
  },
  dropDown: {
    backgroundColor: stylesHelper.colors.white,
    borderColor: stylesHelper.colors.border,
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
    borderRadius: stylesHelper.borderRadius.medium,
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
    fontSize: stylesHelper.fontSizes.medium,
  },
});

export default AddActivityScreen;
