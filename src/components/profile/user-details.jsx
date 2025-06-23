"use client";

import { useState } from "react";
import { useCurrentUserContext } from "@/contexts/current-user-context";
import { useConnectionContext } from "@/contexts/connection-context";
import { useUserContext } from "@/contexts/users-context";

import EditProfilePopup from "./edit-profile-popup";
import UserAvatar from "../user-card/avatar";
import ImageUpload from "./image-upload";
import { ConnectionsButtons } from "@/components/user-card/connection-buttons";
import { ArrowRightLeft, AtSign } from "lucide-react";
import { Button } from "../ui/button";

const UserDetails = ({ user = null, isEditable = true }) => {
  const [showPopup, setShowPopup] = useState(false);

  const { currentUser, updateCurrentUser } = useCurrentUserContext();
  const { findConnectionWith } = useConnectionContext();
  const { isPotentialMatch } = useUserContext();

  const connection = findConnectionWith(user?.id);

  const handleEditClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleSave = (updatedUser) => {
    updateCurrentUser(updatedUser);
    setShowPopup(false);
  };

  const userData = isEditable ? currentUser : user;
  const {
    fullname,
    username,
    skillsToLearn,
    skillsToTeach,
    pfp,
    bio,
    dob,
    job,
  } = userData;

  const isMatch = isPotentialMatch(skillsToTeach, skillsToLearn);

  if (!userData) return null;

  return (
    <div
      className={`dark:bg-ss-black-929 mx-auto flex h-fit w-87 flex-col items-center rounded-2xl bg-white px-6 py-8 sm:w-sm md:w-md lg:mx-0 lg:w-lg ${
        isMatch
          ? "ring-ss-red-666 shadow-[0_0px_7px_rgba(218,_5,_5,_0.3)] ring-1 dark:shadow-none dark:ring-[#c06464]"
          : "shadow-lg inset-shadow-2xs"
      }`}
    >
      <div className="relative w-full">
        <div
          className={`text-ss-red-666 border-ss-red-666 absolute -top-1 -left-1 flex w-fit gap-1 rounded-full border-1 px-2 py-1 text-xs font-bold ${!isEditable && isMatch ? "visible" : "invisible"}`}
          title={`You may be able to exchange skill knowledge with @${username}`}
        >
          <ArrowRightLeft
            strokeWidth={2}
            size={16}
            className="hidden sm:inline"
          />
          <span>Potential match!</span>
        </div>

        <div className="flex w-full justify-center">
          <div className="relative">
            <UserAvatar
              className="size-25 md:size-27 lg:size-29"
              username={username}
              pfp={pfp}
            />
            {isEditable && (
              <ImageUpload className="bg-ss-black-29D hover:bg-ss-black-171 dark:bg-ss-black-171/95 hover:dark:bg-ss-black-171 absolute top-0 right-0 z-1 size-7 rounded-full sm:size-8 md:size-9" />
            )}
          </div>
        </div>
      </div>

      <h2 className="mt-3 h-8 text-xl font-bold lg:mt-4 lg:text-2xl">
        {fullname}
      </h2>

      <h4 className="text-ss-red-444 mb-3 text-sm lg:text-base">{job}</h4>
      {!isEditable && (
        <ConnectionsButtons
          connection={connection}
          cardUserId={user.id}
          cardUsername={username}
        />
      )}
      <div className="dark:border-ss-black-444/80 my-4 flex w-75 flex-col items-center rounded-2xl border-1 border-gray-300 px-5 py-4 sm:w-85 md:w-100">
        <div className="flex w-full flex-col gap-4">
          {/* Username */}
          <div>
            <p className="dark:text-ss-light-FFF mb-1 text-sm font-semibold text-gray-900">
              User name
            </p>
            <div className="dark:bg-ss-black-121 h-10 w-full rounded-xl bg-gray-100 px-4 py-2">
              <span className="dark:text-ss-light-333 text-sm text-gray-500">
                <AtSign className="-mt-1 mr-1 inline size-4 opacity-50" />
                {username}
              </span>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="dark:text-ss-light-FFF mb-1 text-sm font-semibold text-gray-900">
              Date of Birth
            </p>
            <div className="dark:bg-ss-black-121 h-10 rounded-xl bg-gray-100 px-4 py-2">
              <span className="dark:text-ss-light-333 text-sm text-gray-500">
                {dob}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="dark:text-ss-light-FFF mb-1 text-sm font-semibold text-gray-900">
              Bio
            </p>
            <div className="dark:bg-ss-black-121 h-25 rounded-xl bg-gray-100 px-4 py-2">
              <span className="dark:text-ss-light-333 text-sm text-gray-500">
                {bio}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isEditable && (
        <Button
          onClick={handleEditClick}
          className="text-ss-light-222 bg-ss-black-171/90 dark:bg-ss-black-444 dark:hover:bg-ss-red-505 hover:bg-ss-red-404 mt-2 rounded-3xl px-6 py-2 transition duration-150 ease-in-out"
        >
          Edit profile
        </Button>
      )}

      {/* Popup */}
      {showPopup && (
        <EditProfilePopup onSave={handleSave} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default UserDetails;
