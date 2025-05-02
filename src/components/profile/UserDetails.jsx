"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import Image from "next/image";
import EditProfilePopup from "./EditProfilePopup";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const UserDetails = ({ isEditable = true }) => {
  const { currentUser, updateCurrentUser } = useAuthContext();
  const [showPopup, setShowPopup] = useState(false);

  const handleEditClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleSave = (updatedUser) => {
    updateCurrentUser(updatedUser);
    setShowPopup(false);
  };

  if (!currentUser) return null;

  return (
    <div className=" mx-5 md:mx-0 w-sm lg:w-lg md:w-md sm:w-md bg-white dark:bg-ss-black-929 rounded-2xl shadow-lg inset-shadow-2xs p-6 flex flex-col items-center h-fit">
      <Image src={currentUser.pfp} alt="Avatar" width={160} height={160} className="rounded-full" />
      <h2 className="text-xl font-bold mt-4">{currentUser.fullname}</h2>
      <h4 className="text-ss-red-444 text-base mt-1">{currentUser.job}</h4>
      {!isEditable && (
        <button className="font-semibold text-ss-light-FFF mt-4 px-6 py-2 bg-ss-red-404 rounded-full hover:bg-ss-light-777 hover:text-ss-black-717">
          Connect
        </button>
        // <ConnectionsButtons connection={connection} username={username} />
      )}
      <div className="w-78 px-5 border border-gray-300 dark:border-ss-black-131 rounded-2xl py-4 sm:px-6 flex flex-col items-center my-4 sm:w-90">
        <div className="flex flex-col gap-4 w-full">
          {/* Username */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1 dark:text-ss-light-FFF">User name</p>
            <div className="bg-gray-100 rounded-xl px-4 py-2 dark:bg-ss-black-121 w-full">
              <span className="text-gray-500 text-sm dark:text-ss-light-333">@{currentUser.username}</span>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1 dark:text-ss-light-FFF">Date of Birth</p>
            <div className="bg-gray-100 rounded-xl px-4 py-2 dark:bg-ss-black-121">
              <span className="text-gray-500 text-sm dark:text-ss-light-333">{formatDate(currentUser.dob)}</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="font-medium text-gray-700 dark:text-ss-light-FFF">Bio:</p>
            <div className="bg-gray-100 rounded-xl px-4 py-2 h-20 dark:bg-ss-black-121">
              <span className="text-gray-500 text-sm dark:text-ss-light-333">{currentUser.bio}</span>
            </div>
          </div>
        </div>
      </div>

      {isEditable && (
        <button
          onClick={handleEditClick}
          className="mt-2 px-6 py-2 bg-gray-300 dark:bg-ss-black-444 dark:hover:bg-ss-red-505 rounded-3xl hover:bg-ss-red-404 hover:text-ss-light-FFF"
        >
          Edit profile
        </button>
      )}

      {/* Popup */}
      {showPopup && (
        <EditProfilePopup
          onSave={handleSave}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default UserDetails;