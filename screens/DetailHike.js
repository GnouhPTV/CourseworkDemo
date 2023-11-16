import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const DetailScreen = ({ route }) => {
  const { hike } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{hike.name}</Text>
        <Text style={styles.description}>Location: {hike.location}</Text>
        <Text style={styles.description}>Date of the hike: {hike.date}</Text>
        <Text style={styles.description}>Parking available: {hike.park}</Text>
        <Text style={styles.description}>
          Length of the hike: {hike.length}
        </Text>
        <Text style={styles.description}>Difficlty level: {hike.level}</Text>
        <Text style={styles.description}>Description: {hike.des}</Text>
      </ScrollView>
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
