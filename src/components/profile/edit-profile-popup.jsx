"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditProfileForm from "./edit-profile-form";
import { useCurrentUserContext } from "@/contexts/current-user-context";
import LoadingIcon from "../common/loading-icon";

const EditProfilePopup = () => {
  const { data } = useSession();
  const { isLoading } = useCurrentUserContext();

  const [open, setOpen] = useState(false);
  const handleOpenChange = () => setOpen(!open);

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="border-ss-black-131 text-ss-black-131 hover:bg-ss-black-131 hover:text-ss-light-777 dark:border-ss-light-333 dark:text-ss-light-333 hover:dark:bg-ss-light-333 hover:dark:text-ss-black-131 h-8 w-fit rounded-4xl border bg-transparent px-6 text-xs font-semibold transition-colors duration-150 hover:cursor-pointer min-[1280px]:h-9 min-[1545px]:h-10 lg:text-[13px] xl:text-sm"
          type="button"
        >
          Edit profile
        </Button>
      </DialogTrigger>

      <DialogContent className="dark:bg-ss-black-929 w-84 rounded-2xl bg-white p-6 shadow-lg sm:w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit profile</DialogTitle>

          <DialogDescription className="mb-3 text-sm">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex h-[55vh] w-full items-center justify-center">
            <LoadingIcon />
          </div>
        ) : (
          <EditProfileForm setDialogOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfilePopup;
