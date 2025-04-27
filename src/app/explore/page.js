"use client";

import Filter from "@/components/ui/filter";
import USERS from "@/lib/data/users";

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-15">
      {/* Filter */}
      <div>
        <Filter onFilterChange={(userIds) => {
          console.log("Show these users:", userIds);
        }} />
      </div>

      {/* Main content */}
    </div>
  );
}
