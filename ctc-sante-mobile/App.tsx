import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

// Screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreateCourseScreen from './screens/CreateCourseScreen';
import CoursesListScreen from './screens/CoursesListScreen';
import TaxisStatisticsScreen from './screens/TaxisStatisticsScreen';
import SettingsScreen from './screens/SettingsScreen';

// Store
import { useAppStore } from './store/appStore';

// Types
type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  CreateCourse: undefined;
  CoursesList: undefined;
  TaxisStats: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const { user, setUser, setLocation } = useAppStore();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    checkAuth();
    setupLocation();
    setupNotifications();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const userJson = await SecureStore.getItemAsync('user');

      if (token && userJson) {
        const userData = JSON.parse(userJson);
        setUser(userData, token);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsReady(true);
    }
  };

  const setupLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      }
    } catch (error) {
      console.error('Location error:', error);
    }
  };

  const setupNotifications = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    } catch (error) {
      console.error('Notification setup error:', error);
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            cardStyle: { backgroundColor: '#f9fafb' }
          }}
        >
          {!user ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                animationEnabled: false,
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                  title: 'CTC Santé',
                  headerBackVisible: false,
                }}
              />
              {user.role === 'facility' && (
                <Stack.Screen
                  name="CreateCourse"
                  component={CreateCourseScreen}
                  options={{ title: 'Créer une Course' }}
                />
              )}
              <Stack.Screen
                name="CoursesList"
                component={CoursesListScreen}
                options={{ title: 'Mes Courses' }}
              />
              {user.role === 'admin' && (
                <Stack.Screen
                  name="TaxisStats"
                  component={TaxisStatisticsScreen}
                  options={{ title: 'Suivi des Taxis' }}
                />
              )}
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Paramètres' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar barStyle="dark-content" />
    </>
  );
}
