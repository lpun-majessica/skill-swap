"use client";

import { useUserContext } from "@/contexts/users-context";
import { useSession } from "next-auth/react";

import { UserList } from "./user-list";
import { SearchBar } from "@/components/filter/search-bar";

export function RecommendedUserList() {
  const { users, recommend } = useUserContext();
  const { data } = useSession();

  const displayedUsers = recommend(users);

  return (
    <>
      <div className="mt-4 mb-6 flex h-20 flex-col-reverse items-center justify-center gap-3 min-[900px]:h-15 min-[900px]:flex-row min-[900px]:justify-start">
        <h1 className="text-ss-black-717 dark:text-ss-light-555 text-2xl font-bold min-[1180px]:text-3xl">
          {data && "Recommended for you"}
        </h1>

        <div className="min-[900px]:ml-auto">
          <SearchBar />
        </div>
      </div>

      <UserList users={displayedUsers} />
    </>
  );
}
