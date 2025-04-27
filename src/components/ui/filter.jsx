"use client";

import { useState, useEffect } from "react";
import { SKILLS } from "@/lib/constant";
import { Input } from "@/components/ui/input";
import { Filter as FilterIcon, X } from "lucide-react";
import USERS from "@/lib/data/users";

export default function Filter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeach, setSelectedTeach] = useState([]);
  const [selectedLearn, setSelectedLearn] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleCheckboxChange = (skill, type) => {
    const selected = type === "teach" ? selectedTeach : selectedLearn;
    const setter = type === "teach" ? setSelectedTeach : setSelectedLearn;
    if (selected.includes(skill)) {
      setter(selected.filter((s) => s !== skill));
    } else {
      setter([...selected, skill]);
    }
  };

  const handleClearAll = () => {
    setSelectedTeach([]);
    setSelectedLearn([]);
  };

  const filteredSkills = SKILLS.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    const isASelected = selectedTeach.includes(a) || selectedLearn.includes(a);
    const isBSelected = selectedTeach.includes(b) || selectedLearn.includes(b);
    if (isASelected && !isBSelected) return -1;
    if (!isASelected && isBSelected) return 1;
    return 0;
  });

  useEffect(() => {
    const matched = USERS.filter((user) => {
      const matchesTeach = selectedTeach.some((skill) => user.teach.includes(skill));
      const matchesLearn = selectedLearn.some((skill) => user.learn.includes(skill));
      return matchesTeach || matchesLearn;
    }).map((user) => user.id);

    if (onFilterChange) {
      onFilterChange(matched);
    }
  }, [selectedTeach, selectedLearn]);

  return (
    <>
      {/* Mobile Filter Button on Top */}
      <div className="sm:hidden w-full px-4 pt-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 dark:bg-gray-500 bg-gray-200 rounded-md text-sm font-semibold"
        >
          <FilterIcon size={16} />
          Filter
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex flex-col w-[290px] h-[625px] rounded-2xl shadow-md bg-white dark:bg-black p-4">
        <TopBar handleClearAll={handleClearAll} />
        <FilterBody
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortedSkills={sortedSkills}
          selectedTeach={selectedTeach}
          selectedLearn={selectedLearn}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>

      {/* Mobile Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-black flex flex-col p-4">
          {/* Topbar inside mobile filter */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FilterIcon size={18} className="text-black dark:text-gray-300" />
              <h2 className="font-semibold text-lg text-black dark:text-gray-200">
                Filter
              </h2>
            </div>
            <button onClick={() => setIsMobileFilterOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <FilterBody
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortedSkills={sortedSkills}
            selectedTeach={selectedTeach}
            selectedLearn={selectedLearn}
            handleCheckboxChange={handleCheckboxChange}
          />

          {/* Bottom buttons */}
          <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
        <button
          onClick={handleClearAll}
          className="text-sm w-full py-2 bg-gray-200 dark:bg-gray-400 dark:text-white text-black rounded-md font-semibold"
        >
          Clear all
        </button>
  
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="text-sm w-full flex items-center justify-center gap-1 py-2 bg-gray-100 dark:bg-gray-400 text-black dark:text-white rounded-md text-sm font-semibold hover:bg-gray-500 dark:hover:bg-black transition-colors"
        >
          Filter
        </button>
        </div>
    </div>
    )}
 </>
 );
}

function TopBar({ handleClearAll }) {
  return (
    <div className="hidden sm:flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <FilterIcon size={15} className="text-gray-600 dark:text-gray-300" />
        <h2 className="font-semibold text-base sm:text-lg text-black dark:text-gray-200">
          Filter
        </h2>
      </div>
      <button
        onClick={handleClearAll}
        className="text-red-400 text-xs sm:text-sm hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}

function FilterBody({
  searchTerm,
  setSearchTerm,
  sortedSkills,
  selectedTeach,
  selectedLearn,
  handleCheckboxChange,
}) {
  return (
    <>
      {/* Search Input */}
      <div className="relative mb-4">
        <Input
          placeholder="Search skills"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-full bg-gray-100 dark:bg-black text-left text-xs sm:text-sm text-gray-200 dark:text-gray-200"
        />
      </div>

      <hr className="border-t border-dashed border-gray-400 dark:border-gray-400 my-2" />

      {/* Skill list */}
      <div className="flex flex-col overflow-y-auto pr-1 sm:pr-2 space-y-2">
        {/* Sticky header */}
        <div className="grid grid-cols-3 items-center gap-1 sm:gap-2 px-1 sm:px-2 py-2 sticky top-0 bg-white dark:bg-black z-10">
          <div className="text-xs sm:text-sm font-semibold text-left text-black dark:text-white">Skills</div>
          <div className="text-xs sm:text-sm font-semibold text-center text-gray-500 dark:text-gray-200">Teach</div>
          <div className="text-xs sm:text-sm font-semibold text-center text-gray-500 dark:text-gray-200">Learn</div>
        </div>

        {sortedSkills.map((skill) => (
          <div
            key={skill}
            className="grid grid-cols-3 items-center gap-1 sm:gap-2 px-1 sm:px-2 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-300"
          >
            <div className="flex justify-start items-center">
              <span className="bg-gray-200 dark:bg-gray-500 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-gray-800 dark:text-gray-200">
                {skill}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                checked={selectedTeach.includes(skill)}
                onChange={() => handleCheckboxChange(skill, "teach")}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 rounded border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-500 accent-red-400 focus:ring-0"
              />
            </div>
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                checked={selectedLearn.includes(skill)}
                onChange={() => handleCheckboxChange(skill, "learn")}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 rounded border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-500 accent-red-400 focus:ring-0"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
