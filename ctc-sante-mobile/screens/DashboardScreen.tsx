import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAppStore } from '../store/appStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = any;
type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen = ({ navigation }: Props) => {
  const { user, courses, logout } = useAppStore();

  const menuItems = [
    { label: 'Mes Courses', icon: '📋', screen: 'CoursesList', roles: ['taxi', 'facility', 'admin'] },
    { label: 'Créer Course', icon: '➕', screen: 'CreateCourse', roles: ['facility', 'admin'] },
    { label: 'Suivi Taxis', icon: '🚕', screen: 'TaxisStats', roles: ['admin'] },
    { label: 'Paramètres', icon: '⚙️', screen: 'Settings', roles: ['taxi', 'facility', 'admin'] }
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role || 'facility'));
  const totalCourses = courses.length;
  const totalRevenue = courses.reduce((sum, c) => sum + (c.price || 0), 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bienvenue 👋</Text>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.role}>
          {user?.role === 'admin' ? '👨‍💼 Administrateur' : user?.role === 'taxi' ? '🚕 Taxi' : '🏥 Établissement'}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{totalCourses}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>€{totalRevenue.toFixed(2)}</Text>
          <Text style={styles.statLabel}>CA</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Accès Rapide</Text>
      <View style={styles.menuContainer}>
        {filteredMenu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.logoutText}>🚪 Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16
  },
  header: {
    marginBottom: 24
  },
  greeting: {
    fontSize: 14,
    color: '#666'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4
  },
  role: {
    fontSize: 14,
    color: '#3A8B8B',
    marginTop: 4
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24
  },
  stat: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A8B8B'
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12
  },
  menuContainer: {
    gap: 8,
    marginBottom: 24
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333'
  },
  menuArrow: {
    color: '#3A8B8B',
    fontSize: 16
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  }
});

export default DashboardScreen;
