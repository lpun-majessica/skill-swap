"use client";
import Filter from "@/components/ui/filter";
import USERS from "@/lib/data/users";
export default function ExplorePage() {
  return (
    <div className="flex items-center min-h-screen p-24">
      {/* Filter */}
      <div className="flex flex-col items-center mr-8">
        
        <Filter onFilterChange={(userIds) => {
        console.log("Show these users:", userIds);
        }} />
      </div>
      {/* Main content */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Explore</h1>
        <p className="mb-8">Discover new skills and opportunities.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Example cards */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">Skill 1</h2>
            <p>Description of skill 1.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">Skill 2</h2>
            <p>Description of skill 2.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">Skill 3</h2>
            <p>Description of skill 3.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">Skill 4</h2>
            <p>Description of skill 4.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
