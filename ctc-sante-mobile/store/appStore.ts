import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'taxi' | 'facility';
}

export interface Course {
  id: string;
  date: string;
  time: string;
  patient: string;
  phone: string;
  pickup: string;
  dropoff: string;
  price: number;
  taxi?: string;
  status: string;
  observations?: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface AppStore {
  user: User | null;
  token: string | null;
  courses: Course[];
  location: Location | null;
  loading: boolean;
  error: string | null;

  setUser: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  addCourse: (course: Course) => void;
  setCourses: (courses: Course[]) => void;
  setLocation: (location: Location) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  token: null,
  courses: [],
  location: null,
  loading: false,
  error: null,

  setUser: async (user: User, token: string) => {
    try {
      await SecureStore.setItemAsync('authToken', token);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      set({ user, token });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('user');
      set({ user: null, token: null, courses: [] });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },

  addCourse: (course: Course) => {
    set((state) => ({
      courses: [course, ...state.courses],
    }));
  },

  setCourses: (courses: Course[]) => {
    set({ courses });
  },

  setLocation: (location: Location) => {
    set({ location });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
