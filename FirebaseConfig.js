// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2TAz9iNS10p0k27xhwNnHfD1rTOxzB7Q",
  authDomain: "yamieco-8f10a.firebaseapp.com",
  projectId: "yamieco-8f10a",
  storageBucket: "yamieco-8f10a.appspot.com",
  messagingSenderId: "1068347017803",
  appId: "1:1068347017803:web:a5ee96d2c80a13288e9bce"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);