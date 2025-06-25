"use client";

import { useSkillContext } from "@/contexts/skill-context";

import { Checkbox } from "@/components/ui/checkbox";
import {
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { SkillBadge } from "../common/skill-badge";

const SkillGroup = ({ selectedSkills, setSelectedSkills }) => {
  const SKILLS = useSkillContext();

  const sortedSkills = SKILLS.sort((skillA, skillB) => {
    const isSelectedA = selectedSkills.includes(skillA.name) ? 1 : 0;
    const isSelectedB = selectedSkills.includes(skillB.name) ? 1 : 0;

    return isSelectedB - isSelectedA;
  });

  const handleCheckboxChange = (checked, skill) => {
    const updatedSkills = checked
      ? selectedSkills.concat(skill)
      : selectedSkills.filter((s) => s !== skill);

    setSelectedSkills(updatedSkills);
  };

  return (
    <CommandList className="min-h-[395px]">
      <CommandEmpty>No skill found.</CommandEmpty>
      {sortedSkills.map(({ id, name }) => (
        <CommandItem
          key={id}
          value={name}
          className="dark:hover:!bg-ss-black-444/50 mx-2 pl-2 transition-colors duration-300 ease-in-out"
        >
          <Checkbox
            className="border-ss-black-29D mr-2 border-1"
            checked={selectedSkills.includes(name)}
            onCheckedChange={(checked) => handleCheckboxChange(checked, name)}
          />
          <SkillBadge skill={name} />
        </CommandItem>
      ))}
    </CommandList>
  );
};

export default SkillGroup;
