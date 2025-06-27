import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../config';

export default function Test() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${API_BASE_URL}/auth`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Response from API:", res.data);
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
        });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page to check the functionality of the application.</p>
      <p>Make sure to test all features and ensure everything is working as expected.</p>
    </div>
  );
}
