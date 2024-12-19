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

// Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Refresh Token Function
export const refreshAuthToken = async () => {
  try {
    const user = auth.currentUser; // Check if there's a logged-in user
    if (user) {
      const idToken = await user.getIdToken(true); // Force refresh the token
      console.log("Refreshed Token:", idToken); // Send this to your backend
      return idToken; // Return the refreshed token for further use
    } else {
      console.warn("No user is currently logged in.");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Rethrow for handling in other parts of the app
  }
};

// Firestore
export const firestore = getFirestore(app);

// Firebase Messaging Initialization
let messaging = null;
const initializeMessaging = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging(app);
      console.log("Firebase Messaging is supported");
    } else {
      console.warn("Firebase Messaging is not supported in this browser.");
    }
  } catch (error) {
    console.error("Error initializing Firebase Messaging:", error);
  }
};

// Call the messaging initializer only when necessary
initializeMessaging();

export { messaging };
