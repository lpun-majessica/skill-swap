"use client";

import { Button as ButtonTemplate } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { ChevronUp } from "lucide-react";

const sharedClass = "text-xs lg:text-sm w-24 h-8 lg:w-28 lg:h-10 rounded-4xl";

export function Button({ text, handleClick, children }) {
	return (
		<ButtonTemplate
			className={`${sharedClass} bg-ss-red-505 text-ss-light-555 hover:bg-ss-red-404 active:bg-ss-red-404/70 hover:cursor-pointer dark:bg-ss-red-404 dark:hover:bg-ss-red-404/70 dark:active:bg-ss-red-404/50  dark:text-ss-light-222`}
			onClick={handleClick}
		>
			{text}
			{children}
		</ButtonTemplate>
	);
}

export function DropDownButton({ variant, username }) {
	const {
		buttonText,
		popoverOption,
		dialogText,
		dialogEndingMark,
		confirmButtonText,
	} = {
		pending: {
			buttonText: "Pending",
			popoverOption: "Cancel request",
			dialogText: "Cancel pending request with",
			dialogEndingMark: "?",
			confirmButtonText: "Cancel request",
		},
		connected: {
			buttonText: "Connected",
			popoverOption: "Remove connection",
			dialogText: "Remove connection with",
			dialogEndingMark: "?",
			confirmButtonText: "Remove",
		},
	}[variant];

	return (
		<Popover>
			<PopoverTrigger
				className={`${sharedClass} flex flex-row justify-center items-center gap-1 bg-ss-light-555 border-2 border-ss-light-222 text-ss-black-444 hover:bg-ss-light-222 hover:cursor-pointer dark:bg-ss-black-131 dark:hover:bg-ss-black-444 dark:border-ss-black-444 dark:text-ss-light-555`}
			>
				{buttonText} <ChevronUp className="size-4 rotate-180" />
			</PopoverTrigger>

			<PopoverContent className="p-2 size-fit bg-ss-light-777  dark:bg-ss-black-171">
				<ButtonTemplate className="w-35 p-2 rounded-sm text-xs lg:w-40 lg:text-sm bg-transparent text-ss-black-717 hover:cursor-pointer hover:bg-ss-red-ABA dark:hover:bg-ss-red-666/80 dark:text-ss-light-555">
					{popoverOption}
				</ButtonTemplate>
			</PopoverContent>
		</Popover>
	);
}
