import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import Header from "./Header";
import "../styles/Dashboard.css";
import Empty from "../assets/Empty.png";

const Dashboard = ({ userInfo }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      // const response = await fetch("http://localhost:8000/categories", { TO RUN THE PROJECT LOCALLY 
      const response = await fetch("https://dashboard-backend-hmq1.onrender.com/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="main-content">
        <h1 className="main-heading">Categories Dashboard</h1>
        {loading ? (
          <div className="loader-container">
            <BallTriangle
              height={100}
              width={100}
              color="#4fa94d"
              visible={true}
            />
          </div>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="categories-container">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div key={category._id} className="category-card">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="category-image"
                  />
                  <h3 className="sub-heading">{category.name}</h3>
                  <p className="sub-para">{category.itemCount} Items</p>
                </div>
              ))
            ) : (
              <div className="empty-view">
                <img src={Empty} alt="No Results" className="empty-img" />
                <h2 className="empty-heading">No Results Found</h2>
                <p className="empty-para">
                  No categories found for "{searchQuery}"
                </p>
                <p className="empty-para">
                  Try searching with a different keyword.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Dashboard;
