"use client";
import { Input } from "@/components/ui/input"
import { DatePickerDemo } from "../ui/datepicker";
import { useState } from "react";


const EditProfilePopup = ({ userData, onSave, onClose }) => {
  const [dob, setDob] = useState(userData.dob);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      ...userData,
      fullname: formData.get("fullname"),
      username: formData.get("username"),
      dob: dob,
      job: formData.get("job"),
      bio: formData.get("bio"),
    };
    onSave(updatedUser);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[4px] z-50">
      <div className="bg-white p-6 rounded-2xl w-lg shadow-lg dark:bg-ss-black-929">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="fullname"
            placeholder="Full Name"
            defaultValue={userData.fullname}
            required
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={userData.username}
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
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-ss-red-505 text-white rounded hover:bg-ss-red-404 "
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-ss-red-ABA dark:bg-ss-black-131 dark:hover:bg-ss-black-444"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePopup;
