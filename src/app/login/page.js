'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../utils/auth';
import { ModeToggle } from "@/components/common/mode-toggle";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault(); // prevent reload
  
    if (login(username)) {
      router.push('/explore');
    } else {
      alert('username or password is invalid!');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* Left Side */}
      <div className="bg-red-600 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="pl-35 pt-10">
          <h1 className="text-4xl font-bold mb-4 z-10">Welcome back!</h1>
          <p className="text-xl z-10">Time to enhance your tech skills</p>
        </div>       
        <div className="relative w-full h-96 z-0">
          <img
            src="/pfp/login.png"
            alt="Pending card"
            className="absolute top-[50px] right-[60px] h-100"
          />          
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-white relative">
        <div className="absolute right-5">
          <ModeToggle/>
        </div>
        <div className="flex flex-col justify-center items-center px-10 py-20">
          <h2 className="text-2xl font-bold mb-6">Sign in</h2>
          <form className="w-full max-w-sm" onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
            <input
              type="username"
              placeholder="your username"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-full focus:outline-none"
              onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="***********"
              className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-full focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700 transition"
            >
              Sign In
            </button>
            <p className="text-sm mt-4 text-center">
              <a href="#" className="text-red-600 underline">Forgot password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}