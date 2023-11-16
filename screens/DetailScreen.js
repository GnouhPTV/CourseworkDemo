import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailScreen = ({ route }) => {
  const { todo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.name}</Text>
      <Text style={styles.description}>Location: {todo.location}</Text>
      <Text style={styles.description}>Date of the hike: {todo.date}</Text>
      <Text style={styles.description}>Parking available: {todo.park}</Text>
      <Text style={styles.description}>Length of the hike: {todo.length}</Text>
      <Text style={styles.description}>Difficlty level: {todo.level}</Text>
      <Text style={styles.description}>Description: {todo.des}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default DetailScreen;
