"use client";

import { useState } from "react";
import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";
import { ConnectionFilter } from "../connection-filter";
import { UserList } from "./user-list";
import { SearchBar } from "@/components/search-bar";

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
    Object.keys(filterText)[activeButton],
  );

  return (
    <>
      <div className="mt-4 mb-6 flex h-20 flex-col-reverse items-center justify-center gap-3 min-[900px]:h-15 min-[900px]:flex-row min-[900px]:justify-start">
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
