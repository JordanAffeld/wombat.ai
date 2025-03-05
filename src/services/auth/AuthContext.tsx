import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, AuthState, UserCredentials, RegistrationData } from '../../types/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const login = async (credentials: UserCredentials) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      const user = {
        id: '1',
        email: credentials.email,
        companyName: 'Test Company',
        userType: credentials.userType,
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      setState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during login',
      }));
    }
  };

  const register = async (data: RegistrationData) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      const user = {
        id: '1',
        email: data.email,
        companyName: data.companyName,
        userType: data.userType,
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      setState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during registration',
      }));
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setState(initialState);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 