import React, { useState, useEffect, useRef } from "react";
import { FaKey, FaUniversity, FaIdCard, FaUser } from "react-icons/fa";
import "./profile.css";

// Import separate components (no spaces in filenames)
import Info from "./info";
import ChangePassword from "./change password";
import BankDetails from "./Bank Details";
import VirtualIDCard from "./Digital ID";

const sections = [
  { id: "info", title: "Personal Info", icon: <FaUser /> },
  { id: "password", title: "Change Password", icon: <FaKey /> },
  { id: "bank", title: "Bank Details", icon: <FaUniversity /> },
  { id: "digital-id", title: "Digital ID", icon: <FaIdCard /> },
];

export default function Profile() {
  const [activeSection, setActiveSection] = useState("info");
  const [userData, setUserData] = useState(null);
  const tabsRef = useRef([]);

  // Fetch data on load
  useEffect(() => {
    async function fetchUserData() {
      try {
        // Replace this with your real API endpoint
        const response = await fetch("/api/user/profile");
        if (!response.ok) throw new Error("Failed to load profile data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Mock data fallback
        setUserData({
          name: "John Doe",
          email: "john@example.com",
          bank: "ABC Bank",
          accountNumber: "1234567890",
        });
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    const activeIndex = sections.findIndex((s) => s.id === activeSection);
    if (tabsRef.current[activeIndex]?.focus) {
      tabsRef.current[activeIndex].focus();
    }
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case "info":
        return <Info data={userData} />;
      case "password":
        return <ChangePassword />;
      case "bank":
        return <BankDetails />;
      case "digital-id":
        return <VirtualIDCard data={userData} />;
      default:
        return null;
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveSection(sections[(index + 1) % sections.length].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveSection(sections[(index - 1 + sections.length) % sections.length].id);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header-row" role="tablist" aria-label="Profile sections">
        {sections.map((section, index) => (
          <button
            key={section.id}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`profile-header-btn ${activeSection === section.id ? "active" : ""}`}
            onClick={() => setActiveSection(section.id)}
            type="button"
            role="tab"
            aria-selected={activeSection === section.id}
            aria-controls={`section-${section.id}`}
            id={`tab-${section.id}`}
            tabIndex={activeSection === section.id ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <span className="profile-icon">{section.icon}</span>
            <span>{section.title}</span>
          </button>
        ))}
      </div>

      <div
        className="profile-section-content"
        role="tabpanel"
        id={`section-${activeSection}`}
        aria-labelledby={`tab-${activeSection}`}
        tabIndex={0}
      >
        {renderSection()}
      </div>
    </div>
  );
}
