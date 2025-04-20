// src/utils/firebase.ts
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// Replace with your actual config from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBZhXUZ9KFfqTLuUTpIK8WcIs3vhVjchR4",
  authDomain: "mas-assignment-1-8853b.firebaseapp.com",
  projectId: "mas-assignment-1-8853b",
  storageBucket: "mas-assignment-1-8853b.firebasestorage.app",
  messagingSenderId: "939361361910",
  appId: "1:939361361910:web:3d7634008a04ef634071d7",
  measurementId: "G-HJ6WML79D5"
};

// Initialize Firebase
let app: FirebaseApp;
let authInstance: Auth;

try {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    // const analytics = getAnalytics(app);
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
    // Handle initialization error appropriately
    // For example, you might want to throw the error or set instances to null
    // Depending on how your app should behave if Firebase fails to initialize
    throw error; // Or handle differently
}


export { app, authInstance };