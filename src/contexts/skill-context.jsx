"use client";

import { createContext, useState, useEffect, useContext } from "react";

import skillService from "@/services/skill";

const SkillContext = createContext();

export function SkillProvider({ children }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkillData = async () => {
      const SKILLS = await skillService.getSkillList();
      setSkills(SKILLS);
    };

    fetchSkillData();
  }, []);

  return (
    <SkillContext.Provider value={skills}>{children}</SkillContext.Provider>
  );
}

export function useSkillContext() {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error("useSkillContext must be used within a SkillProvider");
  }
  return context;
}
