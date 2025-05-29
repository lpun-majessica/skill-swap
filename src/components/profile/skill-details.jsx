export default function SkillDetails({ title, skills, currentUserSkills = [] }) {
  // Sắp xếp skills: match lên trước
  const sortedSkills = [...skills].sort((a, b) => {
    const aMatch = currentUserSkills.includes(a);
    const bMatch = currentUserSkills.includes(b);
    return aMatch === bMatch ? 0 : aMatch ? -1 : 1;
  });

  return (
    <div className="mx-2 sm:mx-auto w-sm sm:w-md max-w-lg md:w-md lg:w-md bg-white dark:bg-ss-black-929 p-6 rounded-2xl shadow-lg inset-shadow-2xs dark:shadow-none">
      <div>
        <h3 className="font-semibold mb-2 text-ss-black-717 dark:text-ss-light-FFF">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {sortedSkills.map((skill) => {
            const isMatch = currentUserSkills.includes(skill);
            return (
              <div
                key={skill}
                className={`px-3 py-1 rounded-full text-sm font-normal ${
                  isMatch
                    ? 'border border-ss-red-444 bg-red-100 dark:bg-ss-red-ABA text-ss-red-505 dark:text-ss-red-404'
                    : 'bg-gray-200  dark:bg-ss-black-444 text-ss-black-121 dark:text-ss-light-FFF '
                }`}
              >
                {skill}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
