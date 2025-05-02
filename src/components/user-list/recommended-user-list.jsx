"use client";

import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";
import { UserList } from "./user-list";

export function RecommendedUserList() {
	const currentUser = useAuthContext().currentUser;
	const dataContext = useDataContext();

	if (!currentUser) return <UserList users={dataContext.users} />;

	const users = dataContext.users.filter((user) => user.id !== currentUser.id);
	const displayUsers = users.sort(
		(userA, userB) =>
			countSimilarSkills(userB.skillsToTeach, userB.skillsToLearn) -
			countSimilarSkills(userA.skillsToTeach, userA.skillsToLearn)
	);

	return <UserList users={displayUsers} />;

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
}
