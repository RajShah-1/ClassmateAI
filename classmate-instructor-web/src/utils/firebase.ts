// src/utils/firebase.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace with your actual config from Firebase console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app: FirebaseApp;
let authInstance: Auth;

try {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
    // Handle initialization error appropriately
    // For example, you might want to throw the error or set instances to null
    // Depending on how your app should behave if Firebase fails to initialize
    throw error; // Or handle differently
}


export { app, authInstance };