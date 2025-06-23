import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

const UserAvatar = ({ className, username, pfp }) => {
  const imageUrl = pfp?.url ?? pfp;

  return (
    <Avatar className={`@container ${className}`}>
      <AvatarImage className="size-fit" src={imageUrl} alt={"@" + username} />
      <AvatarFallback className="bg-ss-light-333 dark:bg-ss-black-444">
        <UserRound className="text-ss-black-444 dark:text-ss-light-333 size-[60%]" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
