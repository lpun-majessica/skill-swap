"use client";

import { useState, useEffect } from "react";
import { SKILLS } from "@/lib/constant";
import { Input } from "@/components/ui/input";
import { Filter as FilterIcon, X } from "lucide-react";
import { useDataContext } from "@/contexts/data-context"; // Import context
import { useAuthContext } from "@/contexts/auth-context";

export default function Filter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeach, setSelectedTeach] = useState([]);
  const [selectedLearn, setSelectedLearn] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Use context to get filters and set them
  const { setFilters, getFilteredUsers } = useDataContext();
  const { currentUser } = useAuthContext(); // Get current user from context
  // get current user ID from context
  const currentUserId = currentUser?.id;

  const handleCheckboxChange = (skill, type) => {
    let updatedTeach = [...selectedTeach];
    let updatedLearn = [...selectedLearn];
  
    if (type === "teach") {
      updatedTeach = selectedTeach.includes(skill)
        ? selectedTeach.filter((s) => s !== skill)
        : [...selectedTeach, skill];
      setSelectedTeach(updatedTeach);
    } else {
      updatedLearn = selectedLearn.includes(skill)
        ? selectedLearn.filter((s) => s !== skill)
        : [...selectedLearn, skill];
      setSelectedLearn(updatedLearn);
    }
  
    // Update filters in global context
    setFilters({
      skillsToTeach: updatedTeach,
      skillsToLearn: updatedLearn,
    });
  
  };

  const handleClearAll = () => {
		setSelectedTeach([]);
		setSelectedLearn([]);
    setFilters({ skillsToTeach: [], skillsToLearn: [] });
    
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

  return (
    <>
      {/* Mobile Filter Button on Top */}
      <div className="sm:hidden w-full px-4 pt-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center text-base gap-2 px-4 py-2 dark:bg-ss-black-929 bg-ss-light-FFF rounded-md font-semibold"
        >
          <FilterIcon size={16} />
          Filter
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex flex-col w-[254px] h-[625px] rounded-2xl shadow-md bg-ss-light-FFF dark:bg-ss-black-929 p-4">
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
        <div className="fixed inset-0 z-50 bg-ss-light-FFF dark:bg-ss-black-929 flex flex-col p-4">
          {/* Topbar inside mobile filter */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FilterIcon size={16} className="text-black dark:text-gray-300" />
              <h2 className="font-semibold text-base text-black dark:text-white">
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
            // selectedTeach={selectedTeach}
            // selectedLearn={selectedLearn}
            handleCheckboxChange={handleCheckboxChange}
          />

          {/* Bottom buttons */}
          <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
            <button
              onClick={handleClearAll}
              className="text-sm py-1 px-10 flex items-center justify-center bg-ss-light-222 dark:bg-ss-black-444 dark:text-white text-black rounded-md font-semibold hover:bg-gray-100 dark:hover:bg-ss-black-444 transition-colors"
            >
              Clear all
            </button>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="text-sm py-1 px-10 flex items-center justify-center gap-1 bg-ss-light-222 dark:bg-ss-black-444 text-black dark:text-white rounded-md font-semibold hover:bg-gray-100 dark:hover:bg-ss-black-444 transition-colors"
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
        <FilterIcon size={16} className="text-black dark:text-white" />
        <h2 className="font-semibold text-base sm:text-lg text-black dark:text-white">
          Filter
        </h2>
      </div>
      <button
        onClick={handleClearAll}
        className="text-ss-red-666 text-xs sm:text-sm hover:underline"
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
          className="rounded-full bg-ss-light-555 dark:bg-ss-black-121 text-left text-xs sm:text-sm text-black dark:text-gray-200"
        />
      </div>

      <hr className="border-t border-dashed border-gray-400 dark:border-gray-400 my-1" />

      {/* Skill list */}
      <div className="flex flex-col overflow-y-auto pr-1 sm:pr-2 space-y-2">
        {/* Sticky header */}
        <div className="grid grid-cols-[3.5fr_1fr_1fr] gap-1 sm:gap-2 px-1 sm:px-2 py-2 sticky top-0 bg-white dark:bg-ss-black-929 z-10">
          <div className="text-base font-semibold text-left text-black dark:text-white">
            Skills
          </div>
          <div className="text-sm  text-center text-gray-300 dark:text-gray-200">
            Teach
          </div>
          <div className="text-sm   text-center text-gray-300 dark:text-gray-200">
            Learn
          </div>
        </div>

        {sortedSkills.map((skill) => (
          <div
            key={skill}
            className="grid grid-cols-[3.5fr_1fr_1fr] gap-1 sm:gap-2 px-1 sm:px-2 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-ss-black-444 transition-colors duration-300"
          >
            <div className="flex justify-start items-center">
              <span className="bg-ss-light-222 dark:bg-ss-black-444 whitespace-nowrap rounded-full px-2 py-0.5 text-[12px] sm:text-[11px] md:text-[11px] font-medium text-black dark:text-white">
                {skill}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                checked={selectedTeach.includes(skill)}
                onChange={() => handleCheckboxChange(skill, "teach")}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 rounded border-gray-300 dark:border-ss-black-717 bg-white dark:bg-ss-black-717 focus:ring-0 accent-ss-red-666 "
              />
            </div>
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                checked={selectedLearn.includes(skill)}
                onChange={() => handleCheckboxChange(skill, "learn")}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 rounded border-gray-300 dark:border-ss-black-717 bg-white dark:bg-ss-black-717 focus:ring-0 accent-ss-red-666"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
