import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to mobile_app_dev</Text>
      <Text style={styles.subtitle}>Manage your data efficiently using our mobile app.</Text>

      {/* "Register" button */}
      <Button
        title="Register"
        onPress={() => router.push('Register')}
        color="#007bff"
      />
      
      
      <View style={styles.buttonSpacing} /> 

      {/* "View Users" button */}
      <Button
        title="View Users"
        onPress={() => router.push('Users')}
        color="#28a745" 
      />

      
      <View style={styles.buttonSpacing} />

      {/* "About" button */}
      <Button
        title="About"
        onPress={() => router.push('About')}
        color="#6c757d"
      />
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
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#6c757d',
  },

  buttonSpacing: {
      height: 15,
  },
});

export default HomeScreen;
