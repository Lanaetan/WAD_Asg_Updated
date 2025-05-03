import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { doc, addDoc, setDoc, getDoc } from 'firebase/firestore';
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
        updateUserData(user.uid); // Call the function to update user data in Firestore
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

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    }
  }

  const login = async (email, password) => {
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {success: true};
    }catch (error) {
      console.error('Login error:', error);
      let message = error.message;
      if(message.includes('auth/invalid-email')) {
        message = 'Invalid email.';
      }
      if(message.includes('auth/invalid-credentials')) {
        message = 'Wrong credentials.';
      }
      return { success: false, message: message }; 
    }
  };

  const logout = async () => {
    try{
      console.log('Logging out...');
      await auth.signOut();
      return {success: true};
    }catch (error) {
      console.error('Logout error:', error);
      return {success: false, message: error.message, error: error};
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
      if(message.includes('auth/email-already-in-use')) {
        message = 'Email already in use.';
      }
      if(message.includes('auth/weak-password')) {
        message = 'Password should be at least 6 characters.';
      }
      return { success: false, message: message }; 
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
