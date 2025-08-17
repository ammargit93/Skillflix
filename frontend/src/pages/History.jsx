import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "./constants/constants.js";
import Navbar from "../components/Navbar";

const History = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await fetch(`${API_BASE_URL}/get-history?user_id=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch history");
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">
      {/* Navbar */}
      <Navbar
        username={localStorage.getItem("username")}
        user_id={localStorage.getItem("user_id")}
      />

      <div className="p-8 flex-grow">
        <h1 className="text-3xl font-bold mb-4">Watch History</h1>
        <p className="text-gray-400 mb-8">
          Your previously watched or uploaded videos.
        </p>

        {history.length === 0 ? (
          <p className="text-gray-400">No history found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-700"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {item.videotitle || item.videoTitle}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {item.videodescription || item.videoDescription}
                </p>
                <video
                  controls
                  src={item.s3url}
                  className="w-full h-48 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Watched at: {item.timewatched || item.timeWatched}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
