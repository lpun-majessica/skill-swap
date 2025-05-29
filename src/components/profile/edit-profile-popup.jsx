"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "../ui/datepicker";
import { useAuthContext } from "@/contexts/auth-context";
import { useDataContext } from "@/contexts/data-context";

const EditProfilePopup = ({ onClose }) => {
  const { currentUser, updateCurrentUser } = useAuthContext();
  const [dob, setDob] = useState("");
  const { updateUser } = useDataContext();

  useEffect(() => {
    if (currentUser) {
      setDob(currentUser.dob);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedUser = {
      ...currentUser,
      fullname: formData.get("fullname"),
      job: formData.get("job"),
      dob: dob,
      bio: formData.get("bio"),
    };

    updateCurrentUser(updatedUser);
    updateUser(currentUser.id, updatedUser);
    onClose(); // Close popup
  };

  if (!currentUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[4px]">
      <div className="dark:bg-ss-black-929 w-90 rounded-2xl bg-white p-6 shadow-lg sm:w-lg">
        <h2 className="mb-6 ml-2 text-xl font-bold">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="fullname"
            placeholder="Full Name"
            defaultValue={currentUser.fullname}
            required
          />

          <DatePickerDemo dob={dob} onChangeDob={setDob} />

          <Input
            type="text"
            name="job"
            placeholder="Position"
            defaultValue={currentUser.job}
            required
          />
          <textarea
            name="bio"
            placeholder="Bio"
            defaultValue={currentUser.bio}
            className="dark:bg-input/30 rounded-md border px-3 py-2 shadow-xs"
            rows={3}
          />
          <div className="mt-4 flex justify-center gap-7">
            <button
              type="button"
              onClick={onClose}
              className="hover:bg-ss-red-ABA dark:bg-ss-black-131 dark:hover:bg-ss-black-444 w-22 rounded-3xl bg-gray-300 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-ss-red-505 hover:bg-ss-red-404 w-22 rounded-3xl py-2 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePopup;
