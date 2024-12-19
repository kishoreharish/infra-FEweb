import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Correct import for CheckCircleIcon
import GoogleIcon from "@mui/icons-material/Google"; // Correct import for Google icon
import FacebookIcon from "@mui/icons-material/Facebook"; // Correct import for Facebook icon
import styles from "./authcomponents.module.scss"; // Import the SCSS module
import logo from "../../assets/images/infrajobs.jpg"; // Import the logo image
import Cookies from "js-cookie"; // Install with `npm install js-cookie`
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../../firebase/firebase-config"; // Import providers from Firebase config

const SocialLogin = ({ closeModal, profileType, setError }) => {
  const handleSocialLogin = async (provider, providerName) => {
    try {
      // Open social login popup (Google/Facebook)
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Fetch the Firebase ID Token for the user
      const idToken = await user.getIdToken(); // This is what we send to the backend
  
      // Check if profileType is selected (Candidate or Employer)
      if (!profileType) {
        setError("Please select a profile type before logging in.");
        return;
      }
  
      console.log("ID Token Retrieved:", idToken); // For debugging (optional)
  
      // Send the token to your backend
      const response = await fetch("http://127.0.0.1:8000/api/auth/social-login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_token: idToken, // Send the Firebase token
          profile_type: profileType.toLowerCase(), // Send the profile type
        }),
      });
  
      const data = await response.json();
      console.log(`${providerName} Login Response:`, data); // Debugging (optional)
  
      // If the backend says login is successful
      if (response.ok && data.message === "User authenticated successfully") {
        console.log("Login Successful");
        localStorage.setItem("token", idToken); // Save token for later use (optional)
        closeModal(); // Close the login modal
      } else {
        setError(data.error || "Social login failed. Please try again.");
      }
    } catch (error) {
      console.error(`Error with ${providerName} login:`, error.message);
      setError(`Error with ${providerName} login: ${error.message}`);
    }
  };
  
  

  return (
    <>
      <button
        className={styles.socialButton1}
        onClick={() => handleSocialLogin(googleProvider, "Google")}
      >
        <GoogleIcon /> Login with Google
      </button>
      <button
        className={styles.socialButton2}
        onClick={() => handleSocialLogin(facebookProvider, "Facebook")}
      >
        <FacebookIcon /> Login with Facebook
      </button>
    </>
  );
};

