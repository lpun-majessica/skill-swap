import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, EllipsisVertical, Trash2 } from "lucide-react";

const NotificationOptions = ({ handleRead, handleDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="hover:dark:bg-ss-black-444/80 -mx-2"
        >
          <EllipsisVertical className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="bg-ss-black-929 w-xs"
      >
        <DropdownMenuItem
          onClick={handleRead}
          className="h-9 cursor-pointer text-sm lg:text-base"
        >
          <CircleCheckBig className="size-5" />
          Mark as read
        </DropdownMenuItem>

        <DropdownMenuSeparator className="border-1" />

        <DropdownMenuItem
          onClick={handleDelete}
          className="h-9 cursor-pointer text-sm lg:text-base"
        >
          <Trash2 className="size-5" />
          Delete this notification
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationOptions;
