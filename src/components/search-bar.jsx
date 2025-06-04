"use client";

import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect } from "react";
import { useUserContext } from "@/contexts/users-context";

const initialKeyword = "";

export function SearchBar() {
  const { searchKeyword, setSearchKeyword } = useUserContext();

  const handleReset = () => setSearchKeyword(initialKeyword);
  const handleKeywordChange = (e) => setSearchKeyword(e.target.value);

  useEffect(() => {
    return handleReset;
  }, []);

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search size={17} />
        </div>
        <Input
          placeholder="Search name or username"
          className="bg-ss-light-777 dark:bg-ss-black-131 w-60 rounded-full py-2 pr-4 pl-10 text-sm focus:outline-none min-[1180px]:w-64 min-[1180px]:text-base"
          type="text"
          value={searchKeyword}
          onChange={handleKeywordChange}
          name="Search name"
        />
        {searchKeyword && (
          <X
            onClick={handleReset}
            className="absolute right-3 text-gray-400"
            size={20}
          />
        )}
      </div>
    </div>
  );
}
