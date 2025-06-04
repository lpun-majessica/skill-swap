import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const userFallbackName = (fullname) =>
  fullname
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

const UserAvatar = ({ className, fullname, username, pfp }) => {
  const fallbackName = userFallbackName(fullname);

  return (
    <Avatar className={`@container ${className}`}>
      <AvatarImage className="size-fit" src={pfp} alt={"@" + username} />
      <AvatarFallback className="bg-ss-light-333 dark:bg-ss-black-444 text-base @min-[96px]:text-3xl @min-[160px]:text-4xl">
        {fallbackName}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
