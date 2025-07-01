"use client";

const guestUser = {
  id: 0,
  skillsToTeach: [],
  skillsToLearn: [],
};

import { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";

import userService from "@/services/user";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const { data } = useSession();
  const [currentUserData, setCurrentUserData] = useState(guestUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userService.getUser(data.user);
      setCurrentUserData(userData);
      setIsLoading(false);
    };

    if (data) {
      fetchUserData();
    } else {
      setCurrentUserData(guestUser);
    }
  }, [data]);

  const updateCurrentUser = async (updatedFields) => {
    const updatedUser = await userService.updateUser(data.user, updatedFields);

    setCurrentUserData(updatedUser);
  };

  const addSkill = async (skillKey, skillId) => {
    let updatedUser;

    if (skillKey === "skillsToTeach") {
      updatedUser = await userService.addTeachingSkill(data.user, skillId);
    } else if (skillKey === "skillsToLearn") {
      updatedUser = await userService.addLearningSkill(data.user, skillId);
    }

    setCurrentUserData(updatedUser);
  };

  const removeSkill = async (skillKey, skillId) => {
    let updatedUser;

    if (skillKey === "skillsToTeach") {
      updatedUser = await userService.deleteTeachingSkill(data.user, skillId);
    } else if (skillKey === "skillsToLearn") {
      updatedUser = await userService.deleteLearningSkill(data.user, skillId);
    }

    setCurrentUserData(updatedUser);
  };

  const updateProfilePicture = async (userId, publicId, url) => {
    const updatedUser = await userService.updateUser(userId, {
      pfp: { publicId: publicId, url: url },
    });

    setCurrentUserData(updatedUser);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUserData,
        isLoading,
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
