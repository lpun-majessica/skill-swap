"use client";

import { X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { SKILLS } from "@/lib/constant";
import "./profile.css";
import { Checkbox } from "../ui/checkbox";
import { useAuthContext } from "@/contexts/auth-context";
import { useDataContext } from "@/contexts/data-context";

const SkillSection = ({ title, skillKey }) => {
  const { currentUser, updateCurrentUser } = useAuthContext();
  const { updateUser } = useDataContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedSkills, setDisplayedSkills] = useState(SKILLS); // manage skill list on dropdown-menu

  const dropdownRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // searchTerm thay đổi
  useEffect(() => {
    if (openDropdown) {
      updateDisplayedSkills(searchTerm);
    }
  }, [searchTerm, openDropdown]);

  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser[skillKey]) {
      setSelectedSkills(currentUser[skillKey]);
    }
  }, [currentUser, skillKey]);

  const handleCheckboxChange = (skill) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];

    setSelectedSkills(newSkills);
    updateCurrentUser({
      ...currentUser,
      [skillKey]: newSkills,
    });
    updateUser(currentUser.id, {
      [skillKey]: newSkills,
    });
  };

  const handleRemoveSkill = (skill) => {
    const newSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(newSkills);
    updateCurrentUser({
      ...currentUser,
      [skillKey]: newSkills,
    });
    updateUser(currentUser.id, {
      [skillKey]: newSkills,
    });
  };

  // arrange skills
  const updateDisplayedSkills = (term) => {
    const filteredSkills = SKILLS.filter((skill) =>
      skill.toLowerCase().includes(term.toLowerCase()),
    );

    const selectedSet = new Set(selectedSkills);

    const selectedFirst = [
      ...filteredSkills.filter((skill) => selectedSet.has(skill)),
      ...filteredSkills.filter((skill) => !selectedSet.has(skill)),
    ];

    setDisplayedSkills(selectedFirst);
  };

  return (
    <div className="dark:bg-ss-black-929 mx-auto w-sm max-w-lg rounded-2xl bg-white p-6 shadow-lg inset-shadow-2xs sm:w-md md:w-md lg:w-md">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          placeholder="-- Add skills --"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setOpenDropdown(true)}
          className="bg-ss-light-777 dark:bg-ss-black-131 dark:focus:border-ss-black-444 w-full rounded-2xl border p-2"
        />

        {openDropdown && (
          <div className="bg-ss-light-777 dropdown-scroll dark:bg-ss-black-131 absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-2xl border shadow">
            {displayedSkills.map((skill) => (
              <label
                key={skill}
                className="dark:hover:bg-ss-black-444 flex items-center justify-between px-4 py-2 hover:bg-gray-100"
              >
                <span>{skill}</span>
                <Checkbox
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={(checked) => handleCheckboxChange(skill)}
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {selectedSkills.map((skill) => (
          <div
            key={skill}
            className="group hover:bg-ss-red-404 hover:text-ss-light-FFF dark:bg-ss-black-444 dark:hover:bg-ss-red-404 flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm"
          >
            <span>{skill}</span>
            <button onClick={() => handleRemoveSkill(skill)} className="ml-2">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;
