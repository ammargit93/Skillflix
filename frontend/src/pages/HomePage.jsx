import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-700 bg-black/30 backdrop-blur-sm">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Skillflix
        </h1>
        <nav className="space-x-6 text-gray-300 font-medium">
          <Link to="/courses" className="hover:text-white transition">Courses</Link>
          <Link to="/profile" className="hover:text-white transition">My Profile</Link>
          <Link to="/login" className="hover:text-white transition">Logout</Link>
        </nav>
      </header>

      {/* Welcome Section */}
      <section className="px-8 py-24 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
          Welcome back to <span className="text-pink-500">Skillflix</span>!
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
          Continue learning, explore new topics, and unlock your potential.
        </p>
        <Link
          to="/courses"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:brightness-110 rounded-xl shadow-lg text-lg font-semibold transition"
        >
          Browse Courses
        </Link>
      </section>

      {/* Suggestions or Featured */}
      <section className="px-8 py-16">
        <h3 className="text-2xl font-bold mb-6 text-center">Recommended for You</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Course Card */}
          {['React Mastery', 'UI/UX Design', 'Python for Data Science'].map((title, i) => (
            <div key={i} className="bg-gray-800/70 rounded-xl p-5 shadow hover:bg-gray-700/80 transition">
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-sm text-gray-400">
                Dive into expert-curated content with hands-on projects and quizzes.
              </p>
              <Link
                to="/courses"
                className="inline-block mt-4 text-pink-400 hover:underline text-sm font-medium"
              >
                View Course →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 px-8 py-12 border-t border-gray-700 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Skillflix. Keep Learning.
      </footer>
    </div>
  );
};

export default HomePage;
