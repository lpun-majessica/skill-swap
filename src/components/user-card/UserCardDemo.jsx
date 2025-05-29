import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillDisplay } from "@/components/user-card/skill-display";

import { UserRoundPlus } from "lucide-react";

export function UserCardDemo({
  id,
  fullname,
  username,
  skillsToTeach,
  skillsToLearn,
  job,
}) {
  const fallbackName = fullname
    .split(" ")
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <Card className="bg-ss-light-777 dark:bg-ss-black-131 relative w-3xs lg:w-2xs">
      <Avatar className="mx-auto -mt-1 size-16 lg:mt-0 lg:size-18">
        <AvatarImage src={`pfp/${id}.jpeg`} alt={"@" + username} />
        <AvatarFallback className="bg-ss-light-333 dark:bg-ss-black-444">
          {fallbackName}
        </AvatarFallback>
      </Avatar>

      <CardHeader>
        <CardTitle className="text-ss-black-222 dark:text-ss-light-555 -mt-3 -mb-1 text-center text-lg font-bold lg:text-xl">
          {fullname}
        </CardTitle>
        <CardDescription className="m-auto w-[95cqw]">
          <p className="text-ss-black-929 dark:text-ss-light-222 truncate text-center text-xs">
            {job}
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent className="relative -mt-2 -mb-1">
        <SkillDisplay
          fullname={fullname}
          header="Teaching"
          skills={skillsToTeach}
          currentUserSkills={[]} // Không so sánh
        />
        <hr className="border-ss-light-333 dark:border-ss-black-444 mt-3 mb-1" />
        <SkillDisplay
          fullname={fullname}
          header="Learning"
          skills={skillsToLearn}
          currentUserSkills={[]} // Không so sánh
        />
      </CardContent>

      <CardFooter className="-mb-1 flex flex-row flex-wrap justify-center gap-2 lg:mb-0">
        {/* Giả lập nút Connect chỉ để trưng bày */}
        <button className="bg-ss-red-505 text-ss-light-555 dark:bg-ss-red-404 dark:text-ss-light-222 flex h-8 w-24 flex-row items-center justify-center gap-2 rounded-4xl text-xs lg:h-10 lg:w-28 lg:text-sm">
          Connect <UserRoundPlus className="size-4" />
        </button>
      </CardFooter>
    </Card>
  );
}
