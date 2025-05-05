"use client";
import { createContext, useContext, useState } from "react";
import usersData from "../lib/data/users.json";
import connectionsData from "../lib/data/connections.json";

const DataContext = createContext();

export function DataProvider({ children }) {
	const [users, setUsers] = useState(usersData);
	const [connections, setConnections] = useState(connectionsData);
	const [filters, setFilters] = useState({
		skillsToTeach: [],
		skillsToLearn: [],
	});
	const [searchKeyword, setSearchKeyword] = useState("");

	// User
	const updateUser = (id, updatedFields) => {
		setUsers((prev) =>
			prev.map((user) =>
				user.id === id ? { ...user, ...updatedFields } : user
			)
		);
	};

	// CRUD Connection
	const createConnection = (senderId, receiverId) => {
		const newConnection = {
			id: Date.now(), // fake id
			sender_id: senderId,
			receiver_id: receiverId,
			isAccepted: false,
		};
		setConnections((prev) => [...prev, newConnection]);
	};

	const acceptConnection = (connectionId) => {
		setConnections((prev) =>
			prev.map((conn) =>
				conn.id === connectionId ? { ...conn, isAccepted: true } : conn
			)
		);
	};

	const rejectConnection = (connectionId) => {
		setConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
	};

	const removeConnection = (connectionId) => {
		setConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
	};

	// Helper function to count similar skills between users
	const countSimilarSkills = (user, currentUser) => {
		const compareSkills = (targetSkills, userSkills) => {
			let count = 0;
			if (targetSkills && userSkills) {
				targetSkills.forEach(
					(skill) => (count += userSkills.includes(skill) ? 1 : 0)
				);
			}
			return count;
		};

		return (
			compareSkills(user.skillsToTeach, currentUser.skillsToLearn) +
			compareSkills(user.skillsToLearn, currentUser.skillsToTeach)
		);
	};

	const getCurrentUser = (currentUserId) => {
		const currentUser = users.find((user) => user.id === currentUserId);
		// if not logged in, returns dummy data to remains searchable
		return currentUser ?? { id: 0, skillsToLearn: [], skillsToTeach: [] };
	};

	// Get the connection status between two users
	const getConnectionStatus = (currentUserId, otherUserId) => {
		const connection = connections.find(
			(conn) =>
				(conn.sender_id === currentUserId &&
					conn.receiver_id === otherUserId) ||
				(conn.receiver_id === currentUserId && conn.sender_id === otherUserId)
		);

		if (!connection) return "not_connected";

		if (connection.isAccepted) return "connected";

		// If not accepted, check if it's pending sent or received
		return connection.sender_id === currentUserId
			? "pending_sent"
			: "pending_received";
	};

	// Helper function to get a numeric priority for connection status
	const getConnectionPriority = (status) => {
		switch (status) {
			case "not_connected":
			case "pending_sent":
			case "pending_received":
				return 0; // Highest priority
			case "connected":
				return 1; // Lowest priority - already connected
			default:
				return Infinity;
		}
	};

	// Get users based on filters and search with improved sorting
	const getFilteredUsers = (currentUserId) => {
		const currentUser = getCurrentUser(currentUserId);

		// Check if filters or search are active
		const hasActiveFilters =
			filters.skillsToTeach.length > 0 || filters.skillsToLearn.length > 0;
		const hasActiveSearch = searchKeyword.trim() !== "";

		// Start with all users except current user
		let filtered = users.filter((user) => user.id !== currentUserId);

		// Apply skill filters if any
		if (hasActiveFilters) {
			filtered = filtered.filter((user) => {
				const teachesMatch =
					filters.skillsToTeach.length > 0 &&
					user.skillsToTeach.some((skill) =>
						filters.skillsToTeach.includes(skill)
					);

				const learnsMatch =
					filters.skillsToLearn.length > 0 &&
					user.skillsToLearn.some((skill) =>
						filters.skillsToLearn.includes(skill)
					);

				// Return true if either Teach or Learn match
				return teachesMatch || learnsMatch;
			});
		}

		// Apply search filter if any
		if (hasActiveSearch) {
			const keyword = searchKeyword.toLowerCase();
			filtered = filtered.filter(
				(user) =>
					(user.name?.toLowerCase().includes(keyword) ?? false) ||
					(user.username?.toLowerCase().includes(keyword) ?? false)
			);
		}

		// Sort users by connection status and skill match count
		return filtered.sort((userA, userB) => {
			// First, sort by connection status
			const statusA = getConnectionStatus(currentUserId, userA.id);
			const statusB = getConnectionStatus(currentUserId, userB.id);
			const priorityA = getConnectionPriority(statusA);
			const priorityB = getConnectionPriority(statusB);

			if (priorityA !== priorityB) {
				return priorityA - priorityB;
			}

			// If same connection status, sort by skill match count (higher first)
			return (
				countSimilarSkills(userB, currentUser) -
				countSimilarSkills(userA, currentUser)
			);
		});
	};

	// Get the list of users based on connection status
	const getConnectionLists = (currentUserId) => {
		const accepted = connections
			.filter(
				(conn) =>
					conn.isAccepted &&
					(conn.sender_id === currentUserId ||
						conn.receiver_id === currentUserId)
			)
			.map((conn) =>
				conn.sender_id === currentUserId ? conn.receiver_id : conn.sender_id
			);

		const pendingSent = connections
			.filter((conn) => !conn.isAccepted && conn.sender_id === currentUserId)
			.map((conn) => conn.receiver_id);

		const pendingReceived = connections
			.filter((conn) => !conn.isAccepted && conn.receiver_id === currentUserId)
			.map((conn) => conn.sender_id);

		return { accepted, pendingSent, pendingReceived };
	};

	const getUserById = (id) => {
		return users.find((user) => user.id === id);
	};

	// Get users by type
	const getUsersByStatus = (currentUserId, type) => {
		const { accepted, pendingSent, pendingReceived } =
			getConnectionLists(currentUserId);
		let filteredUsers;

		switch (type) {
			case "all":
				filteredUsers = users.filter((user) =>
					[...accepted, ...pendingSent, ...pendingReceived].includes(user.id)
				);
				break;
			case "connections":
				filteredUsers = users.filter((user) => accepted.includes(user.id));
				break;
			case "pending":
				filteredUsers = users.filter((user) => pendingSent.includes(user.id));
				break;
			case "requests":
				filteredUsers = users.filter((user) =>
					pendingReceived.includes(user.id)
				);
				break;
			default:
				filteredUsers = [];
		}

		// Apply skill filters if any are active
		const hasActiveFilters =
			filters.skillsToTeach.length > 0 || filters.skillsToLearn.length > 0;

		if (hasActiveFilters) {
			filteredUsers = filteredUsers.filter((user) => {
				const teachesMatch =
					filters.skillsToTeach.length > 0 &&
					user.skillsToTeach.some((skill) =>
						filters.skillsToTeach.includes(skill)
					);

				const learnsMatch =
					filters.skillsToLearn.length > 0 &&
					user.skillsToLearn.some((skill) =>
						filters.skillsToLearn.includes(skill)
					);

				// Return true if either Teach or Learn match
				return teachesMatch || learnsMatch;
			});
		}

		// Apply search filter if any
		if (searchKeyword.trim() !== "") {
			const keyword = searchKeyword.toLowerCase();
			filteredUsers = filteredUsers.filter(
				(user) =>
					(user.name?.toLowerCase().includes(keyword) ?? false) ||
					(user.username?.toLowerCase().includes(keyword) ?? false)
			);
		}

		return filteredUsers;
	};

	// Function to check if two users have compatible skills
	const hasCompatibleSkills = (userId, currentUser) => {
		const user = users.find((user) => user.id === userId);

		if (!user || !currentUser) return false;

		// Check if user has at least one skill to learn that current user can teach
		const userCanLearnFromCurrent = user.skillsToLearn.some((skill) =>
			currentUser.skillsToTeach.includes(skill)
		);

		// Check if current user has at least one skill to learn that user can teach
		const currentCanLearnFromUser = currentUser.skillsToLearn.some((skill) =>
			user.skillsToTeach.includes(skill)
		);

		return userCanLearnFromCurrent && currentCanLearnFromUser;
	};

	return (
		<DataContext.Provider
			value={{
				users,
				connections,
				updateUser,
				createConnection,
				acceptConnection,
				rejectConnection,
				removeConnection,
				filters,
				setFilters,
				searchKeyword,
				setSearchKeyword,
				getUserById,
				getFilteredUsers,
				getUsersByStatus,
				hasCompatibleSkills,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export function useDataContext() {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useDataContext must be used within a DataProvider");
	}
	return context;
}
