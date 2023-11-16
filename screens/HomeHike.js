import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Database from '../Database';

const HomeHike = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getHikes();
        setHikes(data);
      } catch (error) {
        console.log('Error fetching hikes', error);
      }
    };

    fetchData();
  }, [isFocused]);

  const handleDeleteHike = async (id) => {
    await Database.deleteHike(id);
    const data = await Database.getHikes();
    setHikes(data);
  };

  const handleDeleteHikeAll = async () => {
    Database.deleteAllHike();
    const data = await Database.getHikes();
    setHikes(data);
  };

  const renderHikeItem = ({ item }) => (
    <View style={styles.hikeItem}>
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
        onPress={() => navigation.navigate('Hike Detail', { hike: item })}
      >
        <Text style={styles.moreButtonText}>More</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => navigation.navigate('Update Hike', { hike: item })}
      >
        <Text style={styles.moreButtonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteHike(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.deleteAllButton}
        onPress={() => handleDeleteHikeAll()}
      >
        <Text style={styles.deleteButtonText}>Delete All</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 25 }}>This is a Hike list:</Text>
      <ScrollView>
        <FlatList
          data={hikes}
          renderItem={renderHikeItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
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

  hikeItem: {
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

export default HomeHike;
