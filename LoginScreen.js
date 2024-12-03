import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, signInAnonymously } from './firebaseConfig'; // Ensure firebaseConfig is correctly set up
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Logging the auth object to make sure it's initialized properly
    console.log("Firebase Auth initialized:", auth);

    signInAnonymously(auth)
      .then(() => {
        console.log('Logged in anonymously');
      })
      .catch((error) => {
        console.error('Anonymous login failed:', error.message);
        alert('Unable to log in. Please try again.');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Role</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SellerRegistration')}
      >
        <Text style={styles.buttonText}>I am a Seller</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BuyerRegistration')}
      >
        <Text style={styles.buttonText}>I am a Buyer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4e92ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
