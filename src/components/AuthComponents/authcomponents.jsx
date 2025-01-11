import React, { useState, useEffect, useContext } from "react";
import { GoArrowLeft } from "react-icons/go";
import styles from "./authcomponents.module.scss";
import logo from "../../assets/images/infrajobs.jpg";
import { signInWithPopup, onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../../firebase/firebase-config";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Social Login Component
const SocialLogin = ({ closeModal, profileType, setError }) => {
  const handleSocialLogin = async (provider, providerName) => {
    if (!["candidate", "employer"].includes(profileType?.toLowerCase())) {
      setError("Invalid profile type. Please select 'Candidate' or 'Employer'.");
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("http://127.0.0.1:8000/api/auth/social-login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_token: idToken,
          profile_type: profileType.toLowerCase(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`${providerName} Login Successful:`, data);
        if (data.user.role === "employer") {
          window.location.href = "/employer-profile";
        } else {
          window.location.href = "/home";
        }
      } else {
        setError(data.error || `${providerName} login failed.`);
      }
    } catch (error) {
      console.error(`Error during ${providerName} login:`, error);
      setError(`Unexpected error: ${error.message}`);
    }
  };

  return (
    <>
      <button
        className={styles.socialButton1}
        onClick={() => handleSocialLogin(googleProvider, "Google")}
      >
        Login with Google
      </button>
      <button
        className={styles.socialButton2}
        onClick={() => handleSocialLogin(facebookProvider, "Facebook")}
      >
        Login with Facebook
      </button>
    </>
  );
};

const AuthComponents = ({ closeModal }) => {
  const { login, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileType, setProfileType] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getIdToken(currentUser).then((idToken) => {
          localStorage.setItem("token", idToken); // Save Firebase token
        });
      } else {
        localStorage.removeItem("token"); // Clear Firebase token
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle regular email/password login
  const handleLogin = async () => {
    try {
      const loggedInUser = await login(email, password); // AuthContext login function

      if (loggedInUser && loggedInUser.role) {
        // Redirect based on user role
        if (loggedInUser.role === "employer") {
          navigate("/employer-profile");
        } else if (loggedInUser.role === "candidate") {
          navigate("/home");
        } else {
          setError("Unknown user role. Please contact support.");
        }
      } else {
        setError("Invalid login response. Please try again.");
      }

      closeModal(); // Close the modal on successful login
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred.");
    }
  };

  // Handle regular email/password signup
  const handleSignUp = async () => {
    if (!profileType) {
      setError("Please select a profile type (Candidate or Employer).");
      return;
    }
  
    try {
      const requestBody = {
        email,
        username: email.split("@")[0],
        password,
        role: profileType.toLowerCase(),
      };
  
      console.log("Request Body:", requestBody);
  
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      console.log("Backend Response:", data); // Log the backend response
  
      if (response.ok) {
        setUser(data.user);
  
        // Navigate based on role
        if (data.user.role === "employer") {
          navigate("/employer-profile");
        } else {
          navigate("/home");
        }
  
        closeModal();
      } else {
        console.error("Signup Error:", data); // Log backend error
        setError(data.message || "Signup failed."); // Display meaningful error message
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred.");
    }
  };
  
  

  return (
    <div className={styles.authContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.logoAndGoBack}>
          <img src={logo} alt="InfraJobs Logo" className={styles.logo} />
          <button className={styles.goBackBtn} onClick={closeModal}>
            <GoArrowLeft /> <b>Go back</b>
          </button>
        </div>

        {showLogin ? (
          <div className={styles.authContent}>
            <h2>Login</h2>
            <p>Enter your email and password to log in</p>
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
            {error && <p className={styles.errorText}>{error}</p>}
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
            <button onClick={handleLogin}>Login</button>
            <SocialLogin
              closeModal={closeModal}
              profileType={profileType}
              setError={setError}
            />
            <p>
              Don't have an account?{" "}
              <span onClick={() => setShowLogin(false)}>Sign Up here</span>
            </p>
          </div>
        ) : (
          <div className={styles.authContent}>
            <h2>Sign Up</h2>
            <p>Create an account and select your profile type</p>
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
            {error && <p className={styles.errorText}>{error}</p>}
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
            <button onClick={handleSignUp}>Sign Up</button>
            <SocialLogin
              closeModal={closeModal}
              profileType={profileType}
              setError={setError}
            />
            <p>
              Have an account?{" "}
              <span onClick={() => setShowLogin(true)}>Login here</span>
            </p>
          </div>
        )}
      </div>

      <div className={styles.rightColumn}>
        <img
          src="https://img.freepik.com/free-vector/blue-abstract-line-background_1409-893.jpg"
          alt="Background"
          className={styles.backgroundImage}
        />
        <div className={styles.card}>
          <h3>Welcome to InfraJobs</h3>
          <p>Connecting Candidates and Employers</p>
        </div>
      </div>
    </div>
  );
};

export default AuthComponents;
