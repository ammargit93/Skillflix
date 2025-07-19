import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-700 bg-black/30 backdrop-blur-sm">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Skillflix
        </h1>
        <nav className="space-x-6 text-gray-300 font-medium">
          <a href="#" className="hover:text-white transition">Courses</a>
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <Link to="/signup" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-24 text-center">
        <h2 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">
          Master New Skills Anytime, Anywhere
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Skillflix is your go-to platform to learn tech, business, design, and more — taught by industry experts.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:brightness-110 rounded-xl shadow-lg text-lg font-semibold transition"
        >
          Explore Courses
        </a>
      </section>

      {/* Features */}
      <section className="px-8 py-20 bg-gray-900 bg-opacity-30 backdrop-blur-md">
        <h3 className="text-3xl font-bold text-center mb-12">Why Skillflix?</h3>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          <div className="p-6 rounded-xl bg-gray-800/70 hover:bg-gray-700/80 transition shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Expert Instructors</h4>
            <p className="text-gray-400">Learn from experienced professionals who are passionate about teaching.</p>
          </div>
          <div className="p-6 rounded-xl bg-gray-800/70 hover:bg-gray-700/80 transition shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Flexible Learning</h4>
            <p className="text-gray-400">Watch courses at your pace on mobile, tablet, or desktop.</p>
          </div>
          <div className="p-6 rounded-xl bg-gray-800/70 hover:bg-gray-700/80 transition shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Certificate of Completion</h4>
            <p className="text-gray-400">Earn certificates to showcase your achievements to employers and peers.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 px-8 py-12 border-t border-gray-700 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Skillflix. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
