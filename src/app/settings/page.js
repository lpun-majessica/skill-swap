"use client"
import { useAuthContext } from "@/contexts/auth-context";
import UserDetails from '@/components/profile/UserDetails';
import SkillSection from '@/components/profile/SkillSection';

export default function SettingsPage() {
  const { currentUser } = useAuthContext();
  if (!currentUser) return <div className="flex justify-center my-30 items-center font-semibold text-2xl">Login to your account</div>;

  return (
    <div className="flex justify-center mt-28 mb-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <UserDetails isEditable={true}/>
        <div className="flex flex-col gap-6 ">
          {currentUser && (
            <>
              <SkillSection title="Teach" skillKey="skillsToTeach" userSkills={currentUser.skillsToTeach} />
              <SkillSection title="Learn" skillKey="skillsToLearn" userSkills={currentUser.skillsToLearn} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
