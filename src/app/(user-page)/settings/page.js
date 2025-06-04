import UserDetails from "@/components/profile/user-details";
import SkillSection from "@/components/profile/skill-section";
import AuthGuard from "@/components/auth/AuthGuard";

export default function SettingsPage() {
  return (
    <AuthGuard>
      <div className="mt-12 mb-10 flex flex-col justify-center gap-10 lg:flex-row">
        <UserDetails isEditable={true} />
        <div className="flex flex-col gap-6">
          <SkillSection title="Teach" skillKey="skillsToTeach" />
          <SkillSection title="Learn" skillKey="skillsToLearn" />
        </div>
      </div>
    </AuthGuard>
  );
}
