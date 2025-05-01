"use client";

// Demo purpose
const currentUser = {
	id: 1,
	fullname: "Alex Johnson",
	username: "alexj",
	teach: ["JavaScript", "HTML", "CSS"],
	learn: ["UI/UX Design", "React"],
	bio: "Frontend developer who loves clean code.",
	dob: "1994-06-15",
};

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button, PopUpButton } from "@/components/common/Buttons";
import { SkillDisplay } from "./SkillDisplay";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";

import { useDataContext } from "@/contexts/data-context";

export default function UserCard({
	id,
	fullname,
	username,
	teach,
	learn,
	bio,
}) {
	const connection = useDataContext().connections.filter(
		(conn) =>
			(conn.sender_id === id && conn.receiver_id === currentUser.id) ||
			(conn.sender_id === currentUser.id && conn.receiver_id === id)
	);

	const fallbackName = fullname
		.split(" ")
		.map((word) => word[0].toUpperCase())
		.join("");

	return (
		<>
			<Card className="relative w-3xs lg:w-2xs bg-ss-light-777 dark:bg-ss-black-131">
				<Link href={`/user/${id}`} className="absolute inset-0" />
				<Avatar className="-mt-1 lg:mt-0 size-16 lg:size-18 mx-auto">
					<AvatarImage
						className="size-fit"
						src={`pfp/${id}.jpeg`}
						alt={"@" + username}
					/>
					<AvatarFallback className="bg-ss-light-333 dark:bg-ss-black-444">
						{fallbackName}
					</AvatarFallback>
				</Avatar>

				<CardHeader>
					<CardTitle className="text-center -mt-3 -mb-1 text-lg lg:text-xl font-bold text-ss-black-222 dark:text-ss-light-555">
						{fullname}
					</CardTitle>
					<CardDescription className="w-[95cqw] m-auto">
						<p className="truncate text-center text-xs text-ss-black-929 dark:text-ss-light-222">
							{shortenBio(bio)}
						</p>
					</CardDescription>
				</CardHeader>

				<CardContent className="relative -mt-2 -mb-1">
					<SkillDisplay
						fullname={fullname}
						header="Teaching"
						skills={teach}
						currentUserSkills={currentUser.skillsToLearn}
					/>
					<hr className="mt-3 mb-1 border-ss-light-333 dark:border-ss-black-444" />
					<SkillDisplay
						fullname={fullname}
						header="Learning"
						skills={learn}
						currentUserSkills={currentUser.skillsToTeach}
					/>
				</CardContent>

				<CardFooter className="flex flex-row -mb-1 lg:mb-0 flex-wrap justify-center gap-2">
					<ConnectionsButtons connection={connection} username={username} />
				</CardFooter>
			</Card>
		</>
	);
}

function ConnectionsButtons({ connection, username }) {
	if (connection.length === 0) {
		return (
			<Button text="Connect" username={username}>
				<UserRoundPlus />
			</Button>
		);
	} else if (connection[connection.length - 1].isAccepted) {
		return <PopUpButton variant="connected" username={username} />;
	} else if (connection[connection.length - 1].sender_id === currentUser.id) {
		return <PopUpButton variant="pending" username={username} />;
	} else if (connection[connection.length - 1].receiver_id === currentUser.id) {
		return (
			<>
				<Button text="Decline" username={username} />
				<Button text="Accept" username={username} />
			</>
		);
	}
}

function shortenBio(bio, maxLength = 50) {
	return bio.length <= maxLength ? bio : bio.slice(0, maxLength) + "...";
}
