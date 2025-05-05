"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { useDataContext } from "@/contexts/data-context";
import Image from "next/image";
import EditProfilePopup from "./EditProfilePopup";
import { ConnectionsButtons } from "@/components/UserCard/connection-buttons";
import { DynaPuff } from 'next/font/google';
import { ArrowRightLeft } from 'lucide-react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const dynapuff = DynaPuff({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const UserDetails = ({ currentUser, user = null, isEditable = true }) => {
  const { updateCurrentUser } = useAuthContext();
  const [showPopup, setShowPopup] = useState(false);
  const { hasCompatibleSkills } = useDataContext();

  const connection = useDataContext().connections.filter(
    (conn) =>
      currentUser &&
      user &&
      ((conn.sender_id === user.id && conn.receiver_id === currentUser.id) ||
        (conn.sender_id === currentUser.id && conn.receiver_id === user.id))
  );

  const handleEditClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleSave = (updatedUser) => {
    updateCurrentUser(updatedUser);
    setShowPopup(false);
  };

  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (
      !isEditable &&
      user &&
      currentUser &&
      Array.isArray(currentUser.skillsToTeach) &&
      Array.isArray(currentUser.skillsToLearn)
    ) {
      setIsMatch(hasCompatibleSkills(user.id, currentUser));
    }
  }, [user?.id, currentUser, isEditable]);

  const userData = isEditable ? currentUser : user;

  if (!userData) return null;

  return (
    <div className={`mx-5 md:mx-0 w-sm lg:w-lg md:w-md sm:w-md bg-white dark:bg-ss-black-929 rounded-2xl p-6 flex
       flex-col items-center h-fit ${isMatch ? "shadow-[0_0px_7px_rgba(218,_5,_5,_0.3)] dark:shadow-[0_0px_7px_rgba(255,_111,_111,_0.4)] ring-ss-red-666 dark:ring-[#c06464] ring-1" : "shadow-lg inset-shadow-2xs"
      }`}>
      <div className="relative w-full">
        <div
          className={`absolute flex gap-1 text-xs font-bold text-ss-red-666 px-2 py-1 border-2 border-ss-red-666 rounded-full 
      ${!isEditable && isMatch ? "visible" : "invisible"}`}
        > <ArrowRightLeft strokeWidth={2} size={16} className="hidden sm:inline"/> 
          <span>Potential match!</span>
        </div>

        <div className="w-full flex justify-center">
          <Image src={userData.pfp} alt="Avatar" width={160} height={160} sizes="(max-width: 640px) 96px, 160px"
            className="rounded-full w-[96px] sm:w-[160px] h-auto"
          />
        </div>
      </div>
      <h2 className="text-xl font-bold mt-4">{userData.fullname}</h2>
      <h4 className="text-ss-red-444 text-base mt-1 mb-3">{userData.job}</h4>
      {!isEditable && (
        <ConnectionsButtons connection={connection} cardUserId={user.id} />
      )}
      <div className="w-78 px-5 border border-gray-300 dark:border-ss-black-131 rounded-2xl py-4 sm:px-6 flex flex-col items-center my-4 sm:w-90">
        <div className="flex flex-col gap-4 w-full">
          {/* Username */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1 dark:text-ss-light-FFF">User name</p>
            <div className="bg-gray-100 rounded-xl px-4 py-2 dark:bg-ss-black-121 w-full">
              <span className="text-gray-500 text-sm dark:text-ss-light-333">@{userData.username}</span>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1 dark:text-ss-light-FFF">Date of Birth</p>
            <div className="bg-gray-100 rounded-xl px-4 py-2 dark:bg-ss-black-121">
              <span className="text-gray-500 text-sm dark:text-ss-light-333">{formatDate(userData.dob)}</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="font-medium text-gray-700 dark:text-ss-light-FFF">Bio:</p>
            <div className="bg-gray-100 rounded-xl px-4 py-2 h-20 dark:bg-ss-black-121">
              <span className="text-gray-500 text-sm dark:text-ss-light-333">{userData.bio}</span>
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