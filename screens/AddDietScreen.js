import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableButton from "../components/PressableButton";
import { useDiet } from "../components/DietContext";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const DietScreen = ({ route, navigation }) => {
  const { item } = route.params || {}; 

  const { addDiet, removeDiet, updateDiet } = useDiet();
  const [dietDescription, setDietDescription] = useState(
    item ? item.itemType : ""
  );
  const [calories, setCalories] = useState(item ? item.data : "");
  const [date, setDate] = useState(item ? new Date(item.date) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [special, setSpecial] = useState(item ? item.special : false);
  const [isSpecialChecked, setIsSpecialChecked] = useState(false);

  useEffect(() => {
    if (item) {
      navigation.setOptions({
        title: 'Edit',
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
    if (!validateInputs()) {
      return;
    }

    const caloriesInNum = parseFloat(calories);
    const isSpecial = !isSpecialChecked && caloriesInNum > 800;

    const newDiet = {
      id: item ? item.id : Date.now(),
      itemType: dietDescription,
      data: `${calories}`,
      date: date.toDateString(),
      special: isSpecial,
    };

    if (item) {
      updateDiet(newDiet);
      Alert.alert("Success", "Diet updated successfully.");
    } else {
      addDiet(newDiet);
      Alert.alert("Success", "Diet added successfully.");
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
      removeDiet(item.id);
      Alert.alert("Success", "Diet deleted successfully.");
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
            color={isSpecialChecked ? "#4630EB" : undefined}
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
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },
  input: {
    height: 40,
    borderColor: "#4A3C93",
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: "#D2C7E7",
    justifyContent: "center",
    borderRadius: 10,
  },
  datePicker: {
    width: "100%",
    backgroundColor: "#D2C7E7",
    borderRadius: 7,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
  },
  paragraph: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  checkbox: {
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 55,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#B20000",
  },
  saveButton: {
    backgroundColor: "#4A3C93",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default DietScreen;
