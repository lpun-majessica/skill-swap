"use client";

import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";
import { UserList } from "./user-list";

export function RecommendedUserList() {
  const { currentUser } = useAuthContext();
  const { getFilteredUsers, users } = useDataContext();

  if (!currentUser) return <UserList users={users} />;

  // recommended users by default
  // or filtered users when filters or search are applied
  const displayUsers = getFilteredUsers(currentUser.id);

  return <UserList users={displayUsers} />;
}