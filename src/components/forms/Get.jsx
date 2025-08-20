import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

export default function Get() {
  const [users, setUsers] = useState([]);
  const API = `${API_BASE_URL}api/event-requests`;

  useEffect(() => {
    // Call your backend GET API
    axios
      .get(API) // Replace with your actual API endpoint
      .then((response) => {
        setUsers(response.data); // Store API response
        console.log("first", response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
