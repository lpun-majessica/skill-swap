import { Badge } from "@/components/ui/badge";

export function SkillBadge({ skill }) {
	return (
		<Badge
			className={
				"rounded-xl bg-stone-300 dark:bg-stone-600 text-stone-600 dark:text-stone-200"
			}
		>
			{skill}
		</Badge>
	);
}

export function MatchingSkillBadge({ skill }) {
	return (
		<Badge
			className={
				"rounded-xl bg-red-300 dark:bg-red-400/80 border-[1.75px] border-red-700 dark:border-red-300 text-red-900 dark:text-red-100"
			}
		>
			{skill}
		</Badge>
	);
}
