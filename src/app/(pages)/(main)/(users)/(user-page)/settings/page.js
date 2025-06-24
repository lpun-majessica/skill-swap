import UserDetails from "@/components/profile/user-details";
import SkillSection from "@/components/profile/skill-section";
import AuthGuard from "@/components/auth/auth-guard";

export default function SettingsPage() {
  return (
    <AuthGuard>
      <div className="my-5 flex flex-col justify-center gap-10 lg:mt-12 lg:flex-row">
        <UserDetails isEditable={true} />
        <div className="flex flex-col gap-6">
          <SkillSection type="teach" />
          <SkillSection type="learn" />
        </div>
      </div>
    </AuthGuard>
  );
}
