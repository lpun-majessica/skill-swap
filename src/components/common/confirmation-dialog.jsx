"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
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
        </span>
      );
    } else if (variant === "connected") {
      toast.success(
        <span>
          Connection with <strong>@{username}</strong> removed successfully.
        </span>
      );
    }
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-sm p-4 rounded-lg bg-white dark:bg-ss-black-444 border-none shadow-md">
        <DialogTitle className="sr-only">Confirmation Dialog</DialogTitle>
        <p className="text-sm text-center mb-4 text-ss-black-222 dark:text-ss-light-555">
          {dialogText} <span className="font-semibold">@{username}</span>?
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <DialogClose asChild>
            <Button className="w-24 h-10 rounded-4xl bg-ss-light-555 border-2 border-ss-light-222 text-ss-black-444 hover:bg-ss-light-222 dark:bg-ss-black-444 dark:hover:bg-ss-black-555 dark:border-ss-black-666 dark:text-ss-light-555">
              Back
            </Button>
          </DialogClose>
          <Button
            className="w-28 h-10 rounded-4xl bg-ss-red-505 text-ss-light-555 hover:bg-ss-red-404 active:bg-ss-red-404/70 dark:bg-ss-red-404 dark:hover:bg-ss-red-404/70 dark:active:bg-ss-red-404/50 dark:text-ss-light-222"
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
