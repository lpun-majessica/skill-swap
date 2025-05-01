"use client";

import { useState } from "react";
import { Button as ButtonTemplate } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import ConfirmationDialog from "@/components/common/confirmation-dialog";

const sharedClass =
	"relative text-xs lg:text-sm w-24 h-8 lg:w-28 lg:h-10 rounded-4xl hover:cursor-pointer";
const redButton = `${sharedClass} bg-ss-red-505 text-ss-light-555 hover:bg-ss-red-404 active:bg-ss-red-404/70 dark:bg-ss-red-404 dark:hover:bg-ss-red-404/70 dark:active:bg-ss-red-404/50 dark:text-ss-light-222`;
const grayButton = `${sharedClass} flex flex-row justify-center items-center gap-1 bg-ss-light-555 border-2 border-ss-light-222 text-ss-black-444 hover:bg-ss-light-222 dark:bg-ss-black-131 dark:hover:bg-ss-black-444 dark:border-ss-black-444 dark:text-ss-light-555`;

export function Button({ text, handleClick, children, username }) {
	const className = text !== "Decline" ? redButton : grayButton;

	const showToast = () => {
		if (text === "Accept") {
			toast.success(
				<span>
					Request from <strong>@{username}</strong> accepted successfully!
				</span>
			);
		} else if (text === "Connect") {
			toast.success(
				<span>
					Connection request sent to <strong>@{username}</strong>!
				</span>
			);
		} else if (text === "Decline") {
			toast.message(
				<span>
					Declined request from <strong>@{username}</strong>
				</span>
			);
		}

		if (handleClick) handleClick();
	};

	return (
		<ButtonTemplate className={className} onClick={showToast}>
			{text}
			{children}
		</ButtonTemplate>
	);
}

export function PopUpButton({ variant, username }) {
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
		console.log(`${variant} action confirmed for @${username}`);
	};

	return (
		<>
			<ButtonTemplate className={grayButton} onClick={handleOpenDialog}>
				{buttonText} <ChevronDown className="size-4" />
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
