import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import Database from '../Database';
import filter from 'lodash.filter';
import { useIsFocused } from '@react-navigation/native';

const SearchScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await Database.getTodos();
        setTodos(data);
        setIsLoading(false);
        setFullData(data);
      } catch (error) {
        console.log('Error fetching todos', error);
      }
    };
    fetchData();
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'#5500dc'} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Error in fetching data ... Please check your internet connect
        </Text>
      </View>
    );
  }
  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setTodos(filteredData);
  };

  const contains = ({ name, location, date, level }, query) => {
    if (
      name.includes(query) ||
      location.includes(query) ||
      date.includes(query) ||
      level.includes(query)
    ) {
      return true;
    }
    return false;
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => navigation.navigate('Hike Detail', { todo: item })}
      >
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
            width: 320,
          }}
        >
          Name: {item.name}
        </Text>
        <Text>Location: {item.location}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Level: {item.level}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default SearchScreen;
