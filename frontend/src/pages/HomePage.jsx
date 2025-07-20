import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const username = localStorage.getItem("username");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:8080/get-all-videos');
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

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-sm">Loading videos...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-sm">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-black/30 backdrop-blur-sm">
        <h1 className="text-xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Skillflix
        </h1>
        <nav className="space-x-4 text-sm text-gray-300 font-medium">
          <Link to="/courses" className="hover:text-white transition">Courses</Link>
          <Link to={`/profile/${username}`} className="hover:text-white transition">My Profile</Link>
          <Link to="/login" className="hover:text-white transition">Logout</Link>
        </nav>
      </header>

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
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 text-center">Available Videos</h2>
        {filteredVideos.length === 0 ? (
          <div className="text-center text-sm text-gray-400 py-8">
            {searchTerm ? 'No videos match your search.' : 'No videos available yet. Check back later!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredVideos.map((video) => (
              <div
                key={video.videoId}
                className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-700"
              >
                <h4 className="text-base font-semibold mb-2">{video.videoTitle}</h4>
                <p className="text-xs text-gray-400 mb-3">{video.videoDescription}</p>
                {video.s3Url && (
                  <video
                    controls
                    src={video.s3Url}
                    className="w-full h-40 rounded-md mb-3"
                  />
                )}
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Uploaded by: {video.uploadedBy?.username || 'Unknown'}</span>
                </div>
                <div className="mt-3 flex space-x-2">
                  <a
                    href={video.s3Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1.5 bg-pink-600 hover:bg-pink-700 rounded-lg text-xs font-medium"
                  >
                    Watch Now
                  </a>
                  <button
                    className="inline-block px-3 py-1.5 border border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white rounded-lg text-xs font-medium"
                    disabled
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 px-6 py-8 border-t border-gray-700 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Skillflix. Keep Learning.
      </footer>
    </div>
  );
};

export default HomePage;
