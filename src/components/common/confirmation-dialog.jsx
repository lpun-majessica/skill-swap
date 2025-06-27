"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ConfirmationDialog({
  isOpen,
  onClose,
  dialogText,
  username,
  confirmButtonText,
  onConfirm,
  variant,
}) {
  const handleConfirm = () => {
    if (variant === "pending") {
      toast.success(
        <span>
          Pending request to <strong>@{username}</strong> cancelled.
        </span>,
      );
    } else if (variant === "connected") {
      toast.success(
        <span>
          Connection with <strong>@{username}</strong> removed successfully.
        </span>,
      );
    }
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-ss-black-444 w-sm rounded-lg border-none bg-white p-5 shadow-md">
        <DialogTitle className="sr-only">Confirmation Dialog</DialogTitle>
        <DialogDescription className="text-ss-black-222 dark:text-ss-light-555 mb-2 text-center text-sm">
          {dialogText}
          {username && (
            <span>
              {" "}
              <span className="font-semibold">@{username}</span>?
            </span>
          )}
        </DialogDescription>
        <div className="flex justify-center gap-4">
          <DialogClose asChild>
            <Button className="bg-ss-light-555 border-ss-light-222 text-ss-black-444 hover:bg-ss-light-222 dark:bg-ss-black-444 dark:hover:bg-ss-black-555 dark:border-ss-black-666 dark:text-ss-light-555 h-10 w-24 rounded-4xl border-2">
              Back
            </Button>
          </DialogClose>
          <Button
            className="bg-ss-red-505 text-ss-light-555 hover:bg-ss-red-404 active:bg-ss-red-404/70 dark:bg-ss-red-404 dark:hover:bg-ss-red-404/70 dark:active:bg-ss-red-404/50 dark:text-ss-light-222 h-10 w-28 rounded-4xl"
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
