"use client";

import { Pagination } from "./pagination";
import UserCard from "@/components/user-card/user-card";
import { useUserContext } from "@/contexts/users-context";

import { useEffect, useState } from "react";
import LoadingIcon from "../common/loading-icon";

export function UserList({ users }) {
  const { isLoading } = useUserContext();

  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const lastPage =
    users.length === 0 ? 0 : Math.floor((users.length - 1) / pageSize);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => setCurrentPage(0), [users]);

  if (isLoading) {
    return (
      <div className="flex size-full min-h-[60vh] items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto grid grid-cols-1 gap-4 min-[900px]:grid-cols-2 min-[1180px]:grid-cols-3 min-[1500px]:grid-cols-4">
        {users
          .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .map((user) => {
            return (
              <div key={user.id} className="flex items-center justify-center">
                <UserCard className="last-of-type:after:w-2xs" {...user} />
              </div>
            );
          })}
      </div>
      <div className="mt-5 flex flex-row items-center justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={lastPage}
        />
      </div>
    </>
  );
}
