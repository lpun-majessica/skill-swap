'use client';

import { useParams } from 'next/navigation';
import { useAuthContext } from "@/contexts/auth-context";
import SkillDetails from '@/components/profile/SkillDetails';
import UserDetails from '@/components/profile/UserDetails';
import { useDataContext } from '@/contexts/data-context';


export default function UserProfile() {
  const params = useParams();
  const userId = parseInt(params.id);
  const { getUserById } = useDataContext();
  const user = getUserById(userId);


  const { currentUser } = useAuthContext();

  if (!user) {
    return <div className="text-center mt-10 text-red-600">User not found</div>;
  }

  return (
    <div className="flex justify-center gap-10 mt-12 mx-10 flex-wrap bg-ss-light-FFF dark:bg-ss-black-121 mb-10">
      {/* Left: user details */}
      <UserDetails user={user} isEditable={false} />

      {/* Right: skills */}
      <div className="flex flex-col gap-6 items-center">
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
  );
}
