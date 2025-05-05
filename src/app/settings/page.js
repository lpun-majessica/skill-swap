"use client"
import { useAuthContext } from "@/contexts/auth-context";
import UserDetails from '@/components/profile/UserDetails';
import SkillSection from '@/components/profile/SkillSection';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsPage() {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser]);

  return (
    <div className="flex justify-center mt-12 mb-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <UserDetails currentUser={currentUser} isEditable={true}/>
        <div className="flex flex-col gap-6 ">
          {currentUser && (
            <>
              <SkillSection title="Teach" skillKey="skillsToTeach" />
              <SkillSection title="Learn" skillKey="skillsToLearn" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
