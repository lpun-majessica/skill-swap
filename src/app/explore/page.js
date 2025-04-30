'use client';
import AuthGuard from '../../components/auth/AuthGuard';
import { logout } from '../../utils/auth';
import UserCard from "@/components/UserCard/UserCard";

export default function ExplorePage() {
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <AuthGuard>
      <div style={{ padding: '2rem' }}>
        <h1>Chào mừng đến Dashboard!</h1>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700 transition"
        >
          Đăng xuất
        </button>
      </div>

      <div className="flex flex-row items-start min-h-screen px-20 py-10">
        {/* Filter */}
        <div className="flex flex-col items-center mr-8">
          <h1 className="text-4xl font-bold mb-4">Filter</h1>
          <p className="mb-8">Select your preferences.</p>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">Filter Options</h2>
            {/* Add filter options here */}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <h1 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-ss-black-717 dark:text-ss-light-555">
            Recommended for you
          </h1>

          <div className="flex flex-row flex-wrap justify-center items-center gap-4">
            <UserCard
              {...{
                id: 1,
                fullname: "Alex Johnson",
                username: "alexj",
                teach: ["JavaScript", "HTML", "CSS"],
                learn: ["UI/UX Design", "React"],
                bio: "Frontend developer who loves clean code.",
                dob: "1994-06-15",
              }}
            />
            <UserCard
              {...{
                id: 2,
                fullname: "Bella Martinez",
                username: "bella.design",
                teach: ["UI/UX Design"],
                learn: ["JavaScript"],
                bio: "Designer curious about frontend dev.",
                dob: "1996-11-03",
              }}
            />
            <UserCard
              {...{
                id: 4,
                fullname: "Dana Kim",
                username: "dana.codes",
                teach: ["TypeScript", "JavaScript"],
                learn: ["React", "GraphQL"],
                bio: "Always learning. TypeScript advocate.",
                dob: "1995-09-30",
              }}
            />
            <UserCard
              {...{
                id: 5,
                fullname: "Rosa Delgado",
                username: "rosadelgado",
                teach: ["UI/UX Design", "Prototyping", "Design Systems"],
                learn: ["JavaScript"],
                bio: "UX researcher turned visual designer.",
                dob: "1991-03-17",
              }}
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
