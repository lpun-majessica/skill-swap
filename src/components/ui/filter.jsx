"use client";
import { useState, useEffect } from "react";
import { SKILLS } from "@/lib/constant";
import { Input } from "@/components/ui/input";
import { Filter as FilterIcon } from "lucide-react";
import USERS from "@/lib/data/users"; // Assume you can import the JSON like this

export default function Filter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeach, setSelectedTeach] = useState([]);
  const [selectedLearn, setSelectedLearn] = useState([]);
  const [matchedUserIds, setMatchedUserIds] = useState([]);

  const handleCheckboxChange = (skill, type) => {
    const selected = type === "teach" ? selectedTeach : selectedLearn;
    const setter = type === "teach" ? setSelectedTeach : setSelectedLearn;

    if (selected.includes(skill)) {
      setter(selected.filter((s) => s !== skill));
    } else {
      setter([...selected, skill]);
    }
  };

  const filteredSkills = SKILLS.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const matched = USERS.filter((user) => {
      const matchesTeach = selectedTeach.some((skill) => user.teach.includes(skill));
      const matchesLearn = selectedLearn.some((skill) => user.learn.includes(skill));
      return matchesTeach || matchesLearn;
    }).map((user) => user.id);
  
    setMatchedUserIds(matched);
  
    if (onFilterChange) {
      onFilterChange(matched);
    }
  }, [selectedTeach, selectedLearn]);

  return (
    <div className="w-[285px] h-[630px] rounded-2xl shadow-md bg-white p-4">
      <div className="mb-4 relative">
        <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          placeholder="Search skills"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-full pl-10 pr-4 py-2"
        />
      </div>

      <hr className="border-t border-dashed border-gray-400 my-3" />

      <div className="grid grid-cols-3 text-sm font-semibold text-gray-500 mb-2">
        <div className="text-left text-black">Skills</div>
        <div className="text-right">Teach</div>
        <div className="text-center">Learn</div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        {filteredSkills.map((skill) => (
          <div 
            key={skill}
            className="grid grid-cols-3 items-center rounded-xl transition-colors duration-500 px-2 py-2 hover:bg-neutral-100"
          >
            <div className="flex">
              <span className="bg-gray-200 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold">
                {skill}
              </span>
            </div>
            <div className="flex justify-end">
              <input
                type="checkbox"
                checked={selectedTeach.includes(skill)}
                onChange={() => handleCheckboxChange(skill, "teach")}
                className="accent-red-400 w-4 h-4 flex-shrink-0"
              />
            </div>
            <div className="flex justify-end">
              <input
                type="checkbox"
                checked={selectedLearn.includes(skill)}
                onChange={() => handleCheckboxChange(skill, "learn")}
                className="accent-red-400 w-4 h-4 flex-shrink-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
