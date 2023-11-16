import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Database from './Database';
import DetailScreen from './screens/DetailHike';
import AddHike from './screens/AddHike';
import HomeHike from './screens/HomeHike';
import UpdateHike from './screens/UpdateHike';
import SearchHike from './screens/SearchHike';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hike List">
        <Stack.Screen name="Hike List" component={HomeHike} />
        <Stack.Screen name="Add new Hike" component={AddHike} />
        <Stack.Screen name="Hike Detail" component={DetailScreen} />
        <Stack.Screen name="Update Hike" component={UpdateHike} />
        <Stack.Screen name="Search Hike" component={SearchHike} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
