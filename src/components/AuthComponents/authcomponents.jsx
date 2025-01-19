import React, { useState, useEffect, useContext } from "react";
import { GoArrowLeft } from "react-icons/go";
import styles from "./authcomponents.module.scss";
import logo from "../../assets/images/infrajobs.jpg";
import {
  signInWithPopup,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../firebase/firebase-config";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthComponents = ({ closeModal }) => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileType, setProfileType] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const idToken = await getIdToken(currentUser);
          const response = await fetch("http://127.0.0.1:8000/users/social-login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token: idToken }),
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem("authToken", data.access);
            localStorage.setItem("uid", data.user.id);
          } else {
            console.error("Login failed:", data);
          }
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("uid");
      }
    });
    return () => unsubscribe();
  }, []);

  const apiCall = async (url, method, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed.");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleLogin = async () => {
    if (!profileType) {
      setError("Please select a profile type (Candidate or Employer).");
      return;
    }
  
    const endpoint =
      profileType.toLowerCase() === "candidate"
        ? "http://127.0.0.1:8000/users/candidate/login/"
        : "http://127.0.0.1:8000/users/employer/login/";
  
    try {
      const data = await apiCall(endpoint, "POST", { email, password });
  
      // Save tokens and user data locally
      localStorage.setItem("uid", data.user_id);
      localStorage.setItem("authToken", data.access);
  
      // Update AuthContext to trigger TopBar re-render
      setUser({
        id: data.user_id,
        username: data.username || "User",
        role: profileType.toLowerCase(),
        photoURL: data.avatar || "", // Optional, based on API response
      });
  
      // Navigate based on user role
      navigate(profileType.toLowerCase() === "employer" ? "/employer-profile" : "/home");
  
      // Close modal
      closeModal?.();
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleSignUp = async () => {
    if (!profileType) {
      setError("Please select a profile type (Candidate or Employer).");
      return;
    }
  
    try {
      const data = await apiCall("http://127.0.0.1:8000/users/register/", "POST", {
        email,
        password,
        profile_type: profileType.toLowerCase(),
      });
  
      if (data.access) {
        localStorage.setItem("authToken", data.access);  // Store access token
        localStorage.setItem("refreshToken", data.refresh);  // Store refresh token
        localStorage.setItem("uid", data.user_id);
      } else {
        setError("Signup successful, but no access token received.");
        return;
      }
  
      setUser({
        id: data.user_id,
        username: data.username || "User",
        role: profileType.toLowerCase(),
        photoURL: data.avatar || "", 
      });
  
      navigate(profileType.toLowerCase() === "employer" ? "/employer-profile" : "/home");
      closeModal?.();
    } catch (error) {
      setError(error.message);
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

// Social Login Component
const SocialLogin = ({ closeModal, profileType, setError }) => {
  const handleSocialLogin = async (provider, providerName) => {
    if (!["candidate", "employer"].includes(profileType?.toLowerCase())) {
      setError("Please select 'Candidate' or 'Employer'.");
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("http://127.0.0.1:8000/users/social-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_token: idToken,
          profile_type: profileType.toLowerCase(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.access);
        localStorage.setItem("uid", data.user.id);
        window.location.href =
          data.user.role === "employer" ? "/employer-profile" : "/home";
      } else {
        setError(data.error || `${providerName} login failed.`);
      }
    } catch (error) {
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

export default AuthComponents;
