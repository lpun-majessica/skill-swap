"use client";

import { Search, X } from "lucide-react";
import { useDataContext } from "@/contexts/data-context";
import { Input } from "./ui/input";

export function SearchBar({ placeholder = "Search username" }) {
  const { searchKeyword, setSearchKeyword } = useDataContext();

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="relative">
      <div className="flex items-center relative">
        <div className="absolute left-3 text-gray-400">
          <Search size={20} />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchKeyword}
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2 rounded-full bg-ss-light-777 dark:bg-ss-black-131 focus:outline-none w-full"
        />
        {searchKeyword && (
          <X
            onClick={() => setSearchKeyword("")}
            className="absolute right-3 text-gray-400"
            size={20}
          />
        )}
      </div>
    </div>
  );
}
