// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx4E3Eo49cH7FXewLMmJf0facvT39To5I",
  authDomain: "e-commerce-clone-93fee.firebaseapp.com",
  projectId: "e-commerce-clone-93fee",
  storageBucket: "e-commerce-clone-93fee.firebasestorage.app",
  messagingSenderId: "711488152877",
  appId: "1:711488152877:web:b9b9b32f4ea55069061fa4",
  measurementId: "G-DQ9QPH41S0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

export { auth }; // Export auth instance to use in components
