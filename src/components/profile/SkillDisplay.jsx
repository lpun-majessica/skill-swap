export default function SkillDisplay({ title, skills }) {
    return (
      <div className="w-lg bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="font-semibold mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-red-100 text-ss-red-505 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    );
  }
  