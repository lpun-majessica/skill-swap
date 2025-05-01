"use client";

import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";
import { UserList } from "./user-list";

// Demo purpose only
// const currentUser = {
// 	id: 1,
// 	fullname: "Alex Johnson",
// 	username: "alexj",
// 	skillsToTeach: ["JavaScript", "HTML", "CSS"],
// 	skillsToLearn: ["UI/UX Design", "React"],
// 	bio: "Frontend developer who loves clean code.",
// 	dob: "1994-06-15",
// };

export function RecommendedUserList() {
	const { currentUser } = useAuthContext(); 
	const { filters, getFilteredUsers, users } = useDataContext();

	const filtersAreActive =
		filters.skillsToTeach.length > 0 || filters.skillsToLearn.length > 0;

	// If NOT logged in → show all users (no filter)
	if (!currentUser) {
		return <UserList users={users} />;
	}

	const currentUserId = currentUser.id;

	const filteredUsers = getFilteredUsers(currentUserId);
	// If filters are active, show filtered users (if any)
	// If no filters are active, show all users except the current user
	const displayUsers = filtersAreActive
		? filteredUsers
		: users
				.filter((user) => user.id !== currentUserId)
				.sort(
					(userA, userB) =>
						countSimilarSkills(userB.skillsToTeach, userB.skillsToLearn, currentUser) -
						countSimilarSkills(userA.skillsToTeach, userA.skillsToLearn, currentUser)
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
