"use client";

import { useState, useEffect } from "react";
import EditProfilePopup from "./edit-profile-popup";
import { ConnectionsButtons } from "@/components/user-card/connection-buttons";
import { ArrowRightLeft } from "lucide-react";
import { useCurrentUserContext } from "@/contexts/current-user-context";
import UserAvatar from "../user-card/avatar";
import { useConnectionContext } from "@/contexts/connection-context";
import { useUserContext } from "@/contexts/users-context";

const UserDetails = ({ user = null, isEditable = true }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const { currentUser, updateCurrentUser } = useCurrentUserContext();
  const { findConnectionWith } = useConnectionContext();
  const { isPotentialMatch } = useUserContext();

  const connection = findConnectionWith(user.id);

  const handleEditClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleSave = (updatedUser) => {
    updateCurrentUser(updatedUser);
    setShowPopup(false);
  };

  const userData = isEditable ? currentUser : user;
  const { fullname, username, skillsToLearn, skillsToTeach, pfp, dob, job } =
    userData;

  useEffect(() => {
    if (!isEditable) {
      setIsMatch(isPotentialMatch(skillsToLearn, skillsToTeach));
    }
  }, [skillsToLearn, skillsToTeach]);

  if (!userData) return null;

  return (
    <div
      className={`dark:bg-ss-black-929 mx-5 flex h-fit w-sm flex-col items-center rounded-2xl bg-white p-6 sm:w-md md:mx-0 md:w-md lg:w-lg ${
        isMatch
          ? "ring-ss-red-666 shadow-[0_0px_7px_rgba(218,_5,_5,_0.3)] ring-1 dark:shadow-[0_0px_7px_rgba(255,_111,_111,_0.4)] dark:ring-[#c06464]"
          : "shadow-lg inset-shadow-2xs"
      }`}
    >
      <div className="relative w-full">
        <div
          className={`text-ss-red-666 border-ss-red-666 absolute flex gap-1 rounded-full border-2 px-2 py-1 text-xs font-bold ${!isEditable && isMatch ? "visible" : "invisible"}`}
        >
          {" "}
          <ArrowRightLeft
            strokeWidth={2}
            size={16}
            className="hidden sm:inline"
          />
          <span>Potential match!</span>
        </div>

        <div className="flex w-full justify-center">
          <UserAvatar
            className="size-[96px] sm:size-[160px]"
            fullname={fullname}
            username={username}
            pfp={pfp}
          />
        </div>
      </div>
      <h2 className="mt-4 text-xl font-bold">{fullname}</h2>
      <h4 className="text-ss-red-444 mt-1 mb-3 text-base">{job}</h4>
      {!isEditable && (
        <ConnectionsButtons connection={connection} cardUserId={user.id} />
      )}
      <div className="dark:border-ss-black-131 my-4 flex w-78 flex-col items-center rounded-2xl border border-gray-300 px-5 py-4 sm:w-90 sm:px-6">
        <div className="flex w-full flex-col gap-4">
          {/* Username */}
          <div>
            <p className="dark:text-ss-light-FFF mb-1 text-sm font-semibold text-gray-900">
              User name
            </p>
            <div className="dark:bg-ss-black-121 w-full rounded-xl bg-gray-100 px-4 py-2">
              <span className="dark:text-ss-light-333 text-sm text-gray-500">
                @{username}
              </span>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="dark:text-ss-light-FFF mb-1 text-sm font-semibold text-gray-900">
              Date of Birth
            </p>
            <div className="dark:bg-ss-black-121 rounded-xl bg-gray-100 px-4 py-2">
              <span className="dark:text-ss-light-333 text-sm text-gray-500">
                {dob}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="dark:text-ss-light-FFF font-medium text-gray-700">
              Bio:
            </p>
            <div className="dark:bg-ss-black-121 h-20 rounded-xl bg-gray-100 px-4 py-2">
              <span className="dark:text-ss-light-333 text-sm text-gray-500">
                {bio}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isEditable && (
        <button
          onClick={handleEditClick}
          className="dark:bg-ss-black-444 dark:hover:bg-ss-red-505 hover:bg-ss-red-404 hover:text-ss-light-FFF mt-2 rounded-3xl bg-gray-300 px-6 py-2"
        >
          Edit profile
        </button>
      )}

      {/* Popup */}
      {showPopup && (
        <EditProfilePopup onSave={handleSave} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default UserDetails;
