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
import { Picker } from '@react-native-picker/picker';
import { auth, db } from './firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

const SellerRegistration = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [experience, setExperience] = useState([]);

  // Service categories (clickable)
  const serviceCategories = ['Haircut', 'Hair Color', 'Styling', 'Shaving', 'Facial'];
  const experiences = ['Toni & Guy', 'Natural', 'Top Hair Salons in Cities'];

  const toggleServiceSelection = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((item) => item !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const toggleExperienceSelection = (exp) => {
    if (experience.includes(exp)) {
      setExperience(experience.filter((item) => item !== exp));
    } else {
      setExperience([...experience, exp]);
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await setDoc(doc(db, 'sellers', user.uid), {
          name,
          phone,
          email,
          gender,
          age,
          district,
          selectedServices,
          experience,
          userId: user.uid,
          createdAt: new Date(),
        });

        alert('Seller information saved successfully!');
      } catch (error) {
        console.error('Error saving seller data:', error.message);
        alert('Failed to save data, please try again.');
      }
    } else {
      alert('Unable to authenticate. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Seller Registration</Text>

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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        {/* Age */}
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        {/* District */}
        <Text style={styles.label}>District in Tamil Nadu</Text>
        <Picker
          selectedValue={district}
          style={styles.picker}
          onValueChange={(itemValue) => setDistrict(itemValue)}
        >
          <Picker.Item label="Select District" value="" />
          <Picker.Item label="Chennai" value="Chennai" />
          <Picker.Item label="Coimbatore" value="Coimbatore" />
          <Picker.Item label="Madurai" value="Madurai" />
          <Picker.Item label="Tiruchirappalli" value="Tiruchirappalli" />
          <Picker.Item label="Salem" value="Salem" />
          {/* Add more districts */}
        </Picker>

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

        {/* Experiences */}
        <Text style={styles.label}>Experience</Text>
        {experiences.map((exp, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.serviceButton,
              experience.includes(exp) && styles.selectedService,
            ]}
            onPress={() => toggleExperienceSelection(exp)}
          >
            <Text
              style={[
                styles.serviceButtonText,
                experience.includes(exp) && styles.selectedServiceText,
              ]}
            >
              {exp}
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
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedService: {
    backgroundColor: '#4e92ff',
  },
  serviceButtonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  selectedServiceText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#4e92ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SellerRegistration;
