import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import UsersListScreen from './screens/UsersListScreen';
import AboutScreen from './screens/AboutScreen'; 

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Register" component={RegistrationScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Users" component={UsersListScreen} options={{ title: 'Users List' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}