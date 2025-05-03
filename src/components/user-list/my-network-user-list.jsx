"use client";

import { useState } from "react";
import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";
import { ConnectionFilter } from "../ConnectionFilter";
import { UserList } from "./user-list";

const filterText = {
	all: "All",
	connections: "My connections",
	pending: "Pending",
	requests: "Invitation",
};

export function MyNetWorkUserList() {
	const { currentUser, isLoading } = useAuthContext();
	const [activeButton, setActiveButton] = useState(0);
	const filterUsers = useDataContext().getUsersByStatus;

	if (isLoading || !currentUser) {
		return <div>Loading...</div>;
	}

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
			<UserList users={displayUsers} tab={activeButton} />
		</>
	);
}