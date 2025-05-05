"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context";

export default function AuthGuard({ children }) {
	const { currentUser, isLoading } = useAuthContext();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !currentUser) {
			router.replace("/login");
		}
	}, [isLoading, currentUser, router]);

	if (isLoading || !currentUser) {
		return (
			<div className="flex justify-center items-center text-3xl min-h-95 border-4 border-red-500">
				Loading ...
			</div>
		);
	}

	return children;
}
