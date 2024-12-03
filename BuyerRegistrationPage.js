import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { auth, db } from './firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

const BuyerRegistration = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  // Dropdown state
  const [districtOpen, setDistrictOpen] = useState(false);

  const districtOptions = [
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Coimbatore', value: 'Coimbatore' },
    { label: 'Madurai', value: 'Madurai' },
    { label: 'Tiruchirappalli', value: 'Tiruchirappalli' },
    { label: 'Salem', value: 'Salem' },
    // Add more districts as needed
  ];

  const serviceCategories = ['Haircut', 'Hair Color', 'Styling', 'Shaving', 'Facial'];

  const toggleServiceSelection = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((item) => item !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await setDoc(doc(db, 'buyers', user.uid), {
          name,
          phone,
          email,
          district,
          selectedServices,
          userId: user.uid,
          createdAt: new Date(),
        });

        alert('Buyer information saved successfully!');
      } catch (error) {
        console.error('Error saving buyer data:', error.message);
        alert('Failed to save data, please try again.');
      }
    } else {
      alert('Unable to authenticate. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Buyer Registration</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email (Optional)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* District Dropdown */}
        <Text style={styles.label}>District in Tamil Nadu</Text>
        <DropDownPicker
          open={districtOpen}
          value={district}
          items={districtOptions}
          setOpen={setDistrictOpen}
          setValue={setDistrict}
          style={styles.dropdown}
          placeholder="Select District"
        />

        {/* Service Categories */}
        <Text style={styles.label}>Service Categories</Text>
        {serviceCategories.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.serviceButton,
              selectedServices.includes(service) && styles.selectedService,
            ]}
            onPress={() => toggleServiceSelection(service)}
          >
            <Text
              style={[
                styles.serviceButtonText,
                selectedServices.includes(service) && styles.selectedServiceText,
              ]}
            >
              {service}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Information</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
  },
  serviceButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedService: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
  },
  serviceButtonText: {
    fontSize: 16,
    color: '#000',
  },
  selectedServiceText: {
    color: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BuyerRegistration;
