import axios from 'axios';
import { TokenResponse, User, Customer, DashboardStats } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service Functions
export const loginUser = async (formData: URLSearchParams): Promise<TokenResponse> => {
    // FastAPI's OAuth2PasswordRequestForm expects form data
    const response = await apiClient.post<TokenResponse>('/token', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.data;
};


export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/users/me');
  return response.data;
};

export const checkDomain = async (domain: string): Promise<Customer> => {
  const response = await apiClient.get<Customer>('/customers/check-domain', {
    params: {domain}
  });
  return response.data;
};

export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await apiClient.get<Customer[]>('/customers');
  return response.data;
};

export const getDashboardStats = async (CustomerId?: number): Promise<DashboardStats> => {
  const params = CustomerId ? { customer_id: CustomerId } : {};
  const response = await apiClient.get<DashboardStats>('dashboard-stats', {params});
  return response.data;
}




export default apiClient;