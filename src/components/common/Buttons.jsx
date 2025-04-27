"use client";

import { Button as ButtonTemplate } from "@/components/ui/button";

import { ChevronUp } from "lucide-react";

const sharedClass =
	"text-xs lg:text-sm w-24 h-8 lg:w-28 lg:h-10 rounded-4xl hover:cursor-pointer";

export function Button({ text, handleClick, children }) {
	return (
		<ButtonTemplate
			className={`${sharedClass} bg-ss-red-505 text-ss-light-555 hover:bg-ss-red-404 active:bg-ss-red-404/70 dark:bg-ss-red-404 dark:hover:bg-ss-red-404/70 dark:active:bg-ss-red-404/50  dark:text-ss-light-222`}
			onClick={handleClick}
		>
			{text}
			{children}
		</ButtonTemplate>
	);
}

export function PopUpButton({ variant, username }) {
	const { buttonText, dialogText, dialogEndingMark, confirmButtonText } = {
		pending: {
			buttonText: "Pending",
			dialogText: "Cancel pending request with",
			dialogEndingMark: "?",
			confirmButtonText: "Cancel request",
		},
		connected: {
			buttonText: "Connected",
			dialogText: "Remove connection with",
			dialogEndingMark: "?",
			confirmButtonText: "Remove",
		},
	}[variant];

	return (
		<ButtonTemplate
			className={`${sharedClass} flex flex-row justify-center items-center gap-1 bg-ss-light-555 border-2 border-ss-light-222 text-ss-black-444 hover:bg-ss-light-222 dark:bg-ss-black-131 dark:hover:bg-ss-black-444 dark:border-ss-black-444 dark:text-ss-light-555`}
		>
			{buttonText} <ChevronUp className="size-4 rotate-180" />
		</ButtonTemplate>
	);
}
