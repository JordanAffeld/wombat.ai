export type UserType = 'supplier' | 'trucker';

export interface UserCredentials {
  email: string;
  password: string;
  userType: UserType;
}

export interface RegistrationData extends UserCredentials {
  companyName: string;
  contactPerson: string;
  phone: string;
  address: string;
  gstin?: string; // GST Identification Number for Indian businesses
}

export interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    email: string;
    companyName: string;
    userType: UserType;
  };
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: UserCredentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
} 