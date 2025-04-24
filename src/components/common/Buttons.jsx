"use client";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { ChevronUp, UserRoundPlus, X } from "lucide-react";

const sharedClass = "text-xs lg:text-sm w-24 h-8 lg:w-28 lg:h-10 rounded-4xl";

export function ConnectButton() {
	return (
		<Button
			className={`${sharedClass} bg-red-600 text-stone-100 hover:bg-red-700/80 hover:cursor-pointer dark:bg-red-700 dark:hover:bg-red-800/90 dark:text-stone-200`}
			onClick={() => {}}
		>
			Connect <UserRoundPlus />
		</Button>
	);
}

export function AcceptButton() {
	return (
		<Button
			className={`${sharedClass} bg-red-600 text-stone-100 hover:bg-red-700/80 hover:cursor-pointer dark:bg-red-700 dark:hover:bg-red-800/90 dark:text-stone-200`}
		>
			Accept
		</Button>
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
				className={`${sharedClass} flex flex-row justify-center items-center gap-1 bg-stone-200/90 border-2 border-stone-300 text-stone-700 hover:bg-stone-300/80 hover:cursor-pointer dark:bg-stone-700/90 dark:hover:bg-stone-600/80 dark:border-stone-600/70 dark:text-stone-200`}
			>
				{buttonText} <ChevronUp className="size-4 rotate-180" />
			</PopoverTrigger>

			<PopoverContent className="p-2 size-fit bg-stone-100  dark:bg-stone-600">
				<Button className="w-35 p-2 rounded-sm text-xs lg:w-40 lg:text-sm bg-transparent text-stone-700 hover:cursor-pointer hover:bg-red-200 dark:hover:bg-red-400/70 dark:text-stone-200">
					{popoverOption}
				</Button>
			</PopoverContent>
		</Popover>
	);
}
