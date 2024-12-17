import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Correct import for CheckCircleIcon
import GoogleIcon from "@mui/icons-material/Google"; // Correct import for Google icon
import FacebookIcon from "@mui/icons-material/Facebook"; // Correct import for Facebook icon
import styles from "./authcomponents.module.scss"; // Import the SCSS module
import logo from "../../assets/images/infrajobs.jpg"; // Import the logo image
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../../firebase/firebase-config"; // Import providers from Firebase config

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
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}` // Send token in the Authorization header
        },
        body: JSON.stringify({
          profile_type: profileType.toLowerCase(), // ensure 'candidate' or 'employer'
        })
      });
  
      const data = await response.json();
      console.log("Login response:", data);
      if (data.success) {
        // Handle successful login
        // If your backend doesn't provide 'token', remove this line or adjust accordingly.
        localStorage.setItem("token", data.token); // Store the backend token if provided
        closeModal();
      } else {
        setError(data.message); // Handle backend validation errors
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  

  // Handle regular sign up (email/password)
  const handleSignUp = async () => {
    if (!profileType) {
      setAlertMessage("Please select a profile type (Candidate or Employer).");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Create the user in your Django backend
      const response = await fetch('http://127.0.0.1:8000/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          profile_type: profileType.toLowerCase(), // ensure 'candidate' or 'employer'
          firebase_uid: user.uid,
        }),
      });
  
      const data = await response.json();
      console.log("Signup response:", data);
  
      if (data.success) {
        console.log("User signed up successfully");
        closeModal(); // Close modal on successful sign-up
      } else {
        setError(data.message); // Handle backend validation errors
      }
    } catch (err) {
      setError(err.message); // Show error message if sign up fails
    }
  };

  // Handle Google login via Firebase
  const handleGoogleLogin = async () => {
    if (!profileType) {
      setAlertMessage("Please select a profile type (Candidate or Employer)."); // Set custom error message
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google User: ", user);
      getIdToken(user).then((idToken) => {
        localStorage.setItem("token", idToken); // Store token in localStorage
      });
      closeModal(); // Close the modal on successful login
    } catch (error) {
      setError(error.message); // Show error message if login fails
    }
  };

  // Handle Facebook login via Firebase
  const handleFacebookLogin = async () => {
    if (!profileType) {
      setAlertMessage("Please select a profile type (Candidate or Employer)."); // Set custom error message
      return;
    }
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log("Facebook User: ", user);
      getIdToken(user).then((idToken) => {
        localStorage.setItem("token", idToken); // Store token in localStorage
      });
      closeModal(); // Close the modal on successful login
    } catch (error) {
      setError(error.message); // Show error message if login fails
    }
  };

  // Profile Type Specific Text
  {profileType === "Candidate" && (
    <p className={styles.profileText}>
      Ready to take the next step? Create an account or sign in. By creating an account or signing in, you understand and agree to Indeed's Terms. You also consent to our Cookie and Privacy policies. You will receive marketing messages from Indeed and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.
    </p>
  )}
  {profileType === "Employer" && (
    <p className={styles.profileText}>
      Create your employer account or sign in with an existing account. By creating an account or signing in, you understand and agree to Indeed's Terms. You also consent to our Cookie and Privacy policies. You will receive marketing messages from Indeed and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.
    </p>
  )}

  return (
    <div className={styles.authContainer}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <div className={styles.logoAndGoBack}>
          {/* Logo in the top left */}
          <div className={styles.logo}>
            <img src={logo} alt="InfraJobs Logo" className={styles.logo} />
          </div>

          {/* Go back button in the top right */}
          <button className={styles.goBackBtn} onClick={closeModal}>
            <GoArrowLeft /> <b>Go back</b>
          </button>
        </div>

        {/* Dynamic Content: Sign In or Login */}
        {showLogin ? (
          <div className={styles.authContent}>
            <h2 className={styles.loginText}>Login</h2>
            <p className={styles.enterEmailText}>
              Enter your email and password to log in
            </p>

            {/* Profile Type Selection */}
            <div className={styles.profileTypeSelection}>
              <label>
                <input
                  type="radio"
                  name="profileType"
                  value="Candidate"
                  checked={profileType === "Candidate"}
                  onChange={(e) => setProfileType(e.target.value)}
                />
                Candidate
              </label>
              <label>
                <input
                  type="radio"
                  name="profileType"
                  value="Employer"
                  checked={profileType === "Employer"}
                  onChange={(e) => setProfileType(e.target.value)}
                />
                Employer
              </label>
            </div>

            {alertMessage && <p className={styles.alertMessage}>{alertMessage}</p>} {/* Custom alert message */}
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

            {/* Horizontal Line */}
            <hr className={styles.divider} />

            {/* Social Login Buttons */}
            <button
              className={styles.socialButton1}
              onClick={handleGoogleLogin}
            >
              <GoogleIcon /> Login with Google
            </button>
            <button
              className={styles.socialButton2}
              onClick={handleFacebookLogin}
            >
              <FacebookIcon /> Login with Facebook
            </button>

            {/* Link to switch back to Sign In */}
            <p className={styles.p}>
              Don&apos;t have an account?{" "}
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

            {/* Profile Type Selection */}
            <div className={styles.profileTypeSelection}>
              <label>
                <input
                  type="radio"
                  name="profileType"
                  value="Candidate"
                  checked={profileType === "Candidate"}
                  onChange={(e) => setProfileType(e.target.value)}
                />
                Candidate
              </label>
              <label>
                <input
                  type="radio"
                  name="profileType"
                  value="Employer"
                  checked={profileType === "Employer"}
                  onChange={(e) => setProfileType(e.target.value)}
                />
                Employer
              </label>
            </div>

            {/* Profile Type Specific Text */}
            {profileType === "Candidate" && (
              <p className={styles.profileText}>
                By creating an account or signing in, you understand and agree to Badakar Terms. By using our services, you agree to our Cookie and Privacy policies.
              </p>
            )}
            {profileType === "Employer" && (
              <p className={styles.profileText}>
                Create a new employer account or sign in with an existing one. By doing so, you agree to Badakar's Terms and consent to our Cookie and Privacy policies.
              </p>
            )}

            {alertMessage && <p className={styles.alertMessage}>{alertMessage}</p>} {/* Custom alert message */}
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

            {/* Horizontal Line */}
            <hr className={styles.divider} />

            <button
              className={styles.socialButton1}
              onClick={handleGoogleLogin}
            >
              <GoogleIcon /> Sign in with Google
            </button>
            <button
              className={styles.socialButton2}
              onClick={handleFacebookLogin}
            >
              <FacebookIcon /> Sign in with Facebook
            </button>

            <p className={styles.p}>
              Have an account already?{" "}
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

        {/* Card in the center */}
        <div className={styles.card}>
          <div className={styles.iconsContainer}>
            <span className={styles.icon}>Icon 1</span>
            <span className={styles.icon}>Icon 2</span>
          </div>
          <h3 className={styles.cardTitle}>Card Title</h3>
          <h4 className={styles.cardSubtitle}>Card Subtitle</h4>

          {/* Horizontal Divider */}
          <hr className={styles.divider} />

          {/* Content Below Divider */}
          <h5 className={styles.contentTitle}>Content Title</h5>
          <div className={styles.ticksContent}>
            <div className={styles.tickItem}>
              <CheckCircleIcon className={styles.tick} /> {/* Using Material UI Icon */}
              <span>Row 1 text</span>
            </div>
            <div className={styles.tickItem}>
              <CheckCircleIcon className={styles.tick} /> {/* Using Material UI Icon */}
              <span>Row 2 text</span>
            </div>
            <div className={styles.tickItem}>
              <CheckCircleIcon className={styles.tick} /> {/* Using Material UI Icon */}
              <span>Row 3 text</span>
            </div>
          </div>

          <hr className={styles.divider} />

          {/* Buttons at the bottom */}
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
