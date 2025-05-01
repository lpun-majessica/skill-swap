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

import { useState } from "react";
import { useDataContext } from "@/contexts/data-context";
import { ConnectionFilter } from "../ConnectionFilter";
import { UserList } from "./user-list";

const filterText = {
	all: "All",
	connections: "My connections",
	pending: "Pending",
	requests: "Invitation",
};

export function MyNetWorkUserList() {
	const [activeButton, setActiveButton] = useState(0);
	const filterUsers = useDataContext().getUsersByStatus;

	const displayUsers = filterUsers(
		currentUser.id,
		Object.keys(filterText)[activeButton]
	);

	return (
		<>
			<ConnectionFilter
				filterText={filterText}
				activeButton={activeButton}
				setActiveButton={setActiveButton}
			/>
			<UserList users={displayUsers} />
		</>
	);
}
