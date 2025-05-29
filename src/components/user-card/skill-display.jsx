import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { SkillBadge } from "../common/SkillBadge";

export function SkillDisplay({
	fullname,
	header,
	skills = [],
	currentUserSkills = [],
}) {
	const containerWidth = 255;
	const paddingWidth = 5;
	const wordWidth = 10;
	let maxSkillDisplay = 0;

	const skillsArray = Array.isArray(skills) ? skills : [];

	const sortedSkills = skillsArray
		.map((skill) => [skill, currentUserSkills.includes(skill)])
		.sort(([_skillA, isMatchSkillA], [_skillB, isMatchSkillB]) => {
			const matchA = isMatchSkillA ? 1 : 0;
			const matchB = isMatchSkillB ? 1 : 0;
			return matchA > matchB ? -1 : 1;
		});

	sortedSkills.reduce((currentWidth, [skill]) => {
		let addedWidth = 0;
		if (
			currentWidth + paddingWidth + skill.length * wordWidth <=
			containerWidth
		) {
			maxSkillDisplay += 1;
			addedWidth = paddingWidth + skill.length * wordWidth;
		}

		return currentWidth + addedWidth;
	}, 0);

	function displaySkill(cutOff) {
		return sortedSkills.slice(0, cutOff).map(([skill, isMatch]) => {
			return <SkillBadge key={skill} isMatch={isMatch} skill={skill} />;
		});
	}

	return (
		<>
			<p className="mb-1 text-xs lg:text-sm text-ss-black-131 dark:text-ss-light-555">
				{header}
			</p>
			<Popover>
				<div className="flex flex-row gap-1 h-6">
					{displaySkill(maxSkillDisplay)}
					{skillsArray.length > maxSkillDisplay && (
						<PopoverTrigger asChild className="ml-auto">
							<p
								variant="link"
								className="p-1 text-xs text-ss-black-444 dark:text-ss-light-555 font-bold hover:cursor-pointer hover:underline decoration-1 justify-center"
							>
								+{skillsArray.length - maxSkillDisplay}
							</p>
						</PopoverTrigger>
					)}
				</div>

				<PopoverContent className="w-70 lg:w-80 bg-ss-light-777 dark:bg-ss-black-131">
					<p className="mb-1 text-xs lg:text-sm text-ss-black-444 dark:text-ss-light-555">
						<span className="font-bold">{fullname}</span> is{" "}
						{header.toLowerCase()}
					</p>
					<div className="flex flex-row flex-wrap gap-1">
						{displaySkill(skillsArray.length)}
					</div>
				</PopoverContent>
			</Popover>
		</>
	);
}
