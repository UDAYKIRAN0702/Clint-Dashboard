import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { IoGitNetworkSharp } from "react-icons/io5";

import {
  FaUserCircle,
  FaUser,
  FaBusinessTime,
  FaShareSquare,
  FaCcAmazonPay,
} from "react-icons/fa";
import { RiLogoutBoxLine, RiInformation2Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { SiCivicrm } from "react-icons/si";
import { LuBriefcaseBusiness, LuLogOut } from "react-icons/lu";
import { TiTicket } from "react-icons/ti";
import "./Dlogin.css";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" ? "active-link" : "";
    }
    return location.pathname.startsWith(path) ? "active-link" : "";
  };

  return (
    <>
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-wrapper">
          <h1 className="dashboard-title">Hello Suresh Reddy</h1>
          <div className="profile-section" ref={dropdownRef}>
            <button
              className="profile-btn"
              onClick={() => setOpen((prev) => !prev)}
            >
              <FaUserCircle className="profile-icon" />
              <span className="profile-text">Profile</span>
            </button>

            {open && (
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">
                    <FaUser className="icon" /> Profile
                  </Link>
                </li>
                <li onClick={onLogout}>
                  <RiLogoutBoxLine className="icon" /> Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="dashboard-body">
        <aside className="sidebar">
          <ul>
            <li className={isActive("/")}>
              <Link to="/">
                <RxDashboard /> Dashboard
              </Link>
            </li>
            <li className={isActive("/today-business")}>
              <Link to="/today-business">
                <FaBusinessTime /> Today Business
              </Link>
            </li>
            <li className={isActive("/crm")}>
              <Link to="/crm">
                <SiCivicrm /> CRM
              </Link>
            </li>
            <li className={isActive("/referral")}>
              <Link to="/referral">
                <FaShareSquare /> Referral
              </Link>
            </li>
           
            <li className={isActive("/payment")}>
              <Link to="/payment">
                <FaCcAmazonPay /> Payments
              </Link>
            </li>
            <li className={isActive("/business")}>
              <Link to="/business">
                <LuBriefcaseBusiness /> Business Analysis
              </Link>
            </li>


             <li className={isActive("/fieldwork")}>
              <Link to="/fieldwork">
                <IoGitNetworkSharp /> Field Work
              </Link>
            </li>
            <li className={isActive("/ticket")}>
              <Link to="/ticket">
                <TiTicket /> Ticket Raise
              </Link>
            </li>
            <li className={isActive("/about")}>
              <Link to="/about">
                <RiInformation2Line /> Catalyst
              </Link>
            </li>

             <li className={onLogout}>
              <Link to="/login">
                <LuLogOut /> Logout
              </Link>
            </li>
         
          </ul>
        </aside>
        <main className="main-content">

          <Outlet />
          

        </main>
      </div>
    </>
  );
}
