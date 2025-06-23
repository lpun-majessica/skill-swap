const listSkill = (skills) => {
  return skills.map((skill) => skill.name);
};

const sortSkills = (skills, currentUserSkills) => {
  const skillsArray = skills.map((skill) => skill.name);
  const currentUserSkillsArray = currentUserSkills.map((skill) => skill.name);

  const sortedSkills = skillsArray
    .sort((skillA, skillB) => skillB.length - skillA.length)
    .map((skill) => [skill, currentUserSkillsArray.includes(skill)])
    .sort(([_skillA, isMatchSkillA], [_skillB, isMatchSkillB]) => {
      const matchA = isMatchSkillA ? 1 : 0;
      const matchB = isMatchSkillB ? 1 : 0;
      return matchA > matchB ? -1 : 1;
    });

  return sortedSkills;
};

export { sortSkills, listSkill };
