import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableButton from "../components/PressableButton";
import { useActivity } from "../components/ActivityContext";


const AddDietScreen = ({navigation}) => {
    const [dietDescription, setdietDescription] = useState(null);
    const [calories, setCalories] = useState("");
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

  
    const validateInputs = () => {
      if (!dietDescription) {
        Alert.alert("Invalid Input", "Please input a description for diet.");
        return false;
      }
      if (!calories) {
        Alert.alert("Invalid Input", "Please enter the calories.");
        return false;
      }
      if (isNaN(duration) || parseFloat(duration) <= 0) {
        Alert.alert("Invalid Input", "Please enter vaild carlories.");
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
      const isSpecial = caloriesInNum > 800;
  
      const newActivity = {
        id: Date.now(),
        itemType: activityType,
        data: `${duration} min`,
        date: date.toDateString(),
        special: isSpecial,
      };
      addActivity(newActivity);
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
  
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.label}>Descriptions *</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={dietDescription}
            onChangeText={setdietDescription}
            multiline={true}
            numberOfLines={4} // 设置初始行数
            textAlignVertical="top" // 使文本从顶部开始
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
              pressedFunction={saveDietEntry}
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
      backgroundColor: "#D2C7E7",
    },
    contentContainer: {
      flex: 1,
      justifyContent: "flex-start",
      paddingTop: 25,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#333",
    },
    input: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: "#fff",     
    },
    datePicker: {
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: 5,
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
  

export default AddDietScreen