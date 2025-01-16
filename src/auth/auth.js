import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  createUserWithEmailAndPassword, 
  getIdToken 
} from 'firebase/auth';
import { auth, firestore } from '../firebase/firebase-config';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import React, { useState } from "react";

// Google Sign-In
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log('Google Login Successful:', user);

    // Save user data to Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      displayName: user.displayName,
      email: user.email,
    });

    return user;
  } catch (error) {
    console.error('Error during Google login:', error.message);
    throw error;
  }
};

// Facebook Sign-In
export const facebookLogin = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log('Facebook Login Successful:', user);

    // Save user data to Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      displayName: user.displayName,
      email: user.email,
    });

    return user;
  } catch (error) {
    console.error('Error during Facebook login:', error.message);
    throw error;
  }
};

// Firebase Signup with Email and Password
export const signupWithFirebase = async (email, password, role = 'candidate') => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    console.log('Firebase Signup Successful:', user);

    // Save user data to Django backend
    const idToken = await getIdToken(user);
    const response = await axios.post('http://127.0.0.1:8000/api/users/signup/', {
      email: user.email,
      firebaseUid: user.uid,
      role, // Default to candidate unless specified
    }, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    console.log('User created in Django:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during Firebase signup:', error.message);
    throw error;
  }
};

// Firebase Login
// export const firebaseLogin = async (email, password) => {
//   try {
//     const result = await auth.signInWithEmailAndPassword(email, password);
//     const user = result.user;

//     const idToken = await getIdToken(user);
//     const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
//       profile_type: 'candidate', // Adjust as necessary
//     }, {
//       headers: {
//         Authorization: `Bearer ${idToken}`,
//       },
//     });

//     if (response.data.success) {
//       console.log('Login Successful:', response.data);
//       localStorage.setItem('token', response.data.token); // Save backend token
//       return response.data;
//     } else {
//       throw new Error(response.data.message || 'Login failed');
//     }
//   } catch (error) {
//     console.error('Error during Firebase login:', error.message);
//     throw error;
//   }
// };
export const firebaseLogin = async (email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login Successful:", data);
      localStorage.setItem("token", data.access); // Store the access token
      return data;
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

// Real-time Firestore Updates
export const listenForMessages = (callback) => {
  const messagesRef = collection(firestore, 'messages');
  onSnapshot(messagesRef, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data());
    callback(messages);
  });
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
    throw error;
  }
};


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login/", { email, password });
      const { token, uid } = response.data;
      const { access, refresh, user } = response.data;

      // Save token and UID in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("uid", uid);

      // Redirect to candidate profile page
      window.location.href = "/candidate-profile";
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;