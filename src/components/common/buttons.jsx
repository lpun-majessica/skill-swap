"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { toast } from "sonner";

import { Button as ButtonTemplate } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ConfirmationDialog from "@/components/common/confirmation-dialog";

const sharedClass =
  "relative text-xs lg:text-[13px] xl:text-sm w-22 h-8 min-[800px]:w-24 lg:h-9 min-[1545px]:w-26 rounded-4xl hover:cursor-pointer";
const redButton = `${sharedClass} bg-ss-red-505 text-ss-light-555 hover:bg-ss-red-404 active:bg-ss-red-404/70 dark:bg-ss-red-404 dark:hover:bg-ss-red-404/70 dark:active:bg-ss-red-404/50 dark:text-ss-light-222`;
const grayButton = `${sharedClass} border-ss-black-444 text-ss-black-444 hover:bg-ss-black-171 hover:text-ss-light-777 dark:border-ss-light-333 dark:text-ss-light-333 hover:dark:bg-ss-light-333 hover:dark:text-ss-black-131 w-fit rounded-full border bg-transparent px-6 font-semibold transition-colors duration-150 flex flex-row justify-center items-center gap-1`;

export function Button({ text, onClick, children, username }) {
  const router = useRouter();
  const { data } = useSession();

  const className = text !== "Decline" ? redButton : grayButton;

  const handleClick = () => {
    if (!data) {
      router.push("/signin");
      return;
    }

    if (text === "Accept") {
      toast.success(
        <span>
          Request from <strong>@{username}</strong> accepted successfully!
        </span>,
      );
    } else if (text === "Connect") {
      toast.success(
        <span>
          Connection request sent to <strong>@{username}</strong>!
        </span>,
      );
    } else if (text === "Decline") {
      toast.message(
        <span>
          Declined request from <strong>@{username}</strong>
        </span>,
      );
    }

    if (onClick) onClick();
  };

  return (
    <ButtonTemplate className={className} onClick={handleClick}>
      {text}
      {children}
    </ButtonTemplate>
  );
}

export function PopUpButton({ variant, username, onClick }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const buttonConfig = {
    pending: {
      buttonText: "Pending",
      dialogText: "Cancel pending request with",
      confirmButtonText: "Cancel request",
    },
    connected: {
      buttonText: "Connected",
      dialogText: "Remove connection with",
      confirmButtonText: "Remove",
    },
  };

  const { buttonText, dialogText, confirmButtonText } = buttonConfig[variant];

  const handleOpenDialog = (e) => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    onClick();
  };

  return (
    <>
      <ButtonTemplate className={grayButton} onClick={handleOpenDialog}>
        {buttonText} <ChevronDown className="size-3 lg:size-4" />
      </ButtonTemplate>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        dialogText={dialogText}
        username={username}
        confirmButtonText={confirmButtonText}
        variant={variant}
        onConfirm={handleConfirm}
      />
    </>
  );
}
