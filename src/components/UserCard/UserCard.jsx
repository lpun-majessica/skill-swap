"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, PopUpButton } from "@/components/common/Buttons";
import { SkillDisplay } from "./SkillDisplay";
import { UserRoundPlus } from "lucide-react";
import { useTheme } from "next-themes";

export default function UserCard({
  id,
  fullname,
  username,
  teach,
  learn,
  bio,
}) {
  const fallbackName = fullname
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

  return (
    <>
      <Card className="w-3xs lg:w-2xs bg-ss-light-777 dark:bg-ss-black-131">
        <Avatar className="-mt-1 lg:mt-0 size-16 lg:size-20 mx-auto">
          <AvatarImage
            className="size-fit"
            src={`pfp/${id}.jpeg`}
            alt={"@" + username}
          />
          <AvatarFallback className="bg-ss-light-333 dark:bg-ss-black-444">
            {fallbackName}
          </AvatarFallback>
        </Avatar>

        <CardHeader>
          <CardTitle className="text-center -mt-3 -mb-1 text-lg lg:text-xl font-bold text-ss-black-222 dark:text-ss-light-555">
            {fullname}
          </CardTitle>
          <CardDescription className="w-[95cqw] m-auto">
            <p className="truncate text-center text-xs text-ss-black-929 dark:text-ss-light-222">
              {shortenBio(bio)}
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="-mt-2 -mb-1">
          <SkillDisplay fullname={fullname} header="Teaching" skills={teach} />
          <hr className="mt-3 mb-1 border-ss-light-333 dark:border-ss-black-444" />
          <SkillDisplay fullname={fullname} header="Learning" skills={learn} />
        </CardContent>

        <CardFooter className="flex flex-row mt-1 -mb-1 lg:mt-2 lg:mb-0 flex-wrap justify-center gap-2">
          <PopUpButton variant="pending" username={username} />
          <PopUpButton variant="connected" username={username} />
          <Button text="Accept" username={username} />
          <Button text="Connect" username={username}>
            <UserRoundPlus />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

function shortenBio(bio, maxLength = 50) {
  return bio.length <= maxLength ? bio : bio.slice(0, maxLength) + "...";
}
