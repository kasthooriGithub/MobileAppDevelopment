import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { db } from '../firebase'; 
import { collection, addDoc } from '@firebase/firestore'; // Changed from "firebase/firestore"

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    // --- Validation ---
    if (name.length < 3) {
      Alert.alert('Validation Error', 'Name must be at least 3 characters');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Validation Error', 'Invalid email');
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      Alert.alert('Validation Error', 'Phone must be 10 digits and numeric');
      return;
    }

    // --- Submit to Firestore ---
    try {
      setLoading(true);
      await addDoc(collection(db, 'users'), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        timestamp: new Date(),
      });

      // Clear form
      setName('');
      setEmail('');
      setPhone('');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      Alert.alert('Success', 'Registration successful!');

    } catch (err) {
      console.error('Error adding document: ', err);
      Alert.alert('Error', 'Error submitting form. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration Form</Text>

      {/* Name Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName} // onChangeText 
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address" // Email keyboard type
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Phone Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="numeric" // Numeric keyboard type
          maxLength={10} 
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Submit Button */}
      <Button
        title={loading ? 'Submitting...' : 'Register'}
        onPress={handleSubmit}
        disabled={loading}
        color="#007bff" // Bootstrap primary colour
      />

      {/* Success Message (Optional, can be replaced by Alert) */}
      {/* {success && (
        <Text style={styles.successMessage}>Registration successful!</Text>
      )} */}

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Submitting...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#343a40',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#343a40',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  // If you want a success message to appear on screen instead of just an alert
  successMessage: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // Occupy full screen
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure it's on top
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#343a40',
  }
});

export default RegistrationScreen;