"use client";

import { useCurrentUserContext } from "@/contexts/current-user-context";
import { sortSkills } from "@/utils/skills";

import { SkillBadge } from "../common/skill-badge";

export default function SkillDetails({ type, skills }) {
  const { currentUser } = useCurrentUserContext();

  const info = {
    teach: {
      title: "Teaching",
      currentUserSkills: currentUser.skillsToTeach,
    },
    learn: {
      title: "Learning",
      currentUserSkills: currentUser.skillsToLearn,
    },
  };
  const { title, currentUserSkills } = info[type];

  const sortedSkills = sortSkills(skills, currentUserSkills);

  return (
    <div className="dark:bg-ss-black-929 mx-auto -mb-2 w-87 max-w-lg rounded-2xl bg-white p-6 shadow-lg inset-shadow-2xs sm:w-sm md:w-md lg:mx-0">
      <div>
        <h3 className="text-ss-black-717 dark:text-ss-light-FFF mb-2 font-semibold">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {sortedSkills.map(([skill, isMatch]) => {
            return <SkillBadge key={skill} isMatch={isMatch} skill={skill} />;
          })}
        </div>
      </div>
    </div>
  );
}
