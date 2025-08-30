import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to My Home Screen 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});
