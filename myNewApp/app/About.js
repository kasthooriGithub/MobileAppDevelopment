import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About mobile_app_dev</Text>
      <Text style={styles.description}>
        This app is developed to demonstrate mobile app skills using React Native and Firebase.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#343a40',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c757d',
  },
});

export default AboutScreen;