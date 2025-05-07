// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5jLRvCrPweR50Tp3K-wxCy7BwFFXXwlg",
  authDomain: "wadsocialmediaapp.firebaseapp.com",
  projectId: "wadsocialmediaapp",
  storageBucket: "wadsocialmediaapp.firebasestorage.app",
  messagingSenderId: "393052690276",
  appId: "1:393052690276:web:5ef204ea27d4e780040c71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');