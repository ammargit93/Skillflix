import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    video: null
  });
  const [userVideos, setUserVideos] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("video", form.video);
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("username", localStorage.getItem("username"));

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      alert("Video uploaded successfully!");
      console.log("Response:", data);

      setShowForm(false);
      setForm({ title: '', description: '', video: null });

      // Refresh the video list
      fetchVideos();
    } catch (error) {
      alert("Upload failed: " + error.message);
      console.error(error);
    }
  };

  const fetchVideos = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await fetch(`http://localhost:8080/get-user-videos?user_id=${userId}`);
      const data = await response.json();
      setUserVideos(data);
    } catch (err) {
      console.error("Error fetching user videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8 relative">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Profile</h1>
      <p className="text-gray-400 mb-8">Here you can upload and manage your skill videos.</p>

      {/* Upload Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 left-6 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:brightness-110 transition"
      >
        Upload Video
      </button>

      {/* Upload Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md space-y-6 shadow-xl border border-gray-700 relative">
            <h2 className="text-2xl font-bold">Upload New Video</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Video File</label>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-pink-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 px-4 py-2 rounded-lg font-semibold transition"
              >
                Upload
              </button>
            </form>

            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* User Videos Display Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Your Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userVideos.length === 0 ? (
            <p className="text-gray-400">You haven’t uploaded any videos yet.</p>
          ) : (
            userVideos.map((video) => (
              <div
                key={video.videoId}
                className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-700"
              >
                <h3 className="text-lg font-semibold mb-2">{video.videoTitle}</h3>
                <p className="text-sm text-gray-400 mb-3">{video.videoDescription}</p>
                <video
                  controls
                  src={video.s3Url}
                  className="w-full h-48 rounded-md"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;



