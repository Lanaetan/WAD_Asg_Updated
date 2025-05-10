import React, { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDBConnection } from '../db-service/database';

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
      const query = `SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1`;
      const results = await db.executeSql(query, [email, password]);
  
      if (results[0].rows.length > 0) {
        const userData = results[0].rows.item(0);
  
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

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('user');
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
  
      // Check if email already exists
      const checkQuery = `SELECT * FROM users WHERE email = ? LIMIT 1`;
      const checkResults = await db.executeSql(checkQuery, [email]);
  
      if (checkResults[0].rows.length > 0) {
        return { success: false, message: 'Email already in use.' };
      }
  
      // Insert new user
      const insertQuery = `INSERT INTO users (name, username, password, email, image, bio) VALUES (?, ?, ?, ?, ?, ?)`;
      await db.executeSql(insertQuery, [name, username, password, email, image, bio]);
  
      // Optionally log or fetch new user data, but do NOT authenticate them yet
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Registration failed due to error.' };
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
