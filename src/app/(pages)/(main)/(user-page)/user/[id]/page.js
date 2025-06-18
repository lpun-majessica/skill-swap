"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useUserContext } from "@/contexts/users-context";

import SkillDetails from "@/components/profile/skill-details";
import UserDetails from "@/components/profile/user-details";

export default function UserProfile() {
  const { id } = useParams();
  const { getUser } = useUserContext();
  const user = getUser(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return <div className="mt-10 text-center text-red-600">User not found</div>;
  }

  return (
    <div className="bg-ss-light-FFF dark:bg-ss-black-121 mx-10 mt-12 mb-10 flex flex-wrap justify-center gap-10">
      {/* Left: user details */}
      <UserDetails user={user} isEditable={false} />

      {/* Right: skills */}
      <div className="flex flex-col items-center gap-6">
        <SkillDetails type="teach" skills={user.skillsToTeach} />
        <SkillDetails type="learn" skills={user.skillsToLearn} />
      </div>
    </div>
  );
}
