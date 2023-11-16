import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Database from '../Database';
import DateTimePicker from '@react-native-community/datetimepicker';

const EntryScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [park, setPark] = useState('');
  const [length, setLength] = useState('');
  const [level, setLevel] = useState(null);
  const [des, setDes] = useState('');

  const [dob, setDOB] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDOB(currentDate);

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const handleAddTodo = async () => {
    if (!name || !location || !date || !park || !length || !level || !des) {
      Alert.alert('Error', 'All required fields must be field');
      return;
    } else {
      Alert.alert(
        'Confirmation',
        `New Hike will be add: \n
        Name: ${name} \n
        Location: ${location}\n
        Date: ${date} \n
        Parking available: ${park} \n
        Length of Hike: ${length} \n
        Difficulty level: ${level}`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              Database.addTodo(name, location, date, park, length, level, des);
              navigation.goBack();
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />
        <View>
          <Text style={styles.label}>Date:</Text>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={dob}
              onChange={onChange}
            />
          )}
          {!showPicker && (
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="Enter Date"
                editable={false}
              />
            </Pressable>
          )}
        </View>
        <Text style={styles.label}>Parking available:</Text>
        <View style={styles.wrapper}>
          {['Yes', 'No'].map((parking) => (
            <View key={parking} style={styles.parkstyle}>
              <Text style={styles.parkstyles}>{parking}</Text>
              <TouchableOpacity
                style={styles.outter}
                value={park}
                onPress={() => setPark(parking)}
              >
                {park === parking && <View style={styles.inner} />}
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text style={styles.label}>Length of the hike:</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={length}
          onChangeText={setLength}
          placeholder="Enter Length of the hike"
        />

        <Text style={styles.label}>Difficlty level:</Text>
        <TextInput
          style={styles.input}
          value={level}
          onChangeText={setLevel}
          placeholder="Enter difficult level"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={des}
          onChangeText={setDes}
          placeholder="Enter description"
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add Hike</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  outter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
  },
  inner: {
    width: 12,
    height: 12,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  parkstyle: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  parkstyles: {
    fontSize: 22,
    textTransform: 'capitalize',
  },
});

export default EntryScreen;
