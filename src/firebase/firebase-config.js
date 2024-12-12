// src/firebase/firebase-config.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyD9VjkuYP77zHZRUSTMm9_txLKGolCpuCs",
  authDomain: "infrajobs-6e2ab.firebaseapp.com",
  projectId: "infrajobs-6e2ab",
  storageBucket: "infrajobs-6e2ab.appspot.com",
  messagingSenderId: "306685778388",
  appId: "1:306685778388:web:7b5acf055f7d9781e3de41",
  measurementId: "G-TG0GZ5M247",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firebase Authentication Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Initialize Firestore
export const firestore = getFirestore(app);

// Initialize Firebase Messaging (if supported)
let messaging;
(async () => {
  const supported = await isSupported();
  if (supported) {
    messaging = getMessaging(app);
    console.log("Firebase Messaging is supported");
  } else {
    console.warn("Firebase Messaging is not supported in this browser.");
  }
})();

// Export messaging for later use
export { messaging };
