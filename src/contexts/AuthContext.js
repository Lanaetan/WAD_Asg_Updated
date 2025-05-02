import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { doc, addDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig'; 



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  const [isAuthenticated, setIsAuthenticated] = useState(true); // false means not authenticated
  const [loading, setLoading] = useState(true); // NEW


  useEffect(() => {
    const unsub= onAuthStateChanged (auth, (user) => {
      console.log('Auth state changed:', user);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false); // Set loading to false after checking auth state
      return () => {
        unsub(); // Cleanup subscription on unmount
      }
    }
    );
    
  },[]);

  const login = async (email, password) => {
    try{

    }catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    try{
      console.log('Logging out...');
    }catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', response.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });
      return {success: true, data: response.user};
    }catch (error) {
      console.error('Register error:', error);
      let message = error.message;
      if(message.includes('auth/invalid-email')) {
        message = 'Invalid email.';
      }
      return { success: false, message: message }; // Add this line
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>

      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const value = useContext(AuthContext);

  if(!value) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return value;
};
