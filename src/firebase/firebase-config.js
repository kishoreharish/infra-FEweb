// src/firebase/firebase-config.js for Modular SDK

import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id",
};

const app = initializeApp(firebaseConfig);

// Use getMessaging for the modular SDK
const messaging = getMessaging(app);
const firestore = getFirestore(app);

export { messaging, firestore };
