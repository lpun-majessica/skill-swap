const sortSkills = (skills, currentUserSkills) => {
  const sortedSkills = skills
    .map(({ name }) => [name, currentUserSkills.includes(name)])
    .sort(([_skillA, isMatchSkillA], [_skillB, isMatchSkillB]) => {
      const matchA = isMatchSkillA ? 1 : 0;
      const matchB = isMatchSkillB ? 1 : 0;
      return matchA > matchB ? -1 : 1;
    });

  return sortedSkills;
};

export default sortSkills;
