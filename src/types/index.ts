// frontend/src/types/index.ts
export interface User {
    username: string;
    email?: string | null;
    full_name?: string | null;
    disabled?: boolean | null;
  }
  
  export interface TokenResponse {
      access_token: string;
      token_type: string;
  }
  
  // --- New Types ---
  export interface Customer {
      id: number;
      name: string;
      domain_url: string;
      logo_url?: string | null;
  }
  
  export interface ShopLocationStat {
      lat: number;
      lng: number;
      count: number;
      location_name: string;
  }
  
  export interface DashboardStats {
      user_count: number;
      shop_count: number;
      shops_by_location: ShopLocationStat[];
  }
  // ---------------
  
  export interface AuthContextType {
    token: string | null;
    user: User | null;
    isLoading: boolean;
    customer: Customer | null; // <-- Add customer context
    isSuperAdmin: boolean;    // <-- Flag for customer list view
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuthStatus: () => Promise<void>;
  }