"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { useDataContext } from "@/contexts/data-context";
import Image from "next/image";
import EditProfilePopup from "./edit-profile-popup";
import { ConnectionsButtons } from "@/components/user-card/connection-buttons";
import { DynaPuff } from "next/font/google";
import { ArrowRightLeft } from "lucide-react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const dynapuff = DynaPuff({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
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
        (conn.sender_id === currentUser.id && conn.receiver_id === user.id)),
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
          <Image
            src={userData.pfp}
            alt="Avatar"
            width={160}
            height={160}
            sizes="(max-width: 640px) 96px, 160px"
            className="h-auto w-[96px] rounded-full sm:w-[160px]"
          />
        </div>
      </div>
      <h2 className="mt-4 text-xl font-bold">{userData.fullname}</h2>
      <h4 className="text-ss-red-444 mt-1 mb-3 text-base">{userData.job}</h4>
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
                @{userData.username}
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
                {formatDate(userData.dob)}
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
                {userData.bio}
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
