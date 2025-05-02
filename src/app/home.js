"use client";

import React from "react";
import { UserCardDemo } from "@/components/UserCard/UserCardDemo.jsx";
import mockUsers from "@/lib/data/users.json";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden font-inter">

      {/* === 1. Hero Section === */}
      <section
        className="relative w-full h-screen text-white overflow-hidden "
      >
        {/* Background image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/lpp/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Semi-transparent black overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-4xl md:text-4xl text-white font-bold max-w-3xl font-inter text-[48px] leading-[120%]">
            Grow Your Network, Sharpen Your Skills
          </h1>
          <p className="text-lg mt-4 max-w-2xl text-white font-inter text-[24px] font-regular">
            Fuel Your Growth Through Skill Exchange.<br />
            Share What You Know, Learn What You Love.
          </p>
          <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold font-inter">
            Get Started
          </button>
        </div>
      </section>

      {/* === 2. Intro + Features === */}
      <section className="w-full bg-background py-20 px-6 mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl mb-4 text-center text-[50px] font-regular text-black dark:text-white">
            Welcome to{' '}
            <span className="relative inline-block">
              {/* Image behind text */}
              <img
                src="/lpp/red_box.svg "
                alt=""
                className="absolute top-6 left-3 w-full pointer-events-none z-0 bg-[#FF0000] dark:bg-[#CB0404]"
              />
              {/* Text on top */}
              <span className="relative z-10 font-bold">SkillSwap</span>
            </span>
          </h2>
          <p className="text-black dark:text-white max-w-2xl mx-auto mb-12 text-center font-regular text-[20px] font-inter">
            SkillSwap is a platform that helps you connect with others through <br></br> technology skills — whether you want to teach or learn. Share your <br></br> knowledge, grow your skills, and empower each other.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-15 justify-items-center px-35">
            {/* Card 1 */}
            <div className="w-full max-w-sm bg-[#F7F7F7] dark:bg-[#292929] rounded-xl shadow-sm p-6 text-left">
              <img src="/lpp/share.png" alt="Connect Icon" className="w-6 h-6 mb-2" />
              <h3 className="text-red-600 font-semibold mb-1 text-[DA0505]">Connect</h3>
              <p className="text-sm text-black dark:text-[#8C8C8C] leading-snug">
                Find people who match your learning or teaching goals, make meaningful tech connections.
              </p>
            </div>

            {/* Card 2 */}
            <div className="w-full max-w-sm bg-[#F7F7F7] dark:bg-[#292929] rounded-xl shadow-sm p-6 text-left">
              <img src="/lpp/arrow.png" alt="Exchange Icon" className="w-6 h-6 mb-2" />
              <h3 className="text-red-600 font-semibold mb-1 text-[DA0505]">Exchange</h3>
              <p className="text-sm text-black dark:text-[#8C8C8C] leading-snug">
                Share what you know and learn what you love through skill-based collaboration.
              </p>
            </div>

            {/* Card 3 */}
            <div className="w-full max-w-sm bg-[#F7F7F7] dark:bg-[#292929] rounded-xl shadow-sm p-6 text-left">
              <img src="/lpp/Union.png" alt="Grow Together Icon" className="w-6 h-6 mb-2" />
              <h3 className="text-red-600 font-semibold mb-1 text-[DA0505]">Grow Together</h3>
              <p className="text-sm text-black dark:text-[#8C8C8C] leading-snug">
                Grow with a community that believes in mutual learning and support.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* === 3. What You Can Do === */}
      <section className="w-full bg-background px-6 py-16">
        <div className="max-w-6xl mx-auto bg-red-600 rounded-2xl overflow-hidden p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center"
          style={{ backgroundImage: "url('/lpp/grid.svg')", backgroundSize: "cover" }}>

          {/* Image side */}
          <div className="w-full md:w-1/2">
            <img
              src="/lpp/laptop.svg"
              alt="Collaboration"
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          {/* Text side */}
          <div className="flex-1 space-y-4 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What You Can Do?</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Find people who can teach you skills you're eager to learn</li>
              <li>Share your own knowledge by helping others</li>
              <li>Build meaningful connections in the tech community</li>
              <li>Explore a wide range of skills</li>
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['Python', 'C++', 'ReactJS', 'Angular', 'Java', 'PHP', 'SQL'].map((tag) => (
                <span
                  key={tag}
                  className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* === 4. Featured Profiles === */}
      <section className="w-full bg-[#F7F7F7] dark:bg-[#292929] min-h-[10px] mt-20">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Banner Text */}
          <div className="flex items-center justify-center space-x-2 mt-10 m8b-5">
            <span className="bg-red-600 text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold">
              Start connecting, sharing, and leveling up together
            </span>
            <img src="/lpp/logo.svg" alt="Logo" className="w-10 h-10 inline-block" />
          </div>

          {/* User Card Demo 1, 13, 16, 17*/}
          <div className="w-full max-w-7xl mx-auto mb-15">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 place-items-center">
              {mockUsers
                .filter((user) => [1, 2, 3, 4].includes(user.id))
                .map((user) => (
                  <UserCardDemo
                    key={user.id}
                    id={user.id}
                    fullname={user.fullname}
                    username={user.username}
                    skillsToTeach={user.skillsToTeach}
                    skillsToLearn={user.skillsToLearn}
                    bio={user.bio}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>


      {/* === 5. Testimonial Banner === */}
      <section
        className="relative w-full h-[270px] bg-cover bg-center text-white mt-20"
        style={{ backgroundImage: "url('/lpp/hand.jpg')" }}
      >
        {/* Overlay blur */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-start h-full px-10 gap-6 text-center lg:text-left">
          {/* Left - Logo and Text */}
          <div className="flex items-start gap-4 text-[25px] font-regular py-10">
            <img src="/lpp/logo.svg" alt="Logo" className="w-16 h-16" />
            <div className="text-lg leading-relaxed text-black">
              <p>
                SkillSwap gives everyone — from beginners to experts — a space <br />
                to share and grow through skill exchange.<br />
                No classes, no fees. Just people helping people.
              </p>
            </div>
          </div>

          {/* Right - User count */}
          <div className="flex items-center gap-2 absolute bottom-4 right-6">
            <p className="text-white/80 text-sm font-bold whitespace-nowrap">More than 2K+ users</p>

            <div className="bg-red-600 rounded-full px-3 py-2 flex items-center shadow-lg">
              <div className="flex -space-x-2">
                <img src="/lpp/avatar (1).png" className="w-8 h-8 rounded-full" />
                <img src="/lpp/avatar (2).png" className="w-8 h-8 rounded-full" />
                <img src="/lpp/avatar (3).png" className="w-8 h-8 rounded-full" />
              </div>
              <span className="text-white text-sm font-bold ml-3">2K+</span>
            </div>
          </div>
        </div>

      </section>

      {/* === 6. Universe === */}
      <section className="relative w-full text-center overflow-hidden mt-20 h-[600px]">
        {/* Light and dark background images */}
        <img
          src="/lpp/universe_light.svg"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 dark:hidden"
          alt="Universe Light"
        />
        <img
          src="/lpp/universe_dark.svg"
          className="hidden dark:block absolute top-0 left-0 w-full h-full object-cover z-0"
          alt="Universe Dark"
        />

        {/* Centered content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center">
          <h2 className="text-4xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            Ready to start your skill–sharing journey?
          </h2>
          <p className="text-dark dark:text-white mb-6 max-w-xl text-2xl">
            Join SkillSwap today and be part of a growing <br></br> tech learning community!
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-[#DA0505] text-white rounded-full hover:bg-red-700 transition font-bold">
              Get Started
            </button>
            <button className="px-6 py-2 border border-[#DA0505] text-red-600 rounded-full hover:bg-red-600 hover:text-white transition font-semibold">
              Explore Users
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-all">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-red-600 mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}

