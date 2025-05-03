"use client";

import { useState } from "react";
import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";
import { ConnectionFilter } from "../ConnectionFilter";
import { UserList } from "./user-list";
import { SearchBar } from "@/components/search-bar";

const filterText = {
	all: "All",
	connections: "My connections",
	pending: "Pending",
	requests: "Invitation",
};

export function MyNetWorkUserList() {
	const currentUser = useAuthContext().currentUser;
	const [activeButton, setActiveButton] = useState(0);
	const filterUsers = useDataContext().getUsersByStatus;

	const displayUsers = filterUsers(
		currentUser.id,
		Object.keys(filterText)[activeButton]
	);

	return (
		<>
			<div className="flex flex-col-reverse min-[900px]:flex-row justify-center items-center min-[900px]:justify-start mb-6 mt-4 gap-3 h-20 min-[900px]:h-15">
				<ConnectionFilter
					filterText={filterText}
					activeButton={activeButton}
					setActiveButton={setActiveButton}
				/>

				<div className="min-[900px]:ml-auto">
					<SearchBar />
				</div>
			</div>

			<UserList users={displayUsers} />
		</>
	);
}
