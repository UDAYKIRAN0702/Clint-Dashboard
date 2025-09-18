import React, { useEffect, useState } from "react";
import "./Digital_ID.css";

export default function VirtualID() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user") // same endpoint used in Info.jsx
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((userData) => {
        setData(userData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ID data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="id-placeholder">Loading Virtual ID...</p>;
  }

  return (
    <div className="virtual-id-card">
      <div className="id-image">
        {data?.profileImage ? (
          <img src={data.profileImage} alt="Profile" />
        ) : (
          <div className="id-placeholder">No Image</div>
        )}
      </div>
      <div className="id-info">
        <h3>{data?.name || "Name not set"}</h3>
        <p>Email: {data?.email || "Not provided"}</p>
        <p>Phone: {data?.phone || "Not provided"}</p>
        <p>Department: {data?.department || "Not provided"}</p>
      </div>
    </div>
  );
}
