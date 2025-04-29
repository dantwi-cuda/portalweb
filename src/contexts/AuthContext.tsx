import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { AuthContextType, User, Customer } from "../types";
import { apiService } from "../services/api";
import { toast } from "react-toastify";

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
    localStorage.removeItem(key);
    return null;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [user, setUser] = useState<User | null>(getStoredJson<User>("user"));
  const [customer, setCustomer] = useState<Customer | null>(
    getStoredJson<Customer>("customerContext")
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const clearAuth = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("customerContext");
    setToken(null);
    setUser(null);
    setCustomer(null);
    setIsAdmin(false);
  };

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      if (token) {
        const currentUser = await apiService.getCurrentUser();
        setUser(currentUser);
        setIsAdmin(
          currentUser.role === "admin" || currentUser.role === "customer-admin"
        );

        // If not admin, verify customer context
        if (currentUser.role !== "admin") {
          const domain = window.location.hostname;
          try {
            const customerData = await apiService.checkDomain(domain);
            setCustomer(customerData);
            localStorage.setItem(
              "customerContext",
              JSON.stringify(customerData)
            );
          } catch (error) {
            if (currentUser.role !== "customer-admin") {
              clearAuth();
              throw new Error("Invalid customer domain");
            }
          }
        }
      } else {
        clearAuth();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.login(email, password);

      if (!response.token) {
        throw new Error("Invalid credentials");
      }

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setToken(response.token);
      setUser(response.user);
      setIsAdmin(
        response.user.role === "admin" ||
          response.user.role === "customer-admin"
      );

      // Check domain for non-admin users
      if (response.user.role !== "admin") {
        const domain = window.location.hostname;
        try {
          const customerData = await apiService.checkDomain(domain);
          setCustomer(customerData);
          localStorage.setItem("customerContext", JSON.stringify(customerData));
        } catch (error) {
          if (response.user.role !== "customer-admin") {
            clearAuth();
            throw new Error("Invalid customer domain");
          }
        }
      }

      toast.success("Login successful");
    } catch (error: any) {
      clearAuth();
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    token,
    user,
    isLoading,
    customer,
    isAdmin,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
