// Import dependencies
import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Correct import for CheckCircleIcon
import GoogleIcon from "@mui/icons-material/Google"; // Correct import for Google icon
import FacebookIcon from "@mui/icons-material/Facebook"; // Correct import for Facebook icon
import styles from "./authcomponents.module.scss"; // Import the SCSS module
import logo from "../../assets/images/infrajobs.jpg"; // Import the logo image
import { Link } from "react-router-dom";

const AuthComponents = ({ closeModal }) => {
  const [showLogin, setShowLogin] = useState(false);

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
            <p className={styles.enterEmailText}>Enter your email and password to log in</p>
            <input type="email" placeholder="Email" className={styles.inputField} />
            <input
              type="password"
              placeholder="Password"
              className={styles.inputField}
            />
            <button className={styles.loginBtn}>Login</button>

            {/* Horizontal Line */}
            <hr className={styles.divider} />

            {/* Social Login Buttons */}
            <button className={styles.socialButton1}>
              <GoogleIcon /> Login with Google
            </button>
            <button className={styles.socialButton2}>
              <FacebookIcon /> Login with Facebook
            </button>

            {/* Link to switch back to Sign In */}
            <p className={styles.p}>
              Don&apos;t have an account? {" "}
              <span
                className={styles.link}
                onClick={() => setShowLogin(false)}
              >
                Sign up here
              </span>
            </p>
          </div>
        ) : (
          <div className={styles.authContent}>
            <h2 className={styles.signInText}>Sign In</h2>
            <p className={styles.enterEmailText}>
              Enter your email to receive a one-time passcode
            </p>
            <input
              type="email"
              placeholder="Email"
              className={styles.inputField}
            />
            <input
              type="phone"
              placeholder="Phone Number"
              className={styles.inputField}
            />
            <button className={styles.sendOtpBtn}>Send OTP Code</button>

            {/* Horizontal Line */}
            <hr className={styles.divider} />

            <button className={styles.socialButton1}>
              <GoogleIcon /> Sign in with Google
            </button>
            <button className={styles.socialButton2}>
              <FacebookIcon /> Sign in with Facebook
            </button>

            <p className={styles.p}>
              Have an account already? {" "}
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
