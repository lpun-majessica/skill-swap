"use client";

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
import { useAuthContext } from "@/contexts/auth-context";

export default function UserCard({
	id,
	fullname,
	username,
	skillsToTeach,
	skillsToLearn,
	bio,
	_dob,
	_job,
	pfp,
}) {
	const currentUser = useAuthContext().currentUser ?? {
		id: 0,
		skillsToLearn: [],
		skillsToTeach: [],
	};
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
					<AvatarImage className="size-fit" src={pfp} alt={"@" + username} />
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
						skills={skillsToTeach}
						currentUserSkills={currentUser.skillsToLearn}
					/>
					<hr className="mt-3 mb-1 border-ss-light-333 dark:border-ss-black-444" />
					<SkillDisplay
						fullname={fullname}
						header="Learning"
						skills={skillsToLearn}
						currentUserSkills={currentUser.skillsToTeach}
					/>
				</CardContent>

				<CardFooter className="flex flex-row -mb-1 lg:mb-0 flex-wrap justify-center gap-2">
					<ConnectionsButtons
						connection={connection}
						username={username}
						currentUserId={currentUser.id}
					/>
				</CardFooter>
			</Card>
		</>
	);
}

function ConnectionsButtons({ connection, username, currentUserId }) {
	console.assert(connection.length <= 1);
	if (connection.length === 0) {
		return (
			<Button text="Connect" username={username}>
				<UserRoundPlus />
			</Button>
		);
	} else if (connection[0].isAccepted) {
		return <PopUpButton variant="connected" username={username} />;
	} else if (connection[0].sender_id === currentUserId) {
		return <PopUpButton variant="pending" username={username} />;
	} else if (connection[0].receiver_id === currentUserId) {
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
