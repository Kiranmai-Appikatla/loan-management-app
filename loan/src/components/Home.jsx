import { useState } from "react";
import Login from "./Login.jsx";
import "./Home.css";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        {/* LoanVerse Logo Section */}
        <div className="logo-container">
          <h1 className="logo">LoanVerse</h1>
          <p className="logo-subtitle">Modern Credit Platform</p>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <a href="#" className="nav-item active">Home</a>
          <a href="#" className="nav-item">About</a>
          <a href="#" className="nav-item">Contact</a>
          <a href="#" className="nav-item">Pricing</a>
          <a href="#" className="nav-item">FAQ</a>
        </div>

        {/* Buttons */}
        <div className="nav-buttons">
          <button 
            type="button"
            className="nav-btn login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button type="button" className="nav-btn get-in-touch-btn">
            Get in touch
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h2 className="hero-title">
          End-to-end loan <br /> management system
        </h2>
        <p className="hero-subtitle">
          Transform your lending programs with LoanVerse's centralized, full-suite loan 
          management system.
        </p>

        <div className="hero-actions">
          <button type="button" className="cta-btn primary-cta">
            Let's chat
          </button>
          <a href="#" className="cta-link">
            Access Knowledge Hub &rarr;
          </a>
        </div>
      </div>

      {/* Placeholder for feature cards */}
      <div className="feature-cards-placeholder">
        {/* Loan Summary and User Profile can go here */}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="overlay">
          <div className="modal">
            <button 
              type="button" 
              className="close-btn" 
              onClick={() => setShowLogin(false)}
            >
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}