const AuthComponents = ({ closeModal }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileType, setProfileType] = useState(null); // State for profile type
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(""); // New state for custom alert message
  const [user, setUser] = useState(null); // Store user data

  useEffect(() => {
    // Listen for authentication state changes and fetch the current user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Retrieve and store the token in localStorage
        getIdToken(currentUser).then((idToken) => {
          localStorage.setItem("token", idToken); // Store token in localStorage
        });
      } else {
        setUser(null);
        localStorage.removeItem("token"); // Clear token when logged out
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle regular email/password login
  const handleLogin = async () => {
    if (!profileType) {
      setAlertMessage("Please select a profile type (Candidate or Employer).");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the Firebase token
      const idToken = await getIdToken(user);

      // Send the token to your backend for validation
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          profile_type: profileType.toLowerCase(),
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        closeModal();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    if (!profileType) {
      setAlertMessage("Please select a profile type (Candidate or Employer).");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const response = await fetch("http://127.0.0.1:8000/api/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          profile_type: profileType.toLowerCase(),
          firebase_uid: user.uid,
        }),
      });

      const data = await response.json();
      console.log("Signup response:", data);
      if (data.success) {
        closeModal();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.logoAndGoBack}>
          <div className={styles.logo}>
            <img src={logo} alt="InfraJobs Logo" className={styles.logo} />
          </div>
          <button className={styles.goBackBtn} onClick={closeModal}>
            <GoArrowLeft /> <b>Go back</b>
          </button>
        </div>
        {showLogin ? (
          <div className={styles.authContent}>
            <h2 className={styles.loginText}>Login</h2>
            <p className={styles.enterEmailText}>
              Enter your email and password to log in
            </p>
            <div className={styles.profileTypeSelection}>
              <label>
                <input
                  type="radio"
                  value="Candidate"
                  checked={profileType === "Candidate"}
                  onChange={(e) => setProfileType(e.target.value)}
                />
                Candidate
              </label>
              <label>
                <input
                  type="radio"
                  value="Employer"
                  checked={profileType === "Employer"}
                  onChange={(e) => setProfileType(e.target.value)}
                />
                Employer
              </label>
            </div>
            {alertMessage && <p className={styles.alertMessage}>{alertMessage}</p>}
            {error && <p className={styles.errorText}>{error}</p>}
            <input
              type="email"
              placeholder="Email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.loginBtn} onClick={handleLogin}>
              Login
            </button>
            <SocialLogin closeModal={closeModal} profileType={profileType} setError={setError} />
            <p className={styles.p}>
              Don&apos;t have an account?{' '}
              <span
                className={styles.link}
                onClick={() => setShowLogin(false)}
              >
                Sign Up here
              </span>
            </p>
          </div>
        ) : (
          <div className={styles.authContent}>
            <h2 className={styles.signInText}>Sign Up</h2>
            <p className={styles.enterEmailText}>
              Enter your email, create a password, and select your profile type
            </p>
            <div className={styles.profileTypeSelection}>
              <label>
                <input
                  type="radio"
                  value="Candidate"
                  checked={profileType === "Candidate"}
                  onChange={(e) => setProfileType(e.target.value)}
                />
                Candidate
              </label>
              <label>
                <input
                  type="radio"
                  value="Employer"
                  checked={profileType === "Employer"}
                  onChange={(e) => setProfileType(e.target.value)}
                />
                Employer
              </label>
            </div>
            {alertMessage && <p className={styles.alertMessage}>{alertMessage}</p>}
            {error && <p className={styles.errorText}>{error}</p>}
            <input
              type="email"
              placeholder="Email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.sendOtpBtn} onClick={handleSignUp}>
              Sign Up
            </button>
            <SocialLogin closeModal={closeModal} profileType={profileType} setError={setError} />
            <p className={styles.p}>
              Have an account already?{' '}
              <span
                className={styles.link}
                onClick={() => setShowLogin(true)}
              >
                Login here
              </span>
            </p>
          </div>
        )}
      </div>
      {/* Right Column (Hidden on smaller screens) */}
      <div className={styles.rightColumn}>
        <img
          src="https://img.freepik.com/free-vector/blue-abstract-line-background_1409-893.jpg?t=st=1733919225~exp=1733922825~hmac=578c6f75dd4350101c927f567c5fd8353c37486b61296b96606206c0d7180584&w=1380"
          alt="Background"
          className={styles.backgroundImage}
        />
        <div className={styles.card}>
          <div className={styles.iconsContainer}>
            <span className={styles.icon}>Icon 1</span>
            <span className={styles.icon}>Icon 2</span>
          </div>
          <h3 className={styles.cardTitle}>Card Title</h3>
          <h4 className={styles.cardSubtitle}>Card Subtitle</h4>
          <hr className={styles.divider} />
          <h5 className={styles.contentTitle}>Content Title</h5>
          <div className={styles.ticksContent}>
            <div className={styles.tickItem}>
              <CheckCircleIcon className={styles.tick} />
              <span>Row 1 text</span>
            </div>
            <div className={styles.tickItem}>
              <CheckCircleIcon className={styles.tick} />
              <span>Row 2 text</span>
            </div>
            <div className={styles.tickItem}>
              <CheckCircleIcon className={styles.tick} />
              <span>Row 3 text</span>
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.buttonContainer}>
            <button className={styles.smallButton}>Button 1</button>
            <button className={styles.smallButton}>Button 2</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponents;
