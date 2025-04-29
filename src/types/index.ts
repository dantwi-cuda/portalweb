// frontend/src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer-admin' | 'user';
  username: string;
  full_name?: string;
  [key: string]: any;
}

export interface Customer {
  id: string;
  name: string;
  domain: string;
  logo_url?: string;
  domain_url?: string;
  settings?: {
    [key: string]: any;
  };
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  customer: Customer | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

export interface ShopLocationStat {
  id: string;
  name: string;
  lat: number;
  lng: number;
  count: number;
  location_name: string;
  status: 'active' | 'inactive';
}

export interface DashboardStats {
  user_count: number;
  shop_count: number;
  shopLocations: ShopLocationStat[];
}