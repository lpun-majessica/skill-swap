import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SkillBadge } from "../common/skill-badge";

import sortSkills from "@/utils/skills";
import { useCurrentUserContext } from "@/contexts/current-user-context";

export function SkillDisplay({ type, skills = [], demo = false }) {
  const containerWidth = 255;
  const paddingWidth = 5;
  const wordWidth = 10;
  let maxSkillDisplay = 0;

  const { currentUser } = useCurrentUserContext();
  const info = {
    teach: {
      header: "Teaching",
      currentUserSkills: demo ? [] : currentUser.skillsToTeach,
    },
    learn: {
      header: "Learning",
      currentUserSkills: demo ? [] : currentUser.skillsToLearn,
    },
  };

  const { header, currentUserSkills } = info[type];
  const { fullname } = currentUser;

  const sortedSkills = sortSkills(skills, currentUserSkills);

  sortedSkills.reduce((currentWidth, [skill]) => {
    let addedWidth = 0;
    if (
      currentWidth + paddingWidth + skill.length * wordWidth <=
      containerWidth
    ) {
      maxSkillDisplay += 1;
      addedWidth = paddingWidth + skill.length * wordWidth;
    }

    return currentWidth + addedWidth;
  }, 0);

  function displaySkill(cutOff) {
    return sortedSkills.slice(0, cutOff).map(([skill, isMatch]) => {
      return <SkillBadge key={skill} isMatch={isMatch} skill={skill} />;
    });
  }

  return (
    <>
      <p className="text-ss-black-131 dark:text-ss-light-555 mb-1 text-xs lg:text-sm">
        {header}
      </p>
      <Popover>
        <div className="flex h-6 flex-row gap-1">
          {displaySkill(maxSkillDisplay)}
          {skills.length > maxSkillDisplay && (
            <PopoverTrigger asChild className="ml-auto">
              <p
                variant="link"
                className="text-ss-black-444 dark:text-ss-light-555 justify-center p-1 text-xs font-bold decoration-1 hover:cursor-pointer hover:underline"
              >
                +{skills.length - maxSkillDisplay}
              </p>
            </PopoverTrigger>
          )}
        </div>

        <PopoverContent className="bg-ss-light-777 dark:bg-ss-black-131 w-70 lg:w-80">
          <p className="text-ss-black-444 dark:text-ss-light-555 mb-1 text-xs lg:text-sm">
            <span className="font-bold">{fullname}</span> is{" "}
            {header.toLowerCase()}
          </p>
          <div className="flex flex-row flex-wrap gap-1">
            {displaySkill(skills.length)}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
