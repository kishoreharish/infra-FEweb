import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Employers from "./pages/Employers/Employers";
import Companies from "./pages/Companies/Companies";
import Services from "./pages/Services/services";
import JobSeekerProfile from "./pages/JobSeekerProfile/JobSeekerProfile";
import CandidateProfile from "./components/CandidateProfile/CandidateProfile";
import EmployerProfile from "./pages/EmployerProfile/EmployerProfile";
import Topbar from "./components/Topbar/TopBar";
import PrivateRoute from "./components/PrivateRoute";
import { setupPushNotifications, onMessageListener } from "./firebase/pushNotifications";
import { firestore } from "./firebase/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import MyProfile from "./components/CandidateProfile/MyProfile/MyProfile";
import EditProfile from "./components/CandidateProfile/MyProfile/EditProfile";



const App = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Set up push notifications
    setupPushNotifications();

    // Firestore listener
    const unsubscribeFirestore = onSnapshot(
      collection(firestore, "messages"),
      (snapshot) => {
        snapshot.docs.forEach((doc) => console.log("Firestore message:", doc.data()));
      }
    );

    // Push notification listener
    const getPushMessage = async () => {
      try {
        const payload = await onMessageListener();
        console.log("Push notification received:", payload);
        setMessage(payload);
        alert(`New Notification: ${payload.notification.title}`);
      } catch (err) {
        console.log('Error receiving push notification:', err);
      }
    };

    getPushMessage();

    // Cleanup listeners
    return () => {
      unsubscribeFirestore();
    };
  }, []);

  return (
    <Router>
      <Topbar />
      {message && (
        <div className="notification">
          <h2>{message.notification.title}</h2>
          <p>{message.notification.body}</p>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employers" element={<Employers />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile/job-seeker" element={<JobSeekerProfile />} />
        <Route path="/profile/employer" element={<EmployerProfile />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employer-profile" element={<EmployerProfile />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/MyProfile/EditProfile" element={<EditProfile />} />
        <Route
          path="/candidate-profile"
          element={
            <PrivateRoute>
              <CandidateProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
