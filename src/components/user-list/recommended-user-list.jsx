"use client";

// Demo purpose only
const currentUser = {
	id: 1,
	fullname: "Alex Johnson",
	username: "alexj",
	skillsToTeach: ["JavaScript", "HTML", "CSS"],
	skillsToLearn: ["UI/UX Design", "React"],
	bio: "Frontend developer who loves clean code.",
	dob: "1994-06-15",
};

import { useDataContext } from "@/contexts/data-context";
import { UserList } from "./user-list";

export function RecommendedUserList() {
	const dataContext = useDataContext();

	const users = dataContext.users.filter((user) => user.id !== currentUser.id);
	const displayUsers = users.sort(
		(userA, userB) =>
			countSimilarSkills(userB.skillsToTeach, userB.skillsToLearn) -
			countSimilarSkills(userA.skillsToTeach, userA.skillsToLearn)
	);

	return <UserList users={displayUsers} />;
}

function countSimilarSkills(skillsToTeach, skillsToLearn) {
	return (
		compare(skillsToTeach, currentUser.skillsToLearn) +
		compare(skillsToLearn, currentUser.skillsToTeach)
	);

	function compare(targetSkills, userSkills) {
		let result = 0;
		if (targetSkills && userSkills) {
			targetSkills.forEach(
				(skill) => (result += userSkills.includes(skill) ? 1 : 0)
			);
		}
		return result;
	}
}
