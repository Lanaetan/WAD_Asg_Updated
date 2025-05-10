import React, { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDBConnection } from '../db-service/database';
import { getUserByEmail, authenticateUser, createUser, getUserById } from '../db-service/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to load stored user:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Please fill in both email and password.' };
    }
  
    if (!email.includes('@')) {
      return { success: false, message: 'Invalid email format.' };
    }
  
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }
  
    try {
      const db = await getDBConnection();
      const userData = await authenticateUser(db, email, password);

      if (userData) {
        const currentUser = {
          id: userData.id,
          name: userData.name,
          username: userData.username,
          password: userData.password,
          email: userData.email,
          image: userData.image,
          bio: userData.bio,
        };

        setUser(currentUser);
        setIsAuthenticated(true);
        await AsyncStorage.setItem('user', JSON.stringify(currentUser));
        return { success: true };

      } else {
        return { success: false, message: 'Invalid email or password.' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: 'Login failed due to an error.' };
    }
  };

  const register = async (name, username, password, email, image, bio) => {
    try {
      if (!email || !password || !username) {
        return { success: false, message: 'Please fill in all required fields.' };
      }
      // Email format validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        return { success: false, message: 'Invalid email format.' };
      }
      // Password length validation
      if (password.length < 6) {
        return { success: false, message: 'Password should be at least 6 characters.' };
      }
      // Username length validation
      if (username.length < 3 || username.length > 20) {
        return { success: false, message: 'Username must be between 3 and 20 characters.' };
      }
    
      const db = await getDBConnection();
      const existingUser = await getUserByEmail(db, email);

      if (existingUser) {
        return { success: false, message: 'Email already in use.' };
      }

      await createUser(db, name, username, password, email, image, bio);
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Registration failed due to error.' };
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('user');
  };

  const refreshUser = async () => {
  try {
    if (!user || !user.id) return; // Prevents accessing properties of null
    const db = await getDBConnection();
    const updatedUser = await getUserById(db, user.id);

    if (updatedUser) {
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  } catch (error) {
    console.error('Failed to refresh user:', error);
  }
};

  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};