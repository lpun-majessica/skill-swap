import UserDetails from "@/components/profile/user-details";
import SkillSection from "@/components/profile/skill-section";
import AuthGuard from "@/components/auth/auth-guard";

export default function SettingsPage() {
  return (
    <AuthGuard>
      <UserDetails isEditable={true} />
      <div className="flex flex-col gap-6">
        <SkillSection type="teach" />
        <SkillSection type="learn" />
      </div>
    </AuthGuard>
  );
}
