'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
export interface User {
  username: string;
  role: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: string) => Promise<boolean>;
  register: (username: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: true,
});

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string, role: string): Promise<boolean> => {
    try {
      console.log("login réussi");
      
      // Simple validation
      if (!username || !password) {
        return false;
      }
      
      // Create user object
      const newUser = { username, role };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Register function
  const register = async (username: string, password: string, role: string): Promise<boolean> => {
    try {
      console.log("Register réussi");

      if (!username || !password) {
        return false;
      }

      const newUser = { username, role };
      
      // Store  localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);