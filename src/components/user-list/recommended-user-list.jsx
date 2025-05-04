"use client";

import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";
import { UserList } from "./user-list";
import { SearchBar } from "@/components/search-bar";

export function RecommendedUserList() {
	const { currentUser } = useAuthContext();
	const { getFilteredUsers, users } = useDataContext();

	// recommended users by default
	// or filtered users when filters or search are applied
	const displayUsers = getFilteredUsers(currentUser ? currentUser.id : 0);

	return (
		<>
			<div className="flex flex-col-reverse min-[900px]:flex-row justify-center items-center min-[900px]:justify-start mb-6 mt-4 gap-3 h-20 min-[900px]:h-15">
				<h1 className="text-2xl min-[1180px]:text-3xl font-bold text-ss-black-717 dark:text-ss-light-555">
					{currentUser && "Recommended for you"}
				</h1>

				<div className="min-[900px]:ml-auto">
					<SearchBar />
				</div>
			</div>

			<UserList users={displayUsers} />
		</>
	);
}
