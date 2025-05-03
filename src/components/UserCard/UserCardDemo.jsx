import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillDisplay } from "@/components/UserCard/SkillDisplay";

import { UserRoundPlus } from "lucide-react";

export function UserCardDemo({
	id,
	fullname,
	username,
	skillsToTeach,
	skillsToLearn,
	job,
}) {
	const fallbackName = fullname
		.split(" ")
		.map((w) => w[0].toUpperCase())
		.join("");

	return (
		<Card className="relative w-3xs lg:w-2xs bg-ss-light-777 dark:bg-ss-black-131">
			<Avatar className="-mt-1 lg:mt-0 size-16 lg:size-18 mx-auto">
				<AvatarImage src={`pfp/${id}.jpeg`} alt={"@" + username} />
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
					currentUserSkills={[]} // Không so sánh
				/>
				<hr className="mt-3 mb-1 border-ss-light-333 dark:border-ss-black-444" />
				<SkillDisplay
					fullname={fullname}
					header="Learning"
					skills={skillsToLearn}
					currentUserSkills={[]} // Không so sánh
				/>
			</CardContent>

			<CardFooter className="flex flex-row -mb-1 lg:mb-0 flex-wrap justify-center gap-2">
				{/* Giả lập nút Connect chỉ để trưng bày */}
				<button className="flex flex-row gap-2 justify-center items-center text-xs lg:text-sm w-24 h-8 lg:w-28 lg:h-10 rounded-4xl bg-ss-red-505 text-ss-light-555 dark:bg-ss-red-404 dark:text-ss-light-222">
					Connect <UserRoundPlus className="size-4" />
				</button>
			</CardFooter>
		</Card>
	);
}
