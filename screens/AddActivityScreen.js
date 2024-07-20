import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddActivityScreen = ({ navigation }) => {
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Walking", value: "walking" },
    { label: "Running", value: "running" },
    { label: "Swimming", value: "swimming" },
    { label: "Weights", value: "weights" },
    { label: "Yoga", value: "yoga" },
  ]);

  const saveActivity = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        style={styles.dropDown}
        containerStyle={styles.dropDownContainer}
        placeholder="Select An Activity"
      />

      <Text style={styles.label}>Duration (min) *</Text>
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Date *</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || date;
          setDate(currentDate);
        }}
        style={styles.datePicker}
      />

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} color="#B20000" />
        <Button title="Save" onPress={saveActivity} color="#4A3C93" />
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  dropDownContainer: {
    marginBottom: 20,
    zIndex: 1000,
  },
  dropDown: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
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
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default AddActivityScreen;
