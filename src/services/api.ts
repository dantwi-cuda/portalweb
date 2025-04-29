import axios from 'axios';
import { DashboardStats } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API Error class
export class APIError extends Error {
    constructor(message: string, public status?: number, public data?: any) {
        super(message);
        this.name = 'APIError';
    }
}

export const endpoints = {
    login: '/auth/login',
    users: '/users',
    workspaces: '/workspaces',
    reportCategories: '/report-categories',
    reports: '/reports',
    shops: '/shops',
    customers: '/customers',
    powerBiReports: '/powerbi-reports',
    dashboard: '/dashboard',
    currentUser: '/auth/me',
    checkDomain: '/customers/check-domain',
};

// Helper to handle API errors
const handleApiError = (error: any): never => {
    if (error.response) {
        throw new APIError(
            error.response.data.message || 'An error occurred',
            error.response.status,
            error.response.data
        );
    }
    throw new APIError('Network error occurred');
};

// Export these functions directly
export const getAllCustomers = async () => {
    try {
        const response = await api.get(endpoints.customers);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
    try {
        const response = await api.get(endpoints.dashboard + '/stats');
        return response.data;
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            const apiError = error as { response?: { status: number } };
            if (apiError.response?.status === 501) {
                throw new APIError('API not implemented', 501);
            }
        }
        throw handleApiError(error);
    }
};

// API methods
export const apiService = {
    async login(username: string, password: string) {
        try {
            const response = await api.post(endpoints.login, { username, password });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async getUsers(params?: any) {
        try {
            const response = await api.get(endpoints.users, { params });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async getCurrentUser() {
        try {
            const response = await api.get(endpoints.currentUser);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async checkDomain(domain: string) {
        try {
            const response = await api.get(endpoints.checkDomain, {
                params: { domain }
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    getAllCustomers,
    getDashboardStats,
};

export default apiService;