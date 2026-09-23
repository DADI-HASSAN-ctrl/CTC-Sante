import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAppStore } from '../store/appStore';

const CoursesListScreen = () => {
  const { courses } = useAppStore();

  return (
    <ScrollView style={styles.container}>
      {courses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyText}>Aucune course</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {courses.map((course, index) => (
            <View key={index} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <Text style={styles.patient}>{course.patient}</Text>
                <View style={[styles.badge, styles[course.status as keyof typeof styles]]}>
                  <Text style={styles.badgeText}>{course.status === 'new' ? 'Nouveau' : course.status}</Text>
                </View>
              </View>
              <View style={styles.courseDetails}>
                <Text style={styles.detail}>📍 {course.pickup}</Text>
                <Text style={styles.detail}>→ {course.dropoff}</Text>
                <Text style={styles.detail}>⏰ {course.date} {course.time}</Text>
                <Text style={styles.price}>💰 €{course.price?.toFixed(2)}</Text>
              </View>
              {course.observations && (
                <Text style={styles.observations}>📝 {course.observations}</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  list: {
    padding: 16
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16
  },
  emptyText: {
    fontSize: 16,
    color: '#999'
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  patient: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },
  new: {
    backgroundColor: '#dbeafe'
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0369a1'
  },
  courseDetails: {
    marginBottom: 8
  },
  detail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    marginTop: 8
  },
  observations: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  }
});

export default CoursesListScreen;
