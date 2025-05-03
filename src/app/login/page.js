"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/auth-context'; 
import { ModeToggle } from "@/components/common/mode-toggle";
import { toast } from "sonner";
import Logo from "@/components/layout/logo";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();
  const { login } = useAuthContext(); 

  const handleLogin = (e) => {
    e.preventDefault(); 
    if (login(username)) { 
      router.push('/explore');
    } else {
      toast.error(
        <span>Username or password is invalid!</span>
      );
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5 font-sans relative overflow-hidden">
      {/* Left Side: Hidden on Mobile */}
      <div className="bg-red-600 text-white relative col-span-2 md:block hidden overflow-visible">
        <div className="p-9 text-lg font-bold flex items-center gap-2">
          <Logo />
          <span>SkillSwap</span>
        </div>

        <div className="text-center relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
          <p className="text-xl">Time to enhance your tech skills</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none z-50 overflow-visible">
  <img
    src="/pfp/login-1.svg"
    alt="Pending card"
    className="absolute bottom-[-70px] left-1/2 translate-x-[-50%] w-[120%] max-w-none h-auto object-contain"
  />
</div>
      </div>
      {/* Right Side */}
      <div className="bg-white flex justify-center relative col-span-3 md:col-span-3 dark dark:bg-[oklch(0.145_0_0)] z-0">
        <div className="absolute right-5 p-10 z-10 flex justify-between items-center w-full">
          <div className="text-left">
            <div className="p-9 font-bold md:hidden visible text-left flex items-center gap-2">
              <Logo />
              <span>SkillSwap</span>
            </div>
          </div>
          <div className="text-right">
            <ModeToggle />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center px-10 py-20 w-full md:w-auto">
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