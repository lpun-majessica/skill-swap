"use client";

import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";
import { UserList } from "./user-list";

export function RecommendedUserList() {
	const { currentUser } = useAuthContext(); 
	const { users, filters, getFilteredUsers } = useDataContext();

	if (!currentUser) return null;

	const currentUserId = currentUser.id;

	const filtersAreActive =
		filters.skillsToTeach.length > 0 || filters.skillsToLearn.length > 0;

	const filteredUsers = getFilteredUsers(currentUserId);

	const displayUsers = filtersAreActive
		? filteredUsers
		: users
				.filter((user) => user.id !== currentUserId)
				.sort(
					(userA, userB) =>
						countSimilarSkills(
							userB.skillsToTeach,
							userB.skillsToLearn,
							currentUser
						) -
						countSimilarSkills(
							userA.skillsToTeach,
							userA.skillsToLearn,
							currentUser
						)
				);

	return <UserList users={displayUsers} />;
}

function countSimilarSkills(skillsToTeach, skillsToLearn, currentUser) {
	return (
		compare(skillsToTeach, currentUser.skillsToLearn) +
		compare(skillsToLearn, currentUser.skillsToTeach)
	);

	function compare(targetSkills, userSkills) {
		let result = 0;
		if (targetSkills && userSkills) {
			targetSkills.forEach((skill) => {
				if (userSkills.includes(skill)) result++;
			});
		}
		return result;
	}
}
