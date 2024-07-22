import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableButton from "../components/PressableButton";
import { useDiet } from "../components/DietContext";
import { useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';

const EditDietScreen = ({route, navigation}) => {
    const {item} = route.params;
    console.log(item);

    const { removeDiet, updateDiet} = useDiet();
    const [dietDescription, setdietDescription] = useState(item.itemType);
    const [calories, setCalories] = useState(item.data);
    const [date, setDate] = useState(new Date(item.date));
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <PressableButton
              componentStyle={styles.buttonStyle}
              pressedFunction={() => handleDelete()}
            >
              <AntDesign name="delete" size={24} color="white" />
            </PressableButton>
          ),
        });
      }, [navigation]);
    
  
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
  
      const newDiet = {
        id: item.id,
        itemType: dietDescription,
        data: `${calories}`,
        date: date.toDateString(),
        special: isSpecial,
      };
      updateDiet(newDiet);
      Alert.alert('Success', 'Diet updated successfully.');
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
        removeDiet(item.id);
        Alert.alert('Success', 'Diet deleted successfully.');
        navigation.goBack();
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
      paddingTop: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginTop : 15,
    },
    input: {
      height: 40,
      borderColor: "#4A3C93",
      borderWidth: 2,
      paddingHorizontal: 10,
      backgroundColor: "#D2C7E7",
      justifyContent : "center",
      borderRadius : 10,
    },
    datePicker: {
      width: "100%",
      backgroundColor: "#D2C7E7",
      borderRadius: 7,
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
  

export default EditDietScreen