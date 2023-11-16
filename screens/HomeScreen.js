import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextBox,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Database from '../Database';

const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getTodos();
        setTodos(data);
      } catch (error) {
        console.log('Error fetching todos', error);
      }
    };

    fetchData();
  }, [isFocused]);

  const handleDeleteTodo = async (id) => {
    await Database.deleteTodo(id);
    const data = await Database.getTodos();
    setTodos(data);
  };

  const handleDeleteTodoAll = async () => {
    Database.deleteAllTodo();
    const data = await Database.getTodos();
    setTodos(data);
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text
        style={{
          fontSize: 15,
          fontStyle: 'italic',
          backgroundColor: 'grey',
          color: 'white',
          paddingRight: 8,
          paddingLeft: 8,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 10,
          width: 150,
        }}
      >
        {item.name}
      </Text>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => navigation.navigate('Hike Detail', { todo: item })}
      >
        <Text style={styles.moreButtonText}>More</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => navigation.navigate('Update Hike', { todo: item })}
      >
        <Text style={styles.moreButtonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTodo(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.deleteAllButton}
        onPress={() => handleDeleteTodoAll()}
      >
        <Text style={styles.deleteButtonText}>Delete All</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 25 }}>This is a Hike list:</Text>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Add new Hike')}
        >
          <Text style={styles.addButtonText}>Add Hike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Observations')}
        >
          <Text style={styles.addButtonText}>Observation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Search Hike')}
        >
          <Text style={styles.addButtonText}>Search Hike</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteAllButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
    marginLeft: 253,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
    position: 'absolute',
    right: 0,
  },
  moreButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 4,
    position: 'absolute',
    right: 60,
  },
  updateButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 4,
    position: 'absolute',
    right: 115,
  },
  deleteButtonText: {
    color: 'white',
  },
  moreButtonText: {
    color: 'white',
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
});

export default HomeScreen;
