import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_BASE_URL} from './constants/constants.js';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
      e.preventDefault();

      try {
          console.log('Form being sent:', form);

        const response = await fetch(API_BASE_URL+'/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.detail || 'Signup failed');
        }
        alert('Signup successful!');
        navigate('/login');
      } catch (error) {
        console.error('Signup error:', error.message);
        alert('Signup failed: ' + error.message);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900/70 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-pink-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 px-4 py-2 rounded-lg font-semibold transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account? <a href="/login" className="text-pink-400 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
