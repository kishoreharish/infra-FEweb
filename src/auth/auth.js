import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase-config";  // Import auth and firestore
import { collection, doc, setDoc, getDocs, query, where, onSnapshot } from "firebase/firestore";


// Google Sign-In
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in: ", user);

    // Save user data to Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      displayName: user.displayName,
      email: user.email,
    });

    return user;
  } catch (error) {
    console.error("Error during Google login: ", error.message);
  }
};

// Facebook Sign-In
export const facebookLogin = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in: ", user);

    // Save user data to Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      displayName: user.displayName,
      email: user.email,
    });

    return user;
  } catch (error) {
    console.error("Error during Facebook login: ", error.message);
  }
};

// Add a message to Firestore
export const addMessage = async (message) => {
  try {
    await setDoc(doc(firestore, "messages", Date.now().toString()), {
      content: message,
      timestamp: new Date(),
    });
    console.log("Message added successfully");
  } catch (error) {
    console.error("Error adding message: ", error);
  }
};

// Listen for real-time updates
export const listenForMessages = (callback) => {
    const messagesRef = collection(firestore, "messages");  // Use collection function with firestore
    onSnapshot(messagesRef, snapshot => {
      const messages = snapshot.docs.map(doc => doc.data());
      callback(messages);
    });
  };
