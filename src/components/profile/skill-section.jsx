"use client";

import "./profile.css";

import { useEffect, useState, useRef } from "react";
import { useCurrentUserContext } from "@/contexts/current-user-context";
import { useSkillContext } from "@/contexts/skill-context";

import { ChevronsUpDown, X } from "lucide-react";
import { SkillBadge } from "../common/skill-badge";

import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SkillSection = ({ title, skillKey }) => {
  const { currentUser, addSkill, removeSkill } = useCurrentUserContext();
  const [open, setOpen] = useState(false);

  const SKILLS = useSkillContext();
  const [displayedSkills, setDisplayedSkills] = useState(SKILLS);
  const [selectedSkills, setSelectedSkills] = useState([]);

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
  const updateDisplayedSkills = () => {
    const selectedSet = new Set(selectedSkills.map((skill) => skill.name));

    const selectedFirst = [
      ...SKILLS.filter((skill) => selectedSet.has(skill.name)),
      ...SKILLS.filter((skill) => !selectedSet.has(skill.name)),
    ];

    setDisplayedSkills(selectedFirst);
  };

  const handleOpenChange = () => {
    setOpen(!open);

    if (!open) {
      updateDisplayedSkills();
    }
  };

  return (
    <div className="dark:bg-ss-black-929 mx-auto -mb-2 w-87 max-w-lg rounded-2xl bg-white p-6 shadow-lg inset-shadow-2xs sm:w-sm md:w-md lg:mx-0">
      <h3 className="text-lg font-bold lg:text-xl">{title}</h3>

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="mt-2 w-75 justify-between rounded-xl sm:w-85 md:w-100"
          >
            Add skill
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-75 justify-between rounded-xl p-0 sm:w-85 md:w-100">
          <Command>
            <CommandInput placeholder="Search skill" className="h-9" />
            <CommandList>
              <CommandEmpty>No skill found.</CommandEmpty>
              <CommandGroup>
                {displayedSkills.map(({ id, name }) => (
                  <CommandItem key={id} value={name} className="mx-2 pl-2">
                    {name}
                    <Checkbox
                      className="ml-auto"
                      checked={selectedSkills.some(
                        (skill) => skill.name === name,
                      )}
                      onCheckedChange={(checked) => {
                        checked
                          ? handleAddSkill(id, name)
                          : handleRemoveSkill(id, name);
                      }}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

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
