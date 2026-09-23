import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAppStore } from '../store/appStore';

const TaxisStatisticsScreen = () => {
  const { courses } = useAppStore();

  // Simuler les données des taxis
  const taxis = [
    { id: 1, name: 'Mohammed Yacine' },
    { id: 2, name: 'Fatima Zahra' },
    { id: 3, name: 'Ahmed Kacimi' }
  ];

  const taxiStats = taxis.map(taxi => {
    const taxiCourses = courses.filter(c => c.taxi === taxi.name);
    const revenue = taxiCourses.reduce((sum, c) => sum + (c.price || 0), 0);
    return {
      ...taxi,
      courses: taxiCourses.length,
      revenue: revenue,
      average: taxiCourses.length > 0 ? revenue / taxiCourses.length : 0
    };
  });

  const totalCourses = taxiStats.reduce((sum, t) => sum + t.courses, 0);
  const totalRevenue = taxiStats.reduce((sum, t) => sum + t.revenue, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚕 Suivi des Taxis</Text>
        <Text style={styles.subtitle}>Équilibrage du chiffre d'affaire</Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Courses</Text>
          <Text style={styles.summaryValue}>{totalCourses}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>CA Total</Text>
          <Text style={styles.summaryValue}>€{totalRevenue.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Moy/Taxi</Text>
          <Text style={styles.summaryValue}>€{(totalRevenue / taxis.length).toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Détail par Taxi</Text>
      <View style={styles.table}>
        {taxiStats.map((taxi, index) => (
          <View key={index} style={styles.taxiCard}>
            <Text style={styles.taxiName}>{taxi.name}</Text>
            <View style={styles.taxiStats}>
              <View style={styles.taxiStat}>
                <Text style={styles.taxiStatLabel}>Courses</Text>
                <Text style={styles.taxiStatValue}>{taxi.courses}</Text>
              </View>
              <View style={styles.taxiStat}>
                <Text style={styles.taxiStatLabel}>CA</Text>
                <Text style={styles.taxiStatValue}>€{taxi.revenue.toFixed(2)}</Text>
              </View>
              <View style={styles.taxiStat}>
                <Text style={styles.taxiStatLabel}>Moy</Text>
                <Text style={styles.taxiStatValue}>€{taxi.average.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  header: {
    padding: 16,
    backgroundColor: '#3A8B8B',
    paddingTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4
  },
  summary: {
    flexDirection: 'row',
    padding: 16,
    gap: 12
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666'
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A8B8B',
    marginTop: 4
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12
  },
  table: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  taxiCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },
  taxiName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12
  },
  taxiStats: {
    flexDirection: 'row',
    gap: 12
  },
  taxiStat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8
  },
  taxiStatLabel: {
    fontSize: 11,
    color: '#666'
  },
  taxiStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3A8B8B',
    marginTop: 4
  }
});

export default TaxisStatisticsScreen;
