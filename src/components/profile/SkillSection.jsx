'use client';

import { X } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { SKILLS } from '@/lib/constant';
import './profile.css';
import { Checkbox } from '../ui/checkbox';
import { useAuthContext } from "@/contexts/auth-context";

const SkillSection = ({ title, skillKey, userSkills = [] }) => {
  const { currentUser, updateCurrentUser } = useAuthContext();
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

  };

  const handleRemoveSkill = (skill) => {
    const newSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(newSkills);
    updateCurrentUser({
      ...currentUser,
      [skillKey]: newSkills,
    });
  };

  const handleDropdownToggle = () => {
    const willOpen = !openDropdown;
    if (willOpen) {
      updateDisplayedSkills(searchTerm);
    }
    setOpenDropdown(willOpen);
  };

  // arrange skills
  const updateDisplayedSkills = (term) => {
    const filteredSkills = SKILLS.filter(skill =>
      skill.toLowerCase().includes(term.toLowerCase())
    );

    const selectedSet = new Set(selectedSkills);

    const selectedFirst = [
      ...filteredSkills.filter(skill => selectedSet.has(skill)),
      ...filteredSkills.filter(skill => !selectedSet.has(skill)),
    ];

    setDisplayedSkills(selectedFirst);
  };


  return (
    <div className="mx-auto w-sm sm:w-md max-w-lg md:w-md lg:w-md bg-white p-6 rounded-2xl shadow-lg inset-shadow-2xs  dark:bg-ss-black-929">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          placeholder="-- Add skills --"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleDropdownToggle}
          className="w-full p-2 border rounded-2xl bg-ss-light-777 dark:bg-ss-black-131 dark:focus:border-ss-black-444"
        />

        {openDropdown && (
          <div className="absolute z-10 mt-1 bg-ss-light-777 border rounded-2xl shadow max-h-40 overflow-auto w-full dropdown-scroll dark:bg-ss-black-131">
            {displayedSkills.map((skill) => (
              <label
                key={skill}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-ss-black-444"
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

      <div className="flex flex-wrap gap-2 mt-4">
        {selectedSkills.map((skill) => (
          <div
            key={skill}
            className="group flex items-center bg-gray-200 text-sm px-3 py-1 rounded-full hover:bg-ss-red-404 hover:text-ss-light-FFF dark:bg-ss-black-444 dark:hover:bg-ss-red-404"
          >
            <span>{skill}</span>
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2"
            >
              <X className='w-4 h-4' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;
