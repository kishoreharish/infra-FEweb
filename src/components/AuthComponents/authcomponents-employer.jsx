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

const AuthComponentsEmployer = ({ closeModal }) => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const idToken = await getIdToken(currentUser);
          const response = await fetch("http://127.0.0.1:8000/users/social-login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token: idToken, profile_type: "employer" }),
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem("authToken", data.access);
            localStorage.setItem("refreshToken", data.refresh); // ✅ Store refreshToken
            localStorage.setItem("uid", data.user.id);
          } else {
            console.error("Login failed:", data);
          }
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken"); // ✅ Clear refreshToken on logout
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
    const endpoint = "http://127.0.0.1:8000/users/employer/login/";

    try {
      const data = await apiCall(endpoint, "POST", { email, password });

      // ✅ Store both access and refresh tokens
      localStorage.setItem("authToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("uid", data.user_id);

      // ✅ Update AuthContext to trigger UI updates
      setUser({
        id: data.user_id,
        username: data.username || "User",
        role: "employer",
        photoURL: data.avatar || "",
      });

      // ✅ Redirect to employer profile
      navigate("/employer-profile");

      // ✅ Close modal
      closeModal?.();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const data = await apiCall("http://127.0.0.1:8000/users/register/", "POST", {
        email,
        password,
        profile_type: "employer",
      });

      if (data.access) {
        // ✅ Store both access and refresh tokens after signup
        localStorage.setItem("authToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("uid", data.user_id);
      } else {
        setError("Signup successful, but no access token received.");
        return;
      }

      setUser({
        id: data.user_id,
        username: data.username || "User",
        role: "employer",
        photoURL: data.avatar || "",
      });

      // ✅ Redirect to employer profile
      navigate("/employer-profile");

      // ✅ Close modal
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
            <h2>Login As Employer</h2>
            <p>Enter your email and password to log in</p>
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
            <SocialLogin closeModal={closeModal} setError={setError} />
            <p>
              Don't have an account?{" "}
              <span onClick={() => setShowLogin(false)}>Sign Up here</span>
            </p>
          </div>
        ) : (
          <div className={styles.authContent}>
            <h2>Sign Up As Employer</h2>
            <p>Create an account</p>
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
            <SocialLogin closeModal={closeModal} setError={setError} />
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
          <p>Connecting Employers</p>
        </div>
      </div>
    </div>
  );
};

// ✅ Social Login Component (Ensures token storage for social logins)
const SocialLogin = ({ closeModal, setError }) => {
  const handleSocialLogin = async (provider, providerName) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("http://127.0.0.1:8000/users/social-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_token: idToken,
          profile_type: "employer",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("uid", data.user.id);
        window.location.href = "/employer-profile";
      } else {
        setError(data.error || `${providerName} login failed.`);
      }
    } catch (error) {
      setError(`Unexpected error: ${error.message}`);
    }
  };

  return (
    <>
      <button className={styles.socialButton1} onClick={() => handleSocialLogin(googleProvider, "Google")}>
        Login with Google
      </button>
      <button className={styles.socialButton2} onClick={() => handleSocialLogin(facebookProvider, "Facebook")}>
        Login with Facebook
      </button>
    </>
  );
};

export default AuthComponentsEmployer;
