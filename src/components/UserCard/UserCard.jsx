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
import { SkillDisplay } from "./SkillDisplay";
import Link from "next/link";

import { ConnectionsButtons } from "./connection-buttons";

import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";
import { useState, useEffect } from "react";
import { ArrowRightLeft } from 'lucide-react';

export default function UserCard({
	id,
	fullname,
	username,
	skillsToTeach,
	skillsToLearn,
	job,
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


	const { hasCompatibleSkills } = useDataContext();

	const [isMatch, setIsMatch] = useState(false);

	useEffect(() => {
		if (
			currentUser &&
			Array.isArray(currentUser.skillsToTeach) &&
			Array.isArray(currentUser.skillsToLearn)
		) {
			setIsMatch(hasCompatibleSkills(id, currentUser));
		}
	}, [id, currentUser]);

	return (
		<>
			<Card className={`relative w-3xs min-[800px]:w-64 min-[1280px]:w-67 min-[1545px]:w-2xs bg-ss-light-777 dark:bg-ss-black-131
				${isMatch ? "shadow-[0_0px_6px_rgba(218,_5,_5,_0.3)] dark:shadow-[0_0px_4px_rgba(255,_111,_111,_0.4)] ring-[#FF9595] dark:ring-ss-red-666 ring-1" : "shadow-lg inset-shadow-2xs"}`}>
				<Link href={`/user/${id}`} className="absolute inset-0" />
				<ArrowRightLeft strokeWidth={2} size={22} className={`-mt-1 absolute ml-5 p-0.5 rounded-full text-ss-red-666 border-ss-red-666 border-2 ${isMatch ? "visible" : "invisible"}`}/> 
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
							{job}
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
					<ConnectionsButtons connection={connection} cardUserId={id} />
				</CardFooter>
			</Card>
		</>
	);
}
