// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);