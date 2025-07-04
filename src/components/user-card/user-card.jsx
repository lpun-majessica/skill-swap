"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkillDisplay } from "./skill-display";
import Link from "next/link";

import { ArrowRightLeft } from "lucide-react";
import { ConnectionsButtons } from "./connection-buttons";
import UserAvatar from "./avatar";

import { useConnectionContext } from "@/contexts/connection-context";
import { useUserContext } from "@/contexts/users-context";

export default function UserCard({
  id,
  fullname,
  username,
  skillsToTeach,
  skillsToLearn,
  job,
  pfp,
}) {
  const { isPotentialMatch } = useUserContext();
  const { findConnectionWith } = useConnectionContext();
  const connection = findConnectionWith(id);

  const isMatch = isPotentialMatch(skillsToTeach, skillsToLearn);

  return (
    <>
      <Card
        className={`bg-ss-light-777 dark:bg-ss-black-131 relative w-3xs min-[800px]:w-64 min-[1280px]:w-67 min-[1545px]:w-2xs ${isMatch ? "dark:ring-ss-red-666 shadow-[0_0px_6px_rgba(218,_5,_5,_0.3)] ring-1 ring-[#FF9595] dark:shadow-none" : "shadow-lg inset-shadow-2xs"}`}
      >
        <Link href={`/user/${id}`} className="absolute inset-0" />
        <ArrowRightLeft
          strokeWidth={2}
          size={22}
          className={`text-ss-red-666 border-ss-red-666 absolute -mt-1 ml-5 rounded-full border-2 p-0.5 ${isMatch ? "visible" : "invisible"}`}
        />
        <UserAvatar
          className="mx-auto -mt-1 size-16 lg:mt-0 lg:size-18"
          username={username}
          pfp={pfp}
        />

        <CardHeader>
          <CardTitle className="text-ss-black-222 dark:text-ss-light-555 -mt-3 -mb-1 h-6 truncate text-center text-lg font-bold lg:h-7 lg:text-xl">
            {fullname}
          </CardTitle>
          <CardDescription className="m-auto w-[95cqw]">
            <p className="text-ss-black-929 dark:text-ss-light-222 h-4 truncate text-center text-xs">
              {job}
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="relative -mt-2 -mb-1">
          <SkillDisplay
            type="teach"
            skills={skillsToTeach}
            fullname={fullname}
          />
          <hr className="border-ss-light-333 dark:border-ss-black-444 mt-3 mb-1" />
          <SkillDisplay
            type="learn"
            skills={skillsToLearn}
            fullname={fullname}
          />
        </CardContent>

        <CardFooter className="-mb-1 flex flex-row flex-wrap justify-center gap-2 lg:mb-0">
          <ConnectionsButtons
            connection={connection}
            targetUserId={id}
            targetUsername={username}
          />
        </CardFooter>
      </Card>
    </>
  );
}
