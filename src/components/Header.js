import React, { useState, useEffect, useCallback } from "react";
import {
  FaSearch,
  FaBell,
  FaClipboardList,
  FaBox,
  FaClipboard,
  FaRegUser,
  FaEnvelope,
  FaQuestionCircle,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdMessage } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import "../styles/Header.css";
import { toast } from "react-toastify";
import axiosapp from "../utils/axiosapp";
import Profile from "./Profile";

const iconMap = {
  MdDashboard,
  FaClipboardList,
  FaBox,
  FaClipboard,
  FaRegUser,
  FaEnvelope,
  FaQuestionCircle,
  FaCogs,
  FaSignOutAlt,
};

const sidebarData = [
  { label: "Dashboard", icon: "MdDashboard" },
  { label: "Orders", icon: "FaClipboardList", badge: 16 },
  { label: "Products", icon: "FaBox" },
  { label: "Categories", icon: "FaClipboard" },
  { label: "Customers", icon: "FaRegUser" },
  { label: "Reports", icon: "FaClipboard" },
  { label: "Coupons", icon: "FaBox" },
  { label: "Inbox", icon: "FaEnvelope" },
  { label: "Knowledge Base", icon: "FaQuestionCircle" },
  { label: "Product Updates", icon: "FaClipboard" },
  { label: "Personal Settings", icon: "FaCogs" },
  { label: "Logout", icon: "FaSignOutAlt" },
];

const Header = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
      if (!mobile) {
        setIsSidebarVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHamburgerClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const SearchBar = () => (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input type="search" placeholder="Search..." className="search-input" />
    </div>
  );

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful!");
    navigate("/login");
  };

  const getUserInfo = useCallback(async () => {
    try {
      const response = await axiosapp.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.log("Error occurred:", error.message);
      }
    }
  }, [navigate]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <>
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <GiHamburgerMenu
              className="menu-icon"
              onClick={handleHamburgerClick}
            />
            <h1 className="logo-name">
              <span className="span">R</span>evisit
            </h1>
          </div>

          {!isMobileView && (
            <div className="header-center">
              <SearchBar />
            </div>
          )}

          <div className="header-right">
            <MdMessage className="header-icon" />
            <FaBell className="header-icon" />
            <Profile userInfo={userInfo} />
          </div>
        </div>
      </div>

      {isMobileView && (
        <div className="mobile-search-wrapper">
          <SearchBar />
        </div>
      )}

      {isMobileView && isSidebarVisible && (
        <div className="sidebar-backdrop" onClick={handleHamburgerClick}></div>
      )}

      <div
        className={`sidebar-container ${
          isMobileView && isSidebarVisible ? "visible" : ""
        }`}
        style={{
          position: "fixed",
          height: isMobileView ? "auto" : "100vh",
          maxHeight: isMobileView ? "120vh" : "100vh",
          overflowY: "auto",
          top: isMobileView ? "0px" : "60px",
        }}
      >
        <ul className="sidebar-links">
          {sidebarData.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              <li
                key={index}
                className={`sidebar-item ${index === 3 ? "active" : ""}`}
                onClick={item.label === "Logout" ? handleLogout : null}
              >
                <span className="icon">
                  <IconComponent />
                </span>
                {item.label}
                {item.badge && <span className="badge">{item.badge}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Header;
