"use client";

import { useState } from "react";
import { useUserContext } from "@/contexts/users-context";

import { ConnectionFilter } from "../filter/connection-filter";
import { UserList } from "./user-list";
import { SearchBar } from "@/components/filter/search-bar";

const filterText = {
  all: "All",
  connections: "Connected",
  pending: "Received",
  requests: "Sent",
};

export function MyNetWorkUserList() {
  const [activeButton, setActiveButton] = useState(0);
  const { users, filterByStatus } = useUserContext();

  const displayedUsers = filterByStatus(
    users,
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

      <UserList users={displayedUsers} />
    </>
  );
}
