'use client';
import { X } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { SKILLS } from '@/lib/constant';
import './profile.css';

const SkillSection = ({ title, skillKey, userSkills = [] }) => {
  const localStorageKey = `selectedSkills_${skillKey}`;

  const [selectedSkills, setSelectedSkills] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(localStorageKey);
      return stored ? JSON.parse(stored) : userSkills;
    }
    return userSkills;
  });

  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedSkills, setDisplayedSkills] = useState(SKILLS); // manage skill list on dropdown-menu

  const dropdownRef = useRef(null);

  // Đồng bộ localStorage khi selectedSkills thay đổi
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedSkills));
  }, [selectedSkills, localStorageKey]);

  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      setSelectedSkills(JSON.parse(stored));
    } else {
      // save to localStorage
      setSelectedSkills(userSkills);
      localStorage.setItem(localStorageKey, JSON.stringify(userSkills));
    }
  }, [userSkills, localStorageKey]);

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

  const handleCheckboxChange = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
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

    const selectedSet = new Set(selectedSkills); // dùng selectedSkills hiện tại

    const selectedFirst = [
      ...filteredSkills.filter(skill => selectedSet.has(skill)),
      ...filteredSkills.filter(skill => !selectedSet.has(skill)),
    ];

    setDisplayedSkills(selectedFirst);
  };


  return (
    <div className="w-lg bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          placeholder="-- Add skills --"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleDropdownToggle}
          className="w-full p-2 border rounded-2xl bg-ss-light-777"
        />

        {openDropdown && (
          <div className="absolute z-10 mt-1 bg-ss-light-777 border rounded-2xl shadow max-h-40 overflow-auto w-full dropdown-scroll">
            {displayedSkills.map((skill) => (
              <label
                key={skill}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
              >
                <span>{skill}</span>
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleCheckboxChange(skill)}
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
            className="group flex items-center bg-gray-200 text-sm px-3 py-1 rounded-full hover:bg-ss-red-404 hover:text-ss-light-FFF"
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
