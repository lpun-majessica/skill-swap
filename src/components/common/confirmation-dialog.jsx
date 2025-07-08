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
      <DialogContent className="dark:bg-ss-black-131 w-sm rounded-lg border-none bg-white p-5 shadow-md">
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
            <Button className="border-ss-black-444 text-ss-black-444 hover:bg-ss-black-171 hover:text-ss-light-777 dark:border-ss-light-333 dark:text-ss-light-333 hover:dark:bg-ss-light-333 hover:dark:text-ss-black-131 h-8 w-30 rounded-4xl border bg-transparent px-6 font-semibold transition-colors duration-150 lg:h-9">
              Back
            </Button>
          </DialogClose>
          <Button
            className="bg-ss-red-505 text-ss-light-555 hover:bg-ss-red-404 active:bg-ss-red-404/70 dark:bg-ss-red-404 dark:hover:bg-ss-red-404/70 dark:active:bg-ss-red-404/50 dark:text-ss-light-222 h-8 w-30 rounded-4xl lg:h-9"
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
