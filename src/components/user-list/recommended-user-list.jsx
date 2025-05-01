"use client";

// Demo purpose only
const currentUser = {
	id: 1,
	fullname: "Alex Johnson",
	username: "alexj",
	teach: ["JavaScript", "HTML", "CSS"],
	learn: ["UI/UX Design", "React"],
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
			countSimilarSkills(userB.teach, userB.learn) -
			countSimilarSkills(userA.teach, userA.learn)
	);

	return <UserList users={displayUsers} />;
}

function countSimilarSkills(teach, learn) {
	return compare(teach, currentUser.learn) + compare(learn, currentUser.teach);

	function compare(targetSkills, userSkills) {
		let result = 0;
		targetSkills.forEach((skill) => (result += userSkills.includes(skill)));
		return result;
	}
}
