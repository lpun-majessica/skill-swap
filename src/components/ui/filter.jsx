"use client";
import { useState, useEffect } from "react";
import { SKILLS } from "@/lib/constant";
import { Input } from "@/components/ui/input";
import { Filter as FilterIcon } from "lucide-react";
import USERS from "@/lib/data/users";

export default function Filter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeach, setSelectedTeach] = useState([]);
  const [selectedLearn, setSelectedLearn] = useState([]);

  const handleCheckboxChange = (skill, type) => {
    // Toggle the checkbox state based on the type (teach or learn)
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

  // Sorted skills so selected ones come first
  const sortedSkills = [...filteredSkills].sort((a, b) => {
    const isASelected = selectedTeach.includes(a) || selectedLearn.includes(a);
    const isBSelected = selectedTeach.includes(b) || selectedLearn.includes(b);

    if (isASelected && !isBSelected) return -1;
    if (!isASelected && isBSelected) return 1;
    return 0;
  });

  useEffect(() => {
    // Update the filter whenever selectedTeach or selectedLearn changes
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
    <div className="w-[290px] h-[625px] rounded-2xl shadow-md bg-white dark:bg-gray-900 p-4 flex flex-col">
  {/* Top Bar */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <FilterIcon size={15} className="text-gray-600 dark:text-gray-300" />
      <h2 className="font-semibold text-base text-gray-800 dark:text-gray-200">
        Filter
      </h2>
    </div>
    <button 
      onClick={handleClearAll} 
      className="text-red-400 text-sm hover:underline"
    >
      Clear all
    </button>
  </div>

  {/* Search Input */}
  <div className="relative mb-4">
    <Input
      placeholder="Search skills"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="rounded-full bg-gray-100 dark:bg-gray-800 text-left text-sm text-gray-800 dark:text-gray-200"
    />
  </div>

  <hr className="border-t border-dashed border-gray-400 dark:border-gray-700 my-2" />

  {/* List */}
  <div className="flex flex-col overflow-y-auto pr-2 space-y-2">
    {/* Sticky Header */}
    <div className="grid grid-cols-3 items-center gap-2 px-2 py-2 sticky top-0 bg-white dark:bg-gray-900 z-10">
      <div className="text-sm font-semibold text-left text-black dark:text-white">Skills</div>
      <div className="text-sm font-semibold text-center text-gray-500 dark:text-gray-400">Teach</div>
      <div className="text-sm font-semibold text-center text-gray-500 dark:text-gray-400">Learn</div>
    </div>

    {/* Skills */}
    {sortedSkills.map((skill) => (
      <div 
        key={skill}
        className="grid grid-cols-3 items-center gap-2 px-2 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
      >
        <div className="flex justify-start items-center">
          <span className="bg-gray-200 dark:bg-gray-700 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-medium text-gray-800 dark:text-gray-200">
            {skill}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            checked={selectedTeach.includes(skill)}
            onChange={() => handleCheckboxChange(skill, "teach")}
            className="w-4 h-4 flex-shrink-0 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 accent-red-400 focus:ring-0"
          />
        </div>
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            checked={selectedLearn.includes(skill)}
            onChange={() => handleCheckboxChange(skill, "learn")}
            className="w-4 h-4 flex-shrink-0 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 accent-red-400 focus:ring-0"
          />
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
