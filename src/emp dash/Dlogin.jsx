import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { IoGitNetworkSharp } from "react-icons/io5";
import axios from "axios";
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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        //if (!token) {
          //navigate("/login");
         // return;
        //}

        const response = await axios.get("http://127.0.0.1:8000/api/user/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            localStorage.removeItem("access_token");
            //navigate("/login");
            return;
          }
          setError(err.response?.data?.message || "An error occurred");
        } else {
          setError(err.message);
        }
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);


  const onLogout = () => {
    localStorage.removeItem("accessToken");
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
          <h1 className="dashboard-title">
            {loading ? "Loading..." : error ? "Error!" : `Hello ${userData?.name || "User"}`}
          </h1>
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

            <li onClick={onLogout}>
              <Link to="#">
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