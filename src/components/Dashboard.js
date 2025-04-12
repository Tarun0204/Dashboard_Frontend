import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import Header from "./Header"
import "../styles/Dashboard.css";

const Dashboard = ({userInfo}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://revisit-backend-3zz9.onrender.com/categories", {
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
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
    <Header userInfo={userInfo} />
    <main className="main-content">
      <h1 className="main-heading">Categories Dashboard</h1>
      {loading ? (
        <div className="loader-container">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category._id} className="category-card">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="category-image"
              />
              <h3 className="sub-heading">{category.name}</h3>
              <p className="sub-para">{category.itemCount} Items</p>
            </div>
          ))}
        </div>
      )}
    </main>
    </>
  );
};

export default Dashboard;
