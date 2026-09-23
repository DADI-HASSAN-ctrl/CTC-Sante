import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAppStore } from '../store/appStore';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'taxi' | 'facility'>('facility');
  const { setUser } = useAppStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // Données de test
    const testUsers: Record<string, any> = {
      'admin@ctc-sante.test': { name: 'Admin', role: 'admin' },
      'taxi1@test.fr': { name: 'Mohammed Yacine', role: 'taxi' },
      'hopital@test.fr': { name: 'CHU Lille', role: 'facility' }
    };

    const user = testUsers[email];
    if (user && password === 'password') {
      await setUser(
        { id: '1', email, name: user.name, role: user.role },
        'mock_jwt_token'
      );
    } else {
      Alert.alert('Erreur', 'Identifiants invalides\n\nComptes de test:\nadmin@ctc-sante.test\ntaxi1@test.fr\nhopital@test.fr\n\nMot de passe: password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚕 CTC Santé</Text>
        <Text style={styles.subtitle}>Gestion des Transports Médicaux</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="votre@email.fr"
          value={email}
          onChangeText={setEmail}
          editable={true}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se Connecter</Text>
        </TouchableOpacity>

        <View style={styles.testAccounts}>
          <Text style={styles.testTitle}>Comptes de Test:</Text>
          <Text style={styles.testAccount}>👨‍💼 admin@ctc-sante.test</Text>
          <Text style={styles.testAccount}>🚕 taxi1@test.fr</Text>
          <Text style={styles.testAccount}>🏥 hopital@test.fr</Text>
          <Text style={styles.testAccount}>Mot de passe: password</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
    justifyContent: 'center'
  },
  header: {
    marginBottom: 40,
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3A8B8B',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#666'
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
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
    fontSize: 14
  },
  button: {
    backgroundColor: '#3A8B8B',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  testAccounts: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  testTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8
  },
  testAccount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  }
});

export default LoginScreen;
