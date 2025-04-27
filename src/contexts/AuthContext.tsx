import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { loginUser, getCurrentUser, checkDomain } from '../services/api';
import { AuthContextType, User, Customer } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Helper to safely parse JSON from localStorage
const getStoredJson = <T,>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
      return JSON.parse(item) as T;
  } catch (e) {
      console.error(`Error parsing stored JSON for key "${key}":`, e);
      localStorage.removeItem(key); // Clear invalid data
      return null;
  }
};


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [user, setUser] = useState<User | null>(null);
  // --- New State ---
  const [customer, setCustomer] = useState<Customer | null>(getStoredJson<Customer>('customerContext'));
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false); // Assume not super admin initially
  // -----------------

  const [isLoading, setIsLoading] = useState<boolean>(true); // Start loading until auth check is done


  const clearCustomerContext = () => {
    localStorage.removeItem('customerContext');
    setCustomer(null);
    setIsSuperAdmin(false); // Reset flag552
  }

  const setCustomerContext = (customerData: Customer) => {
      localStorage.setItem('customerContext', JSON.stringify(customerData));
      setCustomer(customerData);
      setIsSuperAdmin(false); // Definitely not super admin if customer found
  }

  const checkAuthStatus = async () => {
    setIsLoading(true);
    const storedToken = localStorage.getItem('authToken');
    const storedCustomer = getStoredJson<Customer>('customerContext');
   
    if (storedToken) {
      setToken(storedToken); // Set token first
      try {
        // No need to pass token here, interceptor handles it
        const currentUser = await getCurrentUser();
        setUser(currentUser);

            // If token is valid, trust stored customer data for now
            // Or optionally re-validate domain if critical:
            // const currentDomain = window.location.hostname;
            // try {
            //     const validatedCustomer = await checkDomain(currentDomain);
            //     setCustomerContext(validatedCustomer);
            // } catch (domainError) {
            //     console.warn("Domain check failed on reload, treating as super admin or logged out.");
            //     clearCustomerContext();
            //     setIsSuperAdmin(true); // Or logout? Depends on desired behavior
            // }
            if (storedCustomer) {
              setCustomer(storedCustomer);
              setIsSuperAdmin(false);
           } else {
              // If no customer stored, but logged in, assume super admin?
              // This logic might need refinement based on requirements.
              // Let's assume login flow sets this correctly. If token exists
              // but no customer, it implies they didn't log in via a customer domain.
               setIsSuperAdmin(true);
          }
      } catch (error) {
        console.error("Failed to fetch user with stored token", error);
        localStorage.removeItem('authToken'); // Clear invalid token
        setToken(null);
        setUser(null);
      }
      
    }else{
      // No token, clear everything
      clearCustomerContext();
      setToken(null);
      setUser(null);
      setIsSuperAdmin(false);
    }
    setIsLoading(false); // Finished checking
  };

   // Check auth status on initial load
   useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount


  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null); // Assuming an error state exists or should be added
    clearCustomerContext(); // Clear previous customer context on new login attempt

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const tokenData = await loginUser(formData);
      localStorage.setItem('authToken', tokenData.access_token);
      setToken(tokenData.access_token);

      const currentUser = await getCurrentUser(); // Fetch user details
      setUser(currentUser);

      // --- Domain Check ---
      const currentDomain = window.location.hostname; // Or a specific input if login isn't tied to current domain
      console.log("Checking domain:", currentDomain); // Debugging

      try {
        const customerData = await checkDomain(currentDomain);
        console.log("Customer found:", customerData); // Debugging
        setCustomerContext(customerData); // Store customer details
        setIsSuperAdmin(false);

      } catch (domainError: any) {
        // Assuming 404 means not a customer domain
         if (domainError.response && domainError.response.status === 404) {
            console.log("Domain not found, assuming super admin."); // Debugging
            setIsSuperAdmin(true); // Set flag for customer list view
            clearCustomerContext(); // Ensure no stale customer data
         } else {
             // Handle other potential errors during domain check
             console.error("Error checking domain:", domainError);
             throw new Error("Failed to verify customer domain."); // Propagate error
         }
      }
      // --- End Domain Check ---

    // Error state handling would go here
    // setError(null); // Clear error on success

    } catch (error: any) {
      console.error("Login process failed:", error);
      localStorage.removeItem('authToken');
      clearCustomerContext(); // Clear customer on login failure
      setToken(null);
      setUser(null);
      setIsSuperAdmin(false); // Reset flag

     // Propagate error for LoginPage to display
      if (error.response && error.response.data && error.response.data.detail) {
            throw new Error(error.response.data.detail);
        } else if (error.message) {
             throw error; // Rethrow specific errors (like domain check failure)
        }
        else {
            throw new Error('Login failed. Please check credentials or try again later.');
        }
    } finally {
        setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    clearCustomerContext(); // Clear customer on logout
    setToken(null);
    setUser(null);
    setIsSuperAdmin(false); // Reset flag
    // Navigation back to login will be handled by PrivateRoute/App routing
  };

  // --- Add Error State (Example) ---
  const [error, setError] = useState<string | null>(null); // Add error state if needed

  return (
    <AuthContext.Provider value={{ token, user, isLoading, customer, isSuperAdmin, login, logout, checkAuthStatus }}>
      {!isLoading && children} {/* Render children only when not loading initially */}
      {/* Or keep the loading spinner logic in PrivateRoute */}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  // ... useAuth hook remains the same ...
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};