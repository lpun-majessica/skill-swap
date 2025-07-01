"use client";

const initialUsers = [];

import { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUserContext } from "./current-user-context";
import { useConnectionContext } from "./connection-context";

import userService from "@/services/user";
import { listSkill } from "@/utils/skills";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { data, status } = useSession();
  const { currentUser } = useCurrentUserContext();
  const { findConnectionWith } = useConnectionContext();
  const [users, setUsers] = useState(initialUsers);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTeach, setSelectedTeach] = useState([]);
  const [selectedLearn, setSelectedLearn] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const USERS = await userService.getAllUsers();
      setUsers(USERS.filter((user) => user.id != data?.user));
      setIsLoading(false);
    };

    if (status !== "loading") {
      fetchUserData();
    }
  }, [data]);

  let displayedUsers = users;

  if (selectedLearn.length > 0) {
    displayedUsers = displayedUsers.filter((user) => {
      const learningMatch = user.skillsToLearn.some((skill) =>
        selectedLearn.includes(skill.name),
      );
      return learningMatch;
    });
  }

  if (selectedTeach.length > 0) {
    displayedUsers = displayedUsers.filter((user) => {
      const teachingMatch = user.skillsToTeach.some((skill) =>
        selectedTeach.includes(skill.name),
      );
      return teachingMatch;
    });
  }

  if (searchKeyword.trim() !== "") {
    const keyword = searchKeyword.trim().toLowerCase();

    displayedUsers = displayedUsers.filter(
      (user) =>
        (user.fullname?.toLowerCase().includes(keyword) ?? false) ||
        (user.username?.toLowerCase().includes(keyword) ?? false),
    );
  }

  const isPotentialMatch = (skillsToTeach, skillsToLearn) => {
    const targetTeach = listSkill(skillsToTeach);
    const targetLearn = listSkill(skillsToLearn);
    const userTeach = listSkill(currentUser.skillsToTeach);
    const userLearn = listSkill(currentUser.skillsToLearn);

    const isLearningMatch = compareSkills(targetTeach, userLearn) >= 1;
    const isTeachingMatch = compareSkills(targetLearn, userTeach) >= 1;

    return isLearningMatch && isTeachingMatch;
  };

  function recommend(users) {
    const recommendedUser = users.sort((userA, userB) => {
      const priorityA = getConnectionPriority(userA.id, currentUser.id);
      const priorityB = getConnectionPriority(userB.id, currentUser.id);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return (
        countSimilarSkills(userB, currentUser) -
        countSimilarSkills(userA, currentUser)
      );
    });
    return recommendedUser;
  }

  function filterByStatus(users, type) {
    switch (type) {
      case "connections": {
        return users.filter(
          (user) => getConnectionStatus(user.id) === "connected",
        );
      }
      case "pending": {
        return users.filter(
          (user) => getConnectionStatus(user.id) === "pending_received",
        );
      }
      case "requests": {
        return users.filter(
          (user) => getConnectionStatus(user.id) === "pending_sent",
        );
      }
      case "all":
      default: {
        return users.filter(
          (user) => getConnectionStatus(user.id) !== "not_connected",
        );
      }
    }
  }

  function getConnectionPriority(userId) {
    const status = getConnectionStatus(userId);

    switch (status) {
      case "not_connected":
      case "pending_sent":
      case "pending_received":
        return 0;
      case "connected":
        return 1;
      default:
        return Infinity;
    }
  }

  function getConnectionStatus(userId) {
    const connection = findConnectionWith(userId);
    if (!connection) return "not_connected";

    if (connection.isAccepted) return "connected";

    return connection.sender_id === currentUser.id
      ? "pending_sent"
      : "pending_received";
  }

  function countSimilarSkills(target, user) {
    const targetTeach = listSkill(target.skillsToTeach);
    const targetLearn = listSkill(target.skillsToLearn);
    const userTeach = listSkill(user.skillsToTeach);
    const userLearn = listSkill(user.skillsToLearn);

    return (
      compareSkills(targetTeach, userLearn) +
      compareSkills(targetLearn, userTeach)
    );
  }

  function compareSkills(targetSkills = [], userSkills = []) {
    let count = 0;
    targetSkills.forEach((skill) => {
      const isSkillMatch = userSkills.includes(skill) ? 1 : 0;
      count += isSkillMatch;
    });

    return count;
  }

  return (
    <UserContext.Provider
      value={{
        users: displayedUsers,
        isLoading,
        recommend,
        filterByStatus,
        selectedLearn,
        setSelectedLearn,
        selectedTeach,
        setSelectedTeach,
        searchKeyword,
        setSearchKeyword,
        isPotentialMatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
}
