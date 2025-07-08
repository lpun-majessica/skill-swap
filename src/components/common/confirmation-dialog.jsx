"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "./buttons";

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
            <Button text="Back" variant="gray" onClick={onClose} />
          </DialogClose>

          <Button
            text={confirmButtonText}
            variant="red"
            onClick={handleConfirm}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
