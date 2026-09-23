import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useAppStore } from '../store/appStore';

const CreateCourseScreen = ({ navigation }: any) => {
  const [patientName, setPatientName] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [observations, setObservations] = useState('');
  const { addCourse } = useAppStore();

  const handleCreateCourse = () => {
    if (!patientName || !pickup || !dropoff) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const newCourse: any = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('fr-FR'),
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      patient: patientName,
      pickup,
      dropoff,
      price: 13.95, // Tarif calculé
      status: 'new',
      observations
    };

    addCourse(newCourse);
    Alert.alert('Succès', '✓ Course créée avec succès!');
    setPatientName('');
    setPickup('');
    setDropoff('');
    setObservations('');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nom du Patient</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom Nom"
          value={patientName}
          onChangeText={setPatientName}
        />

        <Text style={styles.label}>Lieu de Prise en Charge</Text>
        <TextInput
          style={styles.input}
          placeholder="Adresse de départ"
          value={pickup}
          onChangeText={setPickup}
        />

        <Text style={styles.label}>Lieu de Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Adresse d'arrivée"
          value={dropoff}
          onChangeText={setDropoff}
        />

        <Text style={styles.label}>Observations Médicales</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Information importante pour le conducteur"
          value={observations}
          onChangeText={setObservations}
          multiline
          numberOfLines={4}
        />

        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Tarif Estimé</Text>
          <Text style={styles.price}>€13.95</Text>
          <Text style={styles.priceInfo}>5 km × €1.30 + prise en charge €2.80</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreateCourse}>
          <Text style={styles.buttonText}>✓ Créer la Course</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  form: {
    padding: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: '#fff'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  priceBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20
  },
  priceLabel: {
    fontSize: 12,
    color: '#666'
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A8B8B',
    marginTop: 4
  },
  priceInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  button: {
    backgroundColor: '#3A8B8B',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
});

export default CreateCourseScreen;
