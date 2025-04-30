import { Badge } from "@/components/ui/badge";

export function SkillBadge({ isMatch, skill }) {
	const className = isMatch
		? "rounded-xl bg-ss-red-ABA dark:bg-ss-red-666 border-[1.75px] border-ss-red-444 dark:border-ss-red-999 text-ss-red-404 dark:text-ss-light-555"
		: "rounded-xl bg-ss-light-222 dark:bg-ss-black-444 text-ss-black-131 dark:text-ss-light-555";

	return <Badge className={className}>{skill}</Badge>;
}
