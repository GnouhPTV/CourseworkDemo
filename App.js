import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Database from './Database';
import DetailScreen from './screens/DetailScreen';
import EntryScreen from './screens/EntryScreen';
import HomeScreen from './screens/HomeScreen';
import UpdateScreen from './screens/UpdateScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hike List">
        <Stack.Screen name="Hike List" component={HomeScreen} />
        <Stack.Screen name="Add new Hike" component={EntryScreen} />
        <Stack.Screen name="Hike Detail" component={DetailScreen} />
        <Stack.Screen name="Update Hike" component={UpdateScreen} />
        <Stack.Screen name="Search Hike" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
