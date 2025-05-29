"use client";

import { useParams } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context";
import SkillDetails from "@/components/profile/skill-details";
import UserDetails from "@/components/profile/user-details";
import AuthGuard from "@/components/auth/AuthGuard";
import { useDataContext } from "@/contexts/data-context";
import { useEffect } from "react";

export default function UserProfile() {
  const params = useParams();
  const userId = parseInt(params.id);
  const { getUserById } = useDataContext();
  const user = getUserById(userId);

  const { currentUser } = useAuthContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return <div className="mt-10 text-center text-red-600">User not found</div>;
  }

  return (
    <AuthGuard>
      <div className="bg-ss-light-FFF dark:bg-ss-black-121 mx-10 mt-12 mb-10 flex flex-wrap justify-center gap-10">
        {/* Left: user details */}
        <UserDetails currentUser={currentUser} user={user} isEditable={false} />

        {/* Right: skills */}
        <div className="flex flex-col items-center gap-6">
          <SkillDetails
            title="Skills to Teach"
            skills={user.skillsToTeach}
            currentUserSkills={currentUser?.skillsToLearn}
          />
          <SkillDetails
            title="Skills to Learn"
            skills={user.skillsToLearn}
            currentUserSkills={currentUser?.skillsToTeach}
          />
        </div>
      </div>
    </AuthGuard>
  );
}
