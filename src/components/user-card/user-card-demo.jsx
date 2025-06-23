import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAvatar from "./avatar";
import { SkillDisplay } from "@/components/user-card/skill-display";

import { UserRoundPlus } from "lucide-react";
import { Button } from "../ui/button";

export default function UserCardDemo({
  pfp,
  fullname,
  username,
  skillsToTeach,
  skillsToLearn,
  job,
}) {
  const router = useRouter();
  const handleClick = () => router.push("/signin");

  return (
    <Card className="bg-ss-light-777 dark:bg-ss-black-131 relative w-3xs lg:w-2xs">
      <UserAvatar
        className="mx-auto -mt-1 size-16 lg:mt-0 lg:size-18"
        username={username}
        pfp={pfp}
      />

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
        <SkillDisplay type="teach" skills={skillsToTeach} demo={true} />
        <hr className="border-ss-light-333 dark:border-ss-black-444 mt-3 mb-1" />
        <SkillDisplay type="learn" skills={skillsToLearn} demo={true} />
      </CardContent>

      <CardFooter className="-mb-1 flex flex-row flex-wrap justify-center gap-2 lg:mb-0">
        {/* Giả lập nút Connect chỉ để trưng bày */}
        <Button
          className="bg-ss-red-505 text-ss-light-555 dark:bg-ss-red-404 dark:text-ss-light-222 flex h-8 w-24 flex-row items-center justify-center gap-2 rounded-4xl text-xs lg:h-10 lg:w-28 lg:text-sm"
          onClick={handleClick}
        >
          Connect <UserRoundPlus className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
