"use client";

import { useState, useEffect } from "react";
import { useSkillContext } from "@/contexts/skill-context";
import { useUserContext } from "@/contexts/users-context";

import { Input } from "@/components/ui/input";
import { Filter as FilterIcon, X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { SkillBadge } from "../common/skill-badge";

const initialFilter = [];

export default function Filter() {
  const SKILLS = useSkillContext();
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedTeach, setSelectedTeach, selectedLearn, setSelectedLearn } =
    useUserContext();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Clear filters when component unmounts
  useEffect(() => {
    return () => {
      setSelectedLearn(initialFilter);
      setSelectedTeach(initialFilter);
    };
  }, []);

  const handleCheckboxChange = (checked, skill, type) => {
    const info = {
      teach: {
        updatedSkills: selectedTeach,
        setUpdatedSkills: setSelectedTeach,
      },
      learn: {
        updatedSkills: selectedLearn,
        setUpdatedSkills: setSelectedLearn,
      },
    };
    const { updatedSkills, setUpdatedSkills } = info[type];

    if (checked) {
      setUpdatedSkills(updatedSkills.concat(skill));
    } else {
      setUpdatedSkills(updatedSkills.filter((s) => s !== skill));
    }
  };

  const handleClearAll = () => {
    setSelectedTeach(initialFilter);
    setSelectedLearn(initialFilter);
    setSearchTerm("");
  };

  const filteredSkills = SKILLS.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()),
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
      <div className="w-full px-4 pt-4 sm:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="dark:bg-ss-black-929 bg-ss-light-FFF flex items-center gap-2 rounded-md px-4 py-2 text-base font-semibold"
        >
          <FilterIcon size={16} />
          Filter
        </button>
      </div>

      {/* Desktop view */}
      <div className="bg-ss-light-FFF dark:bg-ss-black-929 hidden h-[625px] w-[254px] flex-col rounded-2xl p-4 shadow-md sm:flex">
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
        <div className="bg-ss-light-FFF dark:bg-ss-black-929 fixed inset-0 z-50 flex flex-col p-4">
          {/* Topbar inside mobile filter */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FilterIcon size={16} className="text-black dark:text-gray-300" />
              <h2 className="text-base font-semibold text-black dark:text-white">
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
              className="bg-ss-light-222 dark:bg-ss-black-444 dark:hover:bg-ss-black-444 flex items-center justify-center rounded-md px-10 py-1 text-sm font-semibold text-black transition-colors hover:bg-gray-100 dark:text-white"
            >
              Clear all
            </button>

            <button
              onClick={() => {
                setIsMobileFilterOpen(false);
                getFilteredUsers();
              }}
              className="bg-ss-light-222 dark:bg-ss-black-444 dark:hover:bg-ss-black-444 flex items-center justify-center gap-1 rounded-md px-10 py-1 text-sm font-semibold text-black transition-colors hover:bg-gray-100 dark:text-white"
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
    <div className="mb-4 hidden items-center justify-between sm:flex">
      <div className="flex items-center gap-2">
        <FilterIcon size={16} className="text-black dark:text-white" />
        <h2 className="text-base font-semibold text-black sm:text-lg dark:text-white">
          Filter
        </h2>
      </div>
      <button
        onClick={handleClearAll}
        className="text-ss-red-666 text-xs hover:cursor-pointer hover:underline sm:text-sm"
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
          className="bg-ss-light-555 dark:bg-ss-black-121 rounded-full text-left text-xs text-black sm:text-sm dark:text-gray-200"
          type="text"
          name="Search Skills"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <hr className="my-1 border-t border-dashed border-gray-400 dark:border-gray-400" />

      {/* Skill list */}
      <div className="flex h-full flex-col space-y-2 overflow-y-scroll pr-1 sm:pr-2">
        {/* Sticky header */}
        <div className="dark:bg-ss-black-929 sticky top-0 z-10 grid grid-cols-[3.5fr_1fr_1fr] gap-1 bg-white px-1 py-2 sm:gap-2 sm:px-2">
          <div className="text-left text-base font-semibold text-black dark:text-white">
            Skills
          </div>
          <div className="text-center text-sm text-gray-300 dark:text-gray-200">
            Teach
          </div>
          <div className="text-center text-sm text-gray-300 dark:text-gray-200">
            Learn
          </div>
        </div>

        {sortedSkills.map(({ id, name }) => (
          <div
            key={id}
            className="dark:hover:bg-ss-black-444 grid grid-cols-[3.5fr_1fr_1fr] gap-1 rounded-xl px-1 py-2 transition-colors duration-300 hover:bg-gray-100 sm:gap-2 sm:px-2"
          >
            <div className="flex items-center justify-start">
              <SkillBadge skill={name} />
            </div>
            <div className="flex items-center justify-center">
              <Checkbox
                checked={selectedTeach.includes(name)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(checked, name, "teach")
                }
                className="dark:border-ss-black-717 dark:bg-ss-black-717 accent-ss-red-666 h-3.5 w-3.5 flex-shrink-0 rounded border-gray-300 bg-white hover:cursor-pointer focus:ring-0 sm:h-4 sm:w-4"
              />
            </div>
            <div className="flex items-center justify-center">
              <Checkbox
                checked={selectedLearn.includes(name)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(checked, name, "learn")
                }
                className="dark:border-ss-black-717 dark:bg-ss-black-717 accent-ss-red-666 h-3.5 w-3.5 flex-shrink-0 rounded border-gray-300 bg-white hover:cursor-pointer focus:ring-0 sm:h-4 sm:w-4"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
