import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes
import Home from "./pages/Home/Home";  // Import the Home page
import Login from "./pages/Login/Login"; // Import other pages
import Register from "./pages/Register/Register";
import Employers from "./pages/Employers/Employers";
import Companies from "./pages/Companies/Companies";
import Services from "./pages/Services/services";
import JobSeekerProfile from "./pages/JobSeekerProfile/JobSeekerProfile";
import EmployerProfile from "./pages/EmployerProfile/EmployerProfile";
import Topbar from "./components/Topbar/TopBar"; // Import Topbar

const App = () => {
  return (
    <Router>
      {/* Topbar will be visible on all pages */}
      <Topbar />
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employers" element={<Employers />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile/job-seeker" element={<JobSeekerProfile />} />
        <Route path="/profile/employer" element={<EmployerProfile />} />
      </Routes>
    </Router>
  );
};

export default App;