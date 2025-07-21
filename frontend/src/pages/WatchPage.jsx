import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const WatchPage = () => {
  const { videoId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("http://localhost:8080/get-all-videos");
      const data = await res.json();
      setVideos(data);
      const main = data.find(v => v.videoId === videoId);
      setSelectedVideo(main);
    };

    fetchVideos();
  }, [videoId]);

  if (!selectedVideo) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-900 text-white min-h-screen">
      {/* Main Video */}
      {/* Main Video */}
      <div className="md:w-2/3 w-full">
        <video controls src={selectedVideo.s3Url} className="w-full h-[400px] rounded-lg shadow-md" />
        <h2 className="text-2xl font-bold mt-4">{selectedVideo.videoTitle}</h2>
        <p className="text-gray-400 mt-2">{selectedVideo.videoDescription}</p>
        <p className="text-sm text-gray-500 mt-2">Uploaded by: {selectedVideo.uploadedBy?.username}</p>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>

          {/* Add Comment Input */}
          <div className="flex items-start gap-4 mb-6">
            <img
              src="/default-avatar.png"
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <textarea
              placeholder="Add a public comment..."
              className="flex-1 bg-gray-800 p-3 rounded-lg text-sm resize-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 mb-8">
            <button className="text-sm px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Cancel</button>
            <button className="text-sm px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Comment</button>
          </div>

          {/* Rendered Comments */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <img
                src="/default-avatar.png"
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">Username</p>
                <p className="text-sm text-gray-300">This is a sample comment. Great video!</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Suggested Videos */}
      <div className="md:w-1/3 w-full">
        <h3 className="text-xl font-semibold mb-4">More Videos</h3>
        <div className="space-y-4">
          {videos
            .filter(video => video.videoId !== videoId)
            .map(video => (
              <Link to={`/watch/${video.videoId}`} key={video.videoId} className="flex gap-3 hover:bg-gray-800 p-2 rounded-md">
                <video src={video.s3Url} className="w-24 h-16 rounded-md" />
                <div>
                  <p className="text-sm font-medium">{video.videoTitle}</p>
                  <p className="text-xs text-gray-400">{video.uploadedBy?.username}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
