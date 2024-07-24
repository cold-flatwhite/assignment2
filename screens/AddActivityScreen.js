import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import PressableButton from '../components/PressableButton';
import { useActivity } from '../components/ActivityContext';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const AddActivityScreen = ({ route, navigation }) => {
  const { item } = route.params || {}; // Handle if no item is passed (i.e., add mode)
  const { addActivity, updateActivity, removeActivity } = useActivity();

  const [activityType, setActivityType] = useState(item ? item.itemType : null);
  const [duration, setDuration] = useState(item ? item.data.split(' ')[0] : '');
  const [date, setDate] = useState(item ? new Date(item.date) : null);
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [special, setSpecial] = useState(item ? item.special : false);
  const [isSpecialChecked, setIsSpecialChecked] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'walking' },
    { label: 'Running', value: 'running' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Weights', value: 'weights' },
    { label: 'Yoga', value: 'yoga' },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        item ? (
          <PressableButton
            componentStyle={styles.buttonStyle}
            pressedFunction={confirmDelete}
          >
            <AntDesign name="delete" size={24} color="white" />
          </PressableButton>
        ) : null
      ),
    });
  }, [navigation, item]);

  const validateInputs = () => {
    if (!activityType) {
      Alert.alert('Invalid Input', 'Please select an activity.');
      return false;
    }
    if (!duration) {
      Alert.alert('Invalid Input', 'Please enter a duration.');
      return false;
    }
    if (isNaN(duration) || parseFloat(duration) <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid duration.');
      return false;
    }
    if (!date) {
      Alert.alert('Invalid Input', 'Please enter a valid date.');
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
      (activityType === 'running' || activityType === 'weights') &&
      durationInMinutes > 60;

    const activity = {
      id: item ? item.id : Date.now(),
      itemType: activityType,
      data: `${duration} min`,
      date: date.toDateString(),
      special: isSpecial,
    };


    if (item) {
      updateActivity(activity);
      Alert.alert('Success', 'Activity updated successfully.');
    } else {
      addActivity(activity);
      Alert.alert('Success', 'Activity added successfully.');
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
      removeActivity(item.id);
      Alert.alert('Success', 'Activity deleted successfully.');
      navigation.goBack();
    }
  };

  const confirmSave = () => {
    Alert.alert(
      'Save',
      `Are you sure you want to ${item ? 'save changes' : 'add this activity'}?`,
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: saveActivity,
        },
      ],
      { cancelable: false }
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
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
          <Text style={{ color: date ? '#000' : '#aaa' }}>
            {date ? date.toDateString() : ''}
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
      
      {!showDatePicker && special && <View style={styles.section}>
        <Text style={styles.paragraph}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
        <Checkbox
          style={styles.checkbox}
          value={isSpecialChecked}
          onValueChange={setIsSpecialChecked}
          color={isSpecialChecked ? '#4630EB' : undefined}
        />
      </View>}

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
    justifyContent: 'flex-start',
    paddingTop: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  dropDownContainer: {
    marginBottom: 20,
    zIndex: 1000,
  },
  dropDown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: '#4A3C93',
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: '#D2C7E7',
    justifyContent: 'center',
    borderRadius: 7,
  },
  datePicker: {
    width: '100%',
    backgroundColor: '#D2C7E7',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#fff',
    fontSize: 16,
  },
});

export default AddActivityScreen;
