"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import userService from "@/services/user";

import SkillDetails from "@/components/profile/skill-details";
import UserDetails from "@/components/profile/user-details";
import UserPageLoading from "../../loading";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userService.getUser(id);
      setUser(userData);
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <UserPageLoading />;
  }

  if (!user) {
    return <div className="mt-10 text-center text-red-600">User not found</div>;
  }

  return (
    <>
      {/* Left: user details */}
      <UserDetails user={user} isEditable={false} />

      {/* Right: skills */}
      <div className="flex flex-col items-center gap-6">
        <SkillDetails type="teach" skills={user.skillsToTeach} />
        <SkillDetails type="learn" skills={user.skillsToLearn} />
      </div>
    </>
  );
}
