import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';  // Import the login screen
import SellerRegistration from './SellerRegistrationPage';
import BuyerRegistration from './BuyerRegistrationPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SellerRegistration" component={SellerRegistration} />
        <Stack.Screen name="BuyerRegistration" component={BuyerRegistration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
