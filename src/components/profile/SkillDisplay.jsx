export default function SkillDisplay({ title, skills }) {
    return (
      <div className="mx-2 sm:mx-auto w-sm sm:w-md max-w-lg md:w-md lg:w-md bg-white  dark:bg-ss-black-929 p-6 rounded-2xl shadow-lg inset-shadow-2xs  dark:shadow-none">
        <div>
        <h3 className="font-semibold mb-2 text-ss-black-717 dark:text-ss-light-FFF">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-red-100 dark:bg-ss-red-ABA text-ss-red-505 dark:text-ss-red-404 px-3 py-1 rounded-full text-sm font-normal"
            >
              {skill}
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  }
  