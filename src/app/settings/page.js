"use client";
import { useAuthContext } from "@/contexts/auth-context";
import UserDetails from "@/components/profile/user-details";
import SkillSection from "@/components/profile/skill-section";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsPage() {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-12 mb-10 flex justify-center">
      <div className="flex flex-col gap-10 lg:flex-row">
        <UserDetails currentUser={currentUser} isEditable={true} />
        <div className="flex flex-col gap-6">
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
