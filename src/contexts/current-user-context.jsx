"use client";

const guestUser = {
  id: 0,
  username: "guest",
  fullname: "Guest User",
  job: "Guest",
  dob: "yyyy-mm-dd",
  skillsToTeach: [],
  skillsToLearn: [],
  pfp: {},
};

import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./auth-context";

import userService from "@/services/user";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const { currentUser } = useAuthContext();
  const [currentUserData, setCurrentUserData] = useState(guestUser);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userData = await userService.getUser(currentUser.id);
        setCurrentUserData(userData);
      };

      fetchUserData();
    }
  }, [currentUser]);

  const updateCurrentUser = async (updatedFields) => {
    const updatedUser = await userService.updateUser(
      currentUser.id,
      updatedFields,
    );

    setCurrentUserData(updatedUser);
  };

  const addSkill = async (skillKey, skillId) => {
    let updatedUser;

    if (skillKey === "skillsToTeach") {
      updatedUser = await userService.addTeachingSkill(currentUser.id, skillId);
    } else if (skillKey === "skillsToLearn") {
      updatedUser = await userService.addLearningSkill(currentUser.id, skillId);
    }

    setCurrentUserData(updatedUser);
  };

  const removeSkill = async (skillKey, skillId) => {
    let updatedUser;

    if (skillKey === "skillsToTeach") {
      updatedUser = await userService.deleteTeachingSkill(
        currentUser.id,
        skillId,
      );
    } else if (skillKey === "skillsToLearn") {
      updatedUser = await userService.deleteLearningSkill(
        currentUser.id,
        skillId,
      );
    }

    setCurrentUserData(updatedUser);
  };

  const updateProfilePicture = async (publicId, url) => {
    const updatedUser = await userService.updateUser(currentUser.id, {
      pfp: { publicId: publicId, url: url },
    });

    setCurrentUserData(updatedUser);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUserData,
        updateCurrentUser,
        updateProfilePicture,
        addSkill,
        removeSkill,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUserContext() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within an CurrentUserProvider",
    );
  }
  return context;
}
