"use client";

import { NextButton, PrevButton } from "./navigation-buttons";
import UserCard from "@/components/UserCard/UserCard";

import { useEffect, useState } from "react";

export function UserList({ users, tab }) {
	const pageSize = 8;
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [currentPage]);

	useEffect(() => setCurrentPage(0), [tab]);

	return (
		<>
			<div className="flex flex-row flex-wrap justify-center lg:justify-start items-start gap-4 lg:w-7xl">
				{users
					.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
					.map((user) => {
						return <UserCard key={user.id} {...user} />;
					})}
			</div>
			<div className="mt-5 flex flex-row justify-center">
				<PrevButton
					disabled={currentPage === 0}
					setCurrentPage={setCurrentPage}
				/>
				<NextButton
					disabled={
						users.length === 0 ||
						currentPage === Math.floor((users.length - 1) / pageSize)
					}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</>
	);
}
