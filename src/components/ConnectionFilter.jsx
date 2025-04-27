"use client";

import { useState } from "react";
import { Button } from "./ui/button";

const filterText = ["All", "My connections", "Pending", "Request"];

export function ConnectionFilter() {
	const [activeButton, setActiveButton] = useState(0);

	return (
		<div className="flex flex-row gap-2 mb-5">
			{filterText.map((text, index) => (
				<ConnectionFilterButton
					key={index}
					text={text}
					active={activeButton === index}
					handleClick={() => setActiveButton(index)}
				/>
			))}
		</div>
	);
}

function ConnectionFilterButton({ text, active, handleClick }) {
	const options = active
		? "bg-ss-red-505 hover:bg-ss-red-404 dark:bg-ss-red-404 dark:hover:bg-ss-red-404/60 text-ss-light-555"
		: "bg-ss-light-222 hover:bg-ss-light-333 dark:bg-ss-black-444 dark:hover:bg-ss-black-131";
	return (
		<Button
			className={`text-sm lg:text-base w-35 h-8 lg:w-38 lg:h-10 rounded-4xl hover:cursor-pointer text-ss-black-121 dark:text-ss-light-555 ${options}`}
			onClick={handleClick}
		>
			{text}
		</Button>
	);
}
