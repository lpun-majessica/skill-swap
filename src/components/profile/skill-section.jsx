"use client";

import "./profile.css";

import { useEffect, useState } from "react";
import { useCurrentUserContext } from "@/contexts/current-user-context";
import { useSkillContext } from "@/contexts/skill-context";
import { useMediaQuery } from "@/hooks";

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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const Wrapper = ({ open, handleOpenChange, description, children }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const modal = true;

  if (isDesktop) {
    return (
      <Popover modal={modal} open={open} onOpenChange={handleOpenChange}>
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

        <PopoverContent className="w-75 justify-between rounded-2xl p-0 sm:w-85 md:w-100">
          {children}
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Drawer autoFocus={open} open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="mt-2 w-69 justify-between rounded-xl sm:w-85 md:w-100"
        >
          Add skill
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-ss-black-717 mx-auto w-full max-w-sm justify-between rounded-2xl">
        <DrawerTitle className="mx-auto pt-4 pb-1">Add skill</DrawerTitle>
        <DrawerDescription className="w-full border-b pb-2 text-center">
          {description}
        </DrawerDescription>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

const SkillSection = ({ type }) => {
  const { currentUser, addSkill, removeSkill } = useCurrentUserContext();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const SKILLS = useSkillContext();
  const [displayedSkills, setDisplayedSkills] = useState(SKILLS);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const info = {
    teach: {
      title: "Teaching",
      skillKey: "skillsToTeach",
      description: "Select skill you want to teach",
    },
    learn: {
      title: "Learning",
      skillKey: "skillsToLearn",
      description: "Select skill you want to learn",
    },
  };
  const { title, skillKey, description } = info[type];
  const groupTitle = `${title}${errorMessage ? " - " + errorMessage : ""}`;

  useEffect(() => {
    if (currentUser && currentUser[skillKey]) {
      setSelectedSkills(currentUser[skillKey]);
    }
  }, [currentUser, skillKey]);

  const handleAddSkill = (skillId, skillName) => {
    const newSkills = [...selectedSkills, { id: skillId, name: skillName }];
    setSelectedSkills(newSkills);
    if (errorMessage) setErrorMessage(null);

    addSkill(skillKey, { skillId });
  };

  const handleRemoveSkill = (skillId, skillName) => {
    if (selectedSkills.length === 1) {
      setErrorMessage("Please select at least 1 skill");
      return;
    }

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
    if (open && selectedSkills.length === 0) {
      return;
    }
    setOpen(!open);

    if (!open) {
      updateDisplayedSkills();
    }
  };

  return (
    <div className="dark:bg-ss-black-929 mx-auto -mb-2 w-80 max-w-lg rounded-2xl bg-white p-6 shadow-lg inset-shadow-2xs sm:w-sm md:w-md lg:mx-0">
      <h3 className="text-base font-bold lg:text-lg">{title}</h3>

      <Wrapper
        open={open}
        handleOpenChange={handleOpenChange}
        description={description}
      >
        <Command>
          <CommandInput placeholder="Search skill" className="h-9" />
          <CommandList>
            <CommandEmpty>No skill found.</CommandEmpty>
            <CommandGroup
              heading={groupTitle}
              className={
                errorMessage &&
                "[&_[cmdk-group-heading]]:text-ss-red-404 [&_[cmdk-group-heading]]:dark:text-ss-red-505"
              }
            >
              {displayedSkills.map(({ id, name }) => (
                <CommandItem key={id} value={name} className="mx-2 pl-2">
                  <Checkbox
                    className="mr-2"
                    checked={selectedSkills.some(
                      (skill) => skill.name === name,
                    )}
                    onCheckedChange={(checked) => {
                      checked
                        ? handleAddSkill(id, name)
                        : handleRemoveSkill(id, name);
                    }}
                  />
                  <SkillBadge skill={name} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </Wrapper>

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
