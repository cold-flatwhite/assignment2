import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Alert, CheckBox } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import PressableButton from '../components/PressableButton'; // 确保路径正确
import { useActivity } from '../components/ActivityContext';
import { AntDesign } from '@expo/vector-icons';

const EditActivityScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { activities, setActivities } = useActivity();
  const [activityType, setActivityType] = useState(item.itemType);
  const [duration, setDuration] = useState(item.data.split(' ')[0]);
  const [date, setDate] = useState(new Date(item.date));
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [special, setSpecial] = useState(item.special);
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
    const isSpecial = special;

    const updatedActivity = {
      ...item,
      itemType: activityType,
      data: `${duration} min`,
      date: date.toDateString(),
      special: isSpecial,
    };

    updateActivity(updatedActivity);
    setActivities(activities.map(act => (act.id === item.id ? updatedActivity : act)));
    Alert.alert('Success', 'Activity updated successfully.');
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
    deleteActivity(item.id);
    setActivities(activities.filter(act => act.id !== item.id));
    Alert.alert('Success', 'Activity deleted successfully.');
    navigation.goBack();
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

        {special && (
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={special}
              onValueChange={setSpecial}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Special</Text>
          </View>
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
            pressedFunction={saveActivity}
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
    backgroundColor: '#D2C7E7',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dropDown: {
    borderColor: 'gray',
  },
  dropDownContainer: {
    height: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePicker: {
    marginTop: 20,
    alignSelf: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    height: 40,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  saveButton: {
    backgroundColor: '#4A3C93',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonStyle: {
    marginRight: 15,
  },
});

export default EditActivityScreen;
