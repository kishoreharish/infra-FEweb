import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth, firestore } from '../firebase/firebase-config';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

// Google Sign-In
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('User signed in:', user);

    // Save user data to Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      displayName: user.displayName,
      email: user.email,
    });

    return user;
  } catch (error) {
    console.error('Error during Google login:', error.message);
  }
};

// Facebook Sign-In
export const facebookLogin = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('User signed in:', user);

    // Save user data to Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      displayName: user.displayName,
      email: user.email,
    });

    return user;
  } catch (error) {
    console.error('Error during Facebook login:', error.message);
  }
};

// Add a message to Firestore
export const addMessage = async (message) => {
  try {
    await setDoc(doc(firestore, 'messages', Date.now().toString()), {
      content: message,
      timestamp: new Date(),
    });
    console.log('Message added successfully');
  } catch (error) {
    console.error('Error adding message:', error);
  }
};

// Listen for real-time updates
export const listenForMessages = (callback) => {
  const messagesRef = collection(firestore, 'messages');
  onSnapshot(messagesRef, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data());
    callback(messages);
  });
};


// After Firebase successful sign-up (Google/Facebook/Email)
const handleSignUp = async () => {
  try {
    // Assuming the user is already logged in via Firebase (Google/Facebook/Email)
    const user = auth.currentUser;  // Firebase user object

    // Send the user data to the Django API to create the user in the Django database
    const response = await fetch('http://127.0.0.1:8000/api/users/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        firebaseUid: user.uid,
        displayName: user.displayName,
      }),
    });

    if (response.ok) {
      console.log('User created in Django');
    }
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

const signupWithFirebase = async (email, password) => {
  try {
    // Sign up with Firebase (email and password)
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Send user data to Django backend
    const response = await axios.post('/api/users/signup/', {
      email: user.email,
      firebaseUid: user.uid,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      role: 'candidate',  // Default role, adjust as needed
    });

    console.log('User signed up:', response.data);
  } catch (error) {
    console.error('Error signing up with Firebase:', error.message);
  }
};

const handleSignup = async (email, password) => {
  try {
    // Sign up with Firebase email/password
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    
    // Get the Firebase ID token after sign-up
    const user = firebase.auth().currentUser;
    const idToken = await user.getIdToken();

    // Send the token to your Django backend to create the user profile
    await axios.post('/api/users/create-profile/', { token: idToken });
  } catch (error) {
    console.error(error);
  }
};

const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  },
  body: JSON.stringify({ profile_type: profileType }),
});

if (!response.ok) {
  // Handle error
  console.error('Error:', response.statusText);
  return;
}

const contentType = response.headers.get("content-type");
if (contentType && contentType.includes("application/json")) {
  const data = await response.json();
  if (data.success) {
    localStorage.setItem("token", data.token); // Store backend token
    closeModal();
  } else {
    setError(data.message); // Handle backend validation errors
  }
} else {
  const htmlResponse = await response.text(); // If it's not JSON, log the response
  console.error('Non-JSON response:', htmlResponse);
}
