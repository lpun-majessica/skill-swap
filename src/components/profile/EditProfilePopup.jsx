"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"
import { DatePickerDemo } from "../ui/datepicker";
import { useAuthContext } from "@/contexts/auth-context";
import { useDataContext } from "@/contexts/data-context";


const EditProfilePopup = ({ onClose }) => {
  const { currentUser } = useAuthContext();
  const { users, updateUser } = useDataContext();
  const [userData, setUserData] = useState(null);
  const [dob, setDob] = useState("");

  useEffect(() => {
    if (currentUser) {
      const user = users.find((u) => u.id === currentUser.id);
      if (user) {
        setUserData(user);
        setDob(user.dob);
      }
    }
  }, [currentUser, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedUser = {
      ...userData,
      fullname: formData.get("fullname"),
      job: formData.get("job"),
      dob: dob,
      bio: formData.get("bio"),
    };

    updateUser(updatedUser.id, updatedUser); // Update via context
    onClose(); // Close popup
  };

  if (!userData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[4px] z-50">
      <div className="bg-white p-6 rounded-2xl w-lg shadow-lg dark:bg-ss-black-929">
        <h2 className="text-xl font-bold mb-6 ml-2">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="fullname"
            placeholder="Full Name"
            defaultValue={userData.fullname}
            required
          />

          <DatePickerDemo dob={dob} onChangeDob={setDob}/>

          <Input
            type="text"
            name="job"
            placeholder="Position"
            defaultValue={userData.job}
            required
          />
          <textarea
            name="bio"
            placeholder="Bio"
            defaultValue={userData.bio}
            className="border rounded-md px-3 py-2 shadow-xs dark:bg-input/30 "
            rows={3}
          />
          <div className="flex justify-center mt-4 gap-7 ">
            <button
              type="button"
              onClick={onClose}
              className="w-22 py-2 bg-gray-300 rounded-3xl hover:bg-ss-red-ABA dark:bg-ss-black-131 dark:hover:bg-ss-black-444"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-22  py-2 bg-ss-red-505 text-white rounded-3xl hover:bg-ss-red-404 "
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
