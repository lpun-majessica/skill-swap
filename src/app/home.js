import React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">

      {/* === 1. Hero Section === */}
      <section
        className="relative w-full h-screen text-white overflow-hidden "
      >
        {/* Background image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/landing_page_picture/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Semi-transparent black overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" /> {/* <- control how dark here */}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-4xl md:text-4xl font-bold max-w-3xl">
            Grow Your Network, Sharpen Your Skills
          </h1>
          <p className="text-lg mt-4 max-w-2xl text-gray-200 font-semibold">
            Fuel Your Growth Through Skill Exchange.<br />
            Share What You Know, Learn What You Love.
          </p>
          <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold">
            Get Started
          </button>
        </div>
      </section>

      {/* === 2. Intro + Features === */}
        <section className="w-full bg-background py-20 px-6 mt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-black dark:text-white">
          Welcome to <span className="text-red-600">SkillSwap</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12 text-center">
          SkillSwap is a platform that helps you <span className="font-medium">connect</span> with others through technology skills — whether you want to teach or learn. Share your knowledge, grow your skills, and empower each other.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-30 ml-30 mr-0">
          {/* Card 1 */}
            <div className="bg-[#F7F7F7] dark:bg-[#292929] rounded-xl shadow-sm p-6 text-left">
              <img src="/landing_page_picture/share.png" alt="Connect Icon" className="w-6 h-6 mb-2" />
              <h3 className="text-red-600 font-semibold mb-1">Connect</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                Find people who match your learning or teaching goals, make meaningful tech connections.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F7F7F7] dark:bg-[#292929] rounded-xl shadow-sm p-6 text-left">
              <img src="/landing_page_picture/arrow.png" alt="Exchange Icon" className="w-6 h-6 mb-2" />
              <h3 className="text-red-600 font-semibold mb-1">Exchange</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                Share what you know and learn what you love through skill-based collaboration.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F7F7F7] dark:bg-[#292929] rounded-xl shadow-sm p-6 text-left">
              <img src="/landing_page_picture/Union.png" alt="Grow Together Icon" className="w-6 h-6 mb-2" />
              <h3 className="text-red-600 font-semibold mb-1">Grow Together</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                Grow with a community that believes in mutual learning and support.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* === 3. What You Can Do === */}
      <section className="w-full bg-background px-6 mt-20">
        <div
          className="max-w-6xl mx-auto bg-red-600 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center text-white gap-8 relative overflow-hidden"
          style={{ backgroundImage: "url('/landing_page_picture/grid.svg')", backgroundSize: "cover" }}
        >
          {/* Image side */}
          <div className="flex-1 overflow-hidden rounded-xl w-200 h-full">
            <img
              src="/landing_page_picture/laptop.svg"
              alt="Collaboration"
              className="w-full h-full object-cover"
            />
          </div>


          {/* Text side */}
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold">What You Can Do?</h3>
            <ul className="list-disc pl-5 space-y-2 text-white text-sm md:text-base">
              <li>Find people who can teach you skills you&apos;re eager to learn</li>
              <li>Share your own knowledge by helping others</li>
              <li>Build meaningful connections in the tech community</li>
              <li>Explore a wide range of skills</li>
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["Python", "C++", "ReactJS", "Angular", "Java", "PHP", "SQL"].map((tag) => (
                <span
                  key={tag}
                  className="bg-white text-red-600 px-3 py-1 text-sm font-medium rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* === 4. Featured Profiles === */}
      <section className="w-full bg-[#F7F7F7] dark:bg-[#292929] px-6 py-16 min-h-[10px] mt-20">
        <div className="max-w-6xl mx-auto text-center space-y-10">

          {/* Banner Text */}
          <div className="flex items-center justify-center space-x-2 mt-1 mb-5">
            <span className="bg-red-600 text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold">
              Start connecting, sharing, and leveling up together
            </span>
            <img src="/landing_page_picture/logo.svg" alt="Logo" className="w-10 h-10 inline-block" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 justify-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 scale-95 rounded-xl shadow-md text-center w-[275px] mx-auto"
              >
                <div className="w-20 h-20 mx-auto bg-gray-300 rounded-full" />
                <h4 className="font-semibold text-gray-800 mt-2 text-sm">userName</h4>
                <p className="text-xs text-gray-500 -mt-1 mb-3">Tell me about yourself...</p>

                <div className="text-left text-xs text-gray-700 space-y-2">
                  <div>
                    <p className="font-medium text-gray-900">Teaching</p>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="bg-red-100 border border-red-400 px-2 py-0.5 rounded-full">JavaScript</span>
                      <span className="bg-gray-200 px-2 py-0.5 rounded-full">React</span>
                      <span className="bg-gray-200 px-2 py-0.5 rounded-full">Front-end</span>
                      <span className="text-gray-400 pl-1">+2 skills</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <p className="font-medium text-gray-900">Learning</p>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Python</span>
                      <span className="bg-gray-200 px-2 py-0.5 rounded-full">SQL</span>
                    </div>
                  </div>
                </div>

                <button className="mt-4 px-4 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-all">
                  Connect +
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* === 5. Testimonial Banner === */}
      <section
        className="relative w-full h-[220px] bg-cover bg-center text-white mt-20"
        style={{ backgroundImage: "url('/landing_page_picture/hand.jpg')" }}
      >
        {/* Overlay blur */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-between h-full px-6">
          {/* Left - Logo and Text */}
          <div className="flex items-start gap-4">
            <img src="/landing_page_picture/logo.svg" alt="Logo" className="w-18 h-18" /> {/* tăng từ w-12 h-12 → w-16 h-16 */}
            <div className="text-lg leading-relaxed text-black">
              <p>
                <span className="font-bold text-xl">SkillSwap</span> gives everyone — from beginners to experts — a space
              </p>
              <p className="mt-1"> to share and grow through skill exchange.</p>
              <p className="mt-1 text-m text-black/80">
                No classes, no fees. Just people helping people.
              </p>
            </div>
          </div>

          {/* Right - Box with avatars + badge */}
          <div className="absolute bottom-4 right-6 flex flex-col items-end gap-2">
            <p className="text-white/80 text-sm mr-2 font-bold">More than 2K+ users</p>

            <div className="bg-red-600 rounded-full px-5 py-3 flex items-center gap-[-8px] shadow-lg">
              <div className="flex -space-x-2">
                <img src="/landing_page_picture/avatar (1).png" className="w-8 h-8 rounded-full" />
                <img src="/landing_page_picture/avatar (2).png" className="w-8 h-8 rounded-full" />
                <img src="/landing_page_picture/avatar (3).png" className="w-8 h-8 rounded-full" />
              </div>
              <span className="text-white text-sm font-semibold ml-3">2K+</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full text-center overflow-hidden mt-20 h-[600px]">
        {/* Light and dark background images */}
        <img
          src="/landing_page_picture/universe_light.svg"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 dark:hidden"
          alt="Universe Light"
        />
        <img
          src="/landing_page_picture/universe_dark.svg"
          className="hidden dark:block absolute top-0 left-0 w-full h-full object-cover z-0"
          alt="Universe Dark"
        />

        {/* Centered content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
            Ready to start your skill–sharing journey?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-xl">
            Join SkillSwap today and be part of a growing tech learning community!
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition font-bold">
              Get Started
            </button>
            <button className="px-6 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition font-semibold">
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

