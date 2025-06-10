"use client";

import "./profile.css";

import React, { useEffect, useState, useRef } from "react";
import { useCurrentUserContext } from "@/contexts/current-user-context";
import { useSkillContext } from "@/contexts/skill-context";

import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SkillBadge } from "../common/skill-badge";

const SkillSection = ({ title, skillKey }) => {
  const { currentUser, addSkill, removeSkill } = useCurrentUserContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const SKILLS = useSkillContext();
  const [displayedSkills, setDisplayedSkills] = useState([]); // manage skill list on dropdown-menu
  const [selectedSkills, setSelectedSkills] = useState([]);

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

  useEffect(() => {
    if (currentUser && currentUser[skillKey]) {
      setSelectedSkills(currentUser[skillKey]);
    }
  }, [currentUser, skillKey]);

  const handleAddSkill = (skillId, skillName) => {
    const newSkills = [...selectedSkills, { id: skillId, name: skillName }];
    setSelectedSkills(newSkills);

    addSkill(skillKey, { skillId });
  };

  const handleRemoveSkill = (skillId, skillName) => {
    const newSkills = selectedSkills.filter((s) => s.name !== skillName);
    setSelectedSkills(newSkills);

    removeSkill(skillKey, { skillId });
  };

  // arrange skills
  const updateDisplayedSkills = (term) => {
    const filteredSkills = SKILLS.filter(({ name }) =>
      name.toLowerCase().includes(term.toLowerCase()),
    );

    const selectedSet = new Set(selectedSkills.map((skill) => skill.name));

    const selectedFirst = [
      ...filteredSkills.filter((skill) => selectedSet.has(skill.name)),
      ...filteredSkills.filter((skill) => !selectedSet.has(skill.name)),
    ];

    setDisplayedSkills(selectedFirst);
  };

  return (
    <div className="dark:bg-ss-black-929 mx-auto w-sm max-w-lg rounded-2xl bg-white p-6 shadow-lg inset-shadow-2xs sm:w-md md:w-md lg:w-md">
      <h3 className="mb-2 text-base font-semibold lg:text-lg">{title}</h3>
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          placeholder="-- Add skills --"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setOpenDropdown(true)}
          className="bg-ss-light-777 dark:bg-ss-black-131 dark:focus:border-ss-black-444 w-full rounded-2xl border p-2 text-sm lg:text-base"
        />

        {openDropdown && (
          <div className="bg-ss-light-777 dropdown-scroll dark:bg-ss-black-131 absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-2xl border shadow">
            {displayedSkills.map(({ id, name }) => (
              <label
                key={id}
                className="dark:hover:bg-ss-black-444 flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 lg:text-base"
              >
                <span>{name}</span>
                <Checkbox
                  checked={selectedSkills.some((skill) => skill.name === name)}
                  onCheckedChange={(checked) => {
                    checked
                      ? handleAddSkill(id, name)
                      : handleRemoveSkill(id, name);
                  }}
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {selectedSkills.map(({ id, name }) => (
          <SkillBadge key={id} skill={name}>
            <button
              onClick={() => handleRemoveSkill(id, name)}
              className="hover:bg-ss-black-29D hover:dark:bg-ss-black-171 -mr-1 rounded-full p-1 hover:cursor-pointer"
              size="icon"
              title="Remove from skill list"
            >
              <X className="size-3" strokeWidth={4} />
            </button>
          </SkillBadge>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;
