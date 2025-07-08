"use client";

import { useRouter } from "next/navigation";
import React from "react";

import UserCardDemo from "@/components/user-card/user-card-demo";
import { HeartHandshake, Repeat2, Share2 } from "lucide-react";
import { mockUsers } from "@/utils/constant";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const { data } = useSession();
  const handleRedirect = () => router.push(data ? "/explore" : "/signin");

  return (
    <div className="font-inter flex w-full flex-col items-center overflow-x-hidden">
      {/* === 1. Hero Section === */}
      <section className="text-ss-light-222 relative h-screen w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/lpp/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Semi-transparent overlay */}
        <div className="bg-ss-black-717/60 absolute inset-0 backdrop-blur-sm" />

        {/* Content */}
        <div className="text-ss-light-222 relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="font-inter text-ss-light-222 flex max-w-3xl flex-col gap-2 text-2xl leading-[120%] font-bold sm:text-3xl md:flex-row lg:text-4xl">
            <span>Grow Your Network</span>
            <span className="hidden md:block"> - </span>
            <span>Sharpen Your Skills</span>
          </h1>
          <p className="font-inter font-regular text-ss-light-222 mt-4 max-w-2xl text-lg sm:text-xl lg:text-2xl">
            Fuel Your Growth Through Skill Exchange.
            <br />
            Share What You Know, Learn What You Love.
          </p>
          <button
            className="font-inter text-ss-light-222 bg-ss-red-505 hover:bg-ss-red-404 mt-6 rounded-full px-7 py-2 font-bold hover:cursor-pointer md:mt-10 md:text-lg lg:px-9 lg:py-2.5"
            onClick={handleRedirect}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* === 2. Intro + Features === */}
      <section className="bg-background mt-20 w-full px-6 py-15 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-regular dark:text-ss-light-222 text-ss-black-717 mb-4 text-center text-2xl lg:text-3xl">
            Welcome to{" "}
            <span className="relative inline-block">
              {/* Image behind text */}
              <img
                src="/lpp/red_box.svg "
                alt=""
                className="bg-ss-red-505 dark:bg-ss-red-404 pointer-events-none absolute top-4.75 left-2.5 z-0 w-full rounded-sm md:top-6 md:left-3"
              />
              {/* Text on top */}
              <span className="relative z-10 font-bold">SkillSwap</span>
            </span>
          </h2>
          <p className="font-regular font-inter dark:text-ss-light-222 text-ss-black-717 mx-auto mb-12 max-w-2xl text-center text-base md:text-lg lg:text-[20px]">
            SkillSwap is a platform that helps you connect with others through
            technology skills — whether you want to teach or learn. Share your
            knowledge, grow your skills, and empower each other.
          </p>

          <div className="px:20 grid grid-cols-1 justify-items-center gap-10 md:grid-cols-3 md:gap-12 lg:gap-15 lg:px-35">
            {/* Card 1 */}
            <div className="bg-ss-light-777 dark:bg-ss-black-131 w-full max-w-sm rounded-xl p-6 text-left shadow-sm">
              <Share2 className="text-ss-red-404 mb-2 h-6 w-6" />
              <h3 className="text-ss-red-404 mb-1 font-semibold md:mb-2 md:text-lg">
                Connect
              </h3>
              <p className="text-ss-black-717 dark:text-ss-black-29D text-sm leading-snug md:text-base">
                Find people who match your learning or teaching goals, make
                meaningful connections.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-ss-light-777 dark:bg-ss-black-131 w-full max-w-sm rounded-xl p-6 text-left shadow-sm">
              <Repeat2 className="text-ss-red-404 mb-2 h-6 w-6" />
              <h3 className="text-ss-red-404 mb-1 font-semibold md:mb-2 md:text-lg">
                Exchange
              </h3>
              <p className="text-ss-black-717 dark:text-ss-black-29D text-sm leading-snug md:text-base">
                Share what you know and learn what you love through skill-based
                collaboration.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-ss-light-777 dark:bg-ss-black-131 w-full max-w-sm rounded-xl p-6 text-left shadow-sm">
              <HeartHandshake className="text-ss-red-404 mb-2 h-6 w-6" />
              <h3 className="text-ss-red-404 mb-1 font-semibold md:mb-2 md:text-lg">
                Grow Together
              </h3>
              <p className="text-ss-black-717 dark:text-ss-black-29D text-sm leading-snug md:text-base">
                Grow with a community that believes in mutual learning and
                support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === 3. What You Can Do === */}
      <section className="bg-background w-full px-10 py-10 md:py-16">
        <div
          className="bg-ss-red-505 mx-auto flex max-w-6xl flex-row items-center gap-8 overflow-hidden rounded-2xl p-6 md:p-10"
          style={{
            backgroundImage: "url('/lpp/grid.svg')",
            backgroundSize: "cover",
          }}
        >
          {/* Image side */}
          <img
            src="/lpp/laptop.svg"
            alt="Collaboration"
            className="hidden rounded-xl object-cover md:block md:aspect-square md:w-3/8 lg:aspect-4/3"
          />

          {/* Text side */}
          <div className="text-ss-light-222 flex-1 space-y-4">
            <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
              What You Can Do?
            </h2>
            <ul className="mb-6 list-disc space-y-2 pl-5 lg:text-lg">
              <li>
                Find people who can teach you skills you're eager to learn
              </li>
              <li>Share your own knowledge by helping others</li>
              <li>Build meaningful connections in the tech community</li>
              <li>Explore a wide range of skills</li>
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {["Python", "C++", "JavaScript", "Java", "PHP", "SQL"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-ss-red-404 rounded-full bg-white px-3 py-1 text-sm font-semibold lg:text-base"
                  >
                    {tag}
                  </span>
                ),
              )}
              <span className="text-ss-light-222 text-sm font-semibold lg:text-base">
                and more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* === 4. Featured Profiles === */}
      <section className="bg-ss-light-777 dark:bg-ss-black-929 mt-20 min-h-[10px] w-full">
        <div className="mx-auto max-w-7xl space-y-10">
          {/* Banner Text */}
          <div className="my-8 flex items-center justify-center space-x-2 px-7 md:px-10">
            <span className="text-ss-light-222 bg-ss-red-505 rounded-full px-5 py-3 text-center text-sm font-semibold md:px-8 md:py-4 md:text-base">
              Start connecting, sharing, and leveling up together
            </span>
            <img
              src="/lpp/logo.svg"
              alt="Logo"
              className="hidden h-10 w-10 md:inline-block"
            />
          </div>

          <div className="mx-auto mb-15 w-full">
            <div className="flex flex-row flex-wrap items-center justify-center gap-8">
              {mockUsers.map((user) => (
                <UserCardDemo key={user.id} {...user} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === 5. Testimonial Banner === */}
      <section
        className="text-ss-light-222 relative h-[320px] w-full bg-cover bg-center md:h-[270px]"
        style={{ backgroundImage: "url('/lpp/hand.jpg')" }}
      >
        {/* Overlay blur */}
        <div className="bg-ss-black-717/60 absolute inset-0 backdrop-blur-sm" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-start gap-6 px-10 text-center lg:flex-row lg:text-left">
          {/* Left - Logo and Text */}
          <div className="font-regular flex items-start gap-4 py-10 text-[25px]">
            <img src="/lpp/logo.svg" alt="Logo" className="h-16 w-16" />
            <div className="text-ss-light-222 text-left text-base leading-relaxed md:text-lg">
              <p>
                SkillSwap gives everyone, from beginners to experts, a space to
                share and grow through skill exchange.
              </p>
              <p className="mt-3">
                No classes, no fees. Just people helping people.
              </p>
            </div>
          </div>

          {/* Right - User count */}
          <div className="absolute right-6 bottom-4 flex items-center gap-2 pb-2">
            <p className="text-ss-light-222/80 text-sm font-bold whitespace-nowrap">
              More than 2K+ users
            </p>

            <div className="bg-ss-red-505 flex items-center rounded-full px-3 py-2 shadow-lg">
              <div className="flex -space-x-2">
                <img
                  src="/lpp/avatar (1).png"
                  className="h-8 w-8 rounded-full"
                />
                <img
                  src="/lpp/avatar (2).png"
                  className="h-8 w-8 rounded-full"
                />
                <img
                  src="/lpp/avatar (3).png"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <span className="text-ss-light-222 ml-3 text-sm font-bold">
                2K+
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* === 6. Universe === */}
      <section className="relative h-screen w-full overflow-hidden text-center">
        {/* Light and dark background images */}
        <img
          src="/lpp/universe_light.svg"
          className="absolute top-0 left-0 z-0 h-full w-full object-cover dark:hidden"
          alt="Universe Light"
        />
        <img
          src="/lpp/universe_dark.svg"
          className="absolute top-0 left-0 z-0 hidden h-full w-full object-cover dark:block"
          alt="Universe Dark"
        />

        {/* Centered content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5">
          <h2 className="dark:text-ss-light-222 text-ss-black-717 mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Ready to start your skill–sharing journey?
          </h2>
          <p className="text-dark dark:text-ss-light-222 mb-6 max-w-xl py-2 text-lg sm:text-xl lg:text-2xl">
            Join SkillSwap today and be part of a growing tech learning
            community!
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="text-ss-light-222 hover:bg-ss-red-404 bg-ss-red-505 rounded-full px-8 py-2 font-bold transition hover:cursor-pointer"
              onClick={handleRedirect}
            >
              Get Started
            </button>
            <button
              className="hover:text-ss-light-222 hover:bg-ss-red-505 text-ss-red-404 border-ss-red-505 rounded-full border px-6 py-2 font-semibold transition hover:cursor-pointer"
              onClick={() => router.push("/explore")}
            >
              Explore Users
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
