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

  // ➡️ NEW: Sorted skills so selected ones come first
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
    <div className="w-[290px] h-[625px] rounded-2xl shadow-md bg-white p-4 flex flex-col">
      {/* Top Bar: Filter title + Clear All */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FilterIcon size={15} className="text-gray-600" />
          <h2 className="font-semibold text-base">Filter</h2>
        </div>
        <button 
          onClick={handleClearAll} 
          className="text-red-400 text-sm hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Input
          placeholder="Search skills"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-full bg-gray-100 text-left text-sm"
        />
      </div>

      {/* Dotted border */}
      <hr className="border-t border-dashed border-gray-400 my-2" />

      {/* Combined Header + Skills List */}
      <div className="flex flex-col overflow-y-auto pr-2 space-y-2">
        {/* Sticky Header */}
        <div className="grid grid-cols-3 items-center gap-2 px-2 py-2 sticky top-0 bg-white z-10">
          <div className="text-sm font-semibold text-left text-black">Skills</div>
          <div className="text-sm text-center text-gray-500">Teach</div>
          <div className="text-sm text-center text-gray-500">Learn</div>
        </div>

        {/* Skills */}
        {sortedSkills.map((skill) => (
          <div 
            key={skill}
            className="grid grid-cols-3 items-center gap-2 px-2 py-2 rounded-xl hover:bg-gray-100 transition-colors duration-300"
          >
            {/* Skill Name */}
            <div className="flex justify-start items-center">
              <span className="bg-gray-200 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-medium">
                {skill}
              </span>
            </div>

            {/* Teach Checkbox */}
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                checked={selectedTeach.includes(skill)}
                onChange={() => handleCheckboxChange(skill, "teach")}
                className="w-4 h-4 flex-shrink-0 rounded border-gray-300 bg-white accent-red-400 checked:text-white focus:ring-0"
              />
            </div>

            {/* Learn Checkbox */}
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                checked={selectedLearn.includes(skill)}
                onChange={() => handleCheckboxChange(skill, "learn")}
                className="w-4 h-4 flex-shrink-0 rounded border-gray-300 bg-white accent-red-400 checked:text-white focus:ring-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
