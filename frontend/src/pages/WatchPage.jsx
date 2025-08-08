import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from './constants/constants.js';

const WatchPage = () => {
  const { videoId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null); // 'like' or 'dislike'

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(API_BASE_URL + "/get-all-videos");
      const data = await res.json();
      setVideos(data);
      const main = data.find(v => v.videoId === videoId);
      setSelectedVideo(main);
    };

    const fetchComments = async () => {
      const res = await fetch(API_BASE_URL + `/get-comments-by-video?video_id=${videoId}`);
      const data = await res.json();
      setComments(data);
    };

    const fetchReactions = async () => {
      try {
        const res = await fetch(API_BASE_URL + `/get-video-reactions?video_id=${videoId}`);
        const data = await res.json();
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);

        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
          const userRes = await fetch(API_BASE_URL + `/get-user-reaction?video_id=${videoId}&user_id=${storedUserId}`);
          const userData = await userRes.json();
          setUserReaction(userData.reaction);
        }
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    fetchVideos();
    fetchComments();

    const storedUserId = localStorage.getItem("user_id");
    const storedUsername = localStorage.getItem("username");

    if (storedUserId && storedUsername) {
      setCurrentUser({
        userId: storedUserId,
        username: storedUsername,
      });
    }

    fetchReactions();
  }, [videoId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    try {
      const response = await fetch(API_BASE_URL + "/post-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newComment,
          user_id: currentUser.userId,
          video_id: videoId
        }),
      });

      if (response.ok) {
        const createdComment = await response.json();
        setComments([createdComment, ...comments]);
        setNewComment('');
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleReaction = async (reactionType) => {
    try {
      if (reactionType === 'like') {
        setLikes(likes + 1);
      } else {
        setDislikes(dislikes + 1);
      }

      const response = await fetch(API_BASE_URL + "/get-reaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_id: videoId,
          reaction_type: reactionType
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reaction");
      }

      const data = await response.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);

    } catch (error) {
      console.error("Error handling reaction:", error);
      if (reactionType === 'like') {
        setLikes(likes + 1);
      } else {
        setDislikes(dislikes + 1);
      }
    }
  };

  if (!selectedVideo) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-900 text-white min-h-screen">
      {/* Main Video */}
      <div className="md:w-2/3 w-full">
        <video controls src={selectedVideo.s3Url} className="w-full h-[400px] rounded-lg shadow-md" />
        <h2 className="text-2xl font-bold mt-4">{selectedVideo.videoTitle}</h2>
        <p className="text-gray-400 mt-2">{selectedVideo.videoDescription}</p>
        <p className="text-sm text-gray-500 mt-2">Uploaded by: {selectedVideo.uploadedBy?.username}</p>

        {/* Like/Dislike Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => handleReaction('like')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${userReaction === 'like' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>{likes}</span>
          </button>

          <button
            onClick={() => handleReaction('dislike')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${userReaction === 'dislike' ? 'bg-red-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{dislikes}</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">
              Comments ({comments.length})
            </h3>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-gray-400 hover:text-white transition"
            >
              {showComments ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {showComments && (
            <>
              {/* Add Comment Input */}
              {currentUser && (
                <form onSubmit={handleCommentSubmit} className="flex items-start gap-4 mb-6">
                  <img
                    src="/default-avatar.png"
                    alt="User avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a public comment..."
                      className="w-full bg-gray-800 p-3 rounded-lg text-sm resize-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setNewComment('')}
                        className="text-sm px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-sm px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-50"
                        disabled={!newComment.trim()}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Rendered Comments */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment.commentId} className="flex gap-4">
                      <img
                        src="/default-avatar.png"
                        alt="User avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold">{comment.user?.username || 'Anonymous'}</p>
                        <p className="text-sm text-gray-300">{comment.commentContent}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(comment.createdAt || Date.now()).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">No comments yet</p>
                )}
              </div>
            </>
          )}
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