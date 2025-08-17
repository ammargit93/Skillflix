import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './constants/constants.js';
import Navbar from "../components/Navbar";

const HomePage = () => {
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(API_BASE_URL + '/get-all-videos');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data);
        setFilteredVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const results = videos.filter(video =>
      video.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.videoDescription && video.videoDescription.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredVideos(results);
  }, [searchTerm, videos]);

  const handleVideoClick = async (videoId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/video-click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user_id,
          videoId: videoId,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        console.error('Failed to record video click');
      }
    } catch (err) {
      console.error('Error recording video click:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar username={username} user_id={user_id} />
        <div className="flex-grow flex items-center justify-center text-sm">
          Loading videos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar username={username} user_id={user_id} />
        <div className="flex-grow flex items-center justify-center text-sm">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col">
      <Navbar username={username} user_id={user_id} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Search Bar */}
        <div className="px-6 py-8 max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Videos Section */}
        <div className="px-6 pb-12">
          <h2 className="text-lg font-bold mb-6 text-center">Available Videos</h2>
          {filteredVideos.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              {searchTerm ? 'No videos match your search.' : 'No videos available yet. Check back later!'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredVideos.map((video) => (
                <div
                  key={video.videoId}
                  className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700 hover:border-pink-500 transition-colors duration-200"
                >
                  <div className="p-4">
                    <h4 className="text-base font-semibold mb-2 line-clamp-1">{video.videoTitle}</h4>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{video.videoDescription}</p>
                  </div>
                  {video.s3Url && (
                    <div className="relative pt-[56.25%] bg-black">
                      <video
                        controls
                        src={video.s3Url}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                      <span>Uploaded by: {video.uploadedBy?.username || 'Unknown'}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/watch/${video.videoId}`}
                        className="flex-1 text-center px-3 py-1.5 bg-pink-600 hover:bg-pink-700 rounded-lg text-xs font-medium"
                        onClick={() => handleVideoClick(video.videoId)}
                      >
                        Watch Now
                      </Link>
                      <Link
                        to={`/video-details/${video.videoId}`}
                        className="flex-1 text-center px-3 py-1.5 border border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white rounded-lg text-xs font-medium"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-700 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Skillflix. Keep Learning.
      </footer>
    </div>
  );
};

export default HomePage;