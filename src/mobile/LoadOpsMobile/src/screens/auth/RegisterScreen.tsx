import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  SegmentedButtons,
  useTheme,
} from 'react-native-paper';
import { useAuth } from '../../services/auth/AuthContext';
import { UserType } from '../../types/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    contactPerson: '',
    phone: '',
    address: '',
    gstin: '',
    userType: 'supplier' as UserType,
  });

  const [passwordError, setPasswordError] = useState('');

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');

    // Validate required fields
    const requiredFields = ['email', 'password', 'companyName', 'contactPerson', 'phone', 'address'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      setPasswordError('Please fill in all required fields');
      return;
    }

    await register(formData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Create Account
          </Text>

          <SegmentedButtons
            value={formData.userType}
            onValueChange={value => updateFormData('userType', value)}
            buttons={[
              { value: 'supplier', label: 'Supplier' },
              { value: 'trucker', label: 'Trucker' },
            ]}
            style={styles.segmentedButton}
          />

          <TextInput
            label="Company Name *"
            value={formData.companyName}
            onChangeText={value => updateFormData('companyName', value)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Contact Person Name *"
            value={formData.contactPerson}
            onChangeText={value => updateFormData('contactPerson', value)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Email *"
            value={formData.email}
            onChangeText={value => updateFormData('email', value)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            label="Phone *"
            value={formData.phone}
            onChangeText={value => updateFormData('phone', value)}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            label="Address *"
            value={formData.address}
            onChangeText={value => updateFormData('address', value)}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <TextInput
            label="GSTIN"
            value={formData.gstin}
            onChangeText={value => updateFormData('gstin', value)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Password *"
            value={formData.password}
            onChangeText={value => updateFormData('password', value)}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            label="Confirm Password *"
            value={formData.confirmPassword}
            onChangeText={value => updateFormData('confirmPassword', value)}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          {(error || passwordError) && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {error || passwordError}
            </Text>
          )}

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.button}>
            Register
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}>
            Already have an account? Login
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  segmentedButton: {
    marginBottom: 20,
  },
});

export default RegisterScreen; 