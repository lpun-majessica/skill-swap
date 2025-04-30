"use client";
import Filter from "@/components/ui/filter";
import USERS from "@/lib/data/users";

export default function ExplorePage() {
  return (
    <div className="flex flex-row items-start min-h-screen px-20 py-10">
      {/* Filter */}
      <div className="flex flex-col items-center mr-8">
        {/* <h1 className="text-4xl font-bold mb-4">Filter</h1> */}
        {/* <p className="mb-8">Select your preferences.</p> */}
        {/* <div className="bg-white shadow-md rounded-lg p-4 w-full"> */}
          {/* <h2 className="text-xl font-bold mb-4">Filter Options</h2> */}
          <Filter
            onFilterChange={(userIds) => {
              console.log("Show these users:", userIds);
            }}
          />
        </div>
      {/* </div> */}

      {/* Main content */}

    </div>
  );
}
