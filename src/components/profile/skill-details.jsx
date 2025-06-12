import { useCurrentUserContext } from "@/contexts/current-user-context";
import sortSkills from "@/utils/skills";

import { SkillBadge } from "../common/skill-badge";

export default function SkillDetails({ type, skills }) {
  const { currentUser } = useCurrentUserContext();

  const info = {
    teach: {
      title: "Skills to Teach",
      currentUserSkills: currentUser.skillsToTeach,
    },
    learn: {
      title: "Skills to Learn",
      currentUserSkills: currentUser.skillsToLearn,
    },
  };
  const { title, currentUserSkills } = info[type];

  const sortedSkills = sortSkills(skills, currentUserSkills);

  return (
    <div className="dark:bg-ss-black-929 mx-2 w-sm max-w-lg rounded-2xl bg-white p-6 shadow-lg inset-shadow-2xs sm:mx-auto sm:w-md md:w-md lg:w-md dark:shadow-none">
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
