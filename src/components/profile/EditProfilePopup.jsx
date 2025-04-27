"use client";
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"; 
import { useState } from "react";
import { CalendarDays } from 'lucide-react'

const EditProfilePopup = ({ userData, onSave, onClose }) => {
    // const [dob, setDob] = useState(userData.dob); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      ...userData,
      fullname: formData.get("fullname"),
      username: formData.get("username"),
      dob: formData.get("dob"),
      job: formData.get("job"),
      bio: formData.get("bio"),
    };
    onSave(updatedUser);
  };

//   const handleDateChange = (selectedDate) => {
//     setDob(selectedDate); // Update the state when the date is changed
//   };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[4px] z-50">
      <div className="bg-white p-6 rounded-2xl w-lg shadow-lg ">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="fullname"
            placeholder="Full Name"
            defaultValue={userData.fullname}
            className="border rounded px-3 py-2"
            required
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={userData.username}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="date"
            name="dob"
            defaultValue={userData.dob}
            className="border rounded px-3 py-2 shadow-xs "
            required
          />
          <Input
            type="text"
            name="job"
            placeholder="Position"
            defaultValue={userData.job}
            className="border rounded px-3 py-2"
            required
          />
          <textarea
            name="bio"
            placeholder="Bio"
            defaultValue={userData.bio}
            className="border rounded px-3 py-2 shadow-xs "
            rows={3}
          />
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-ss-red-505 text-white rounded hover:bg-ss-red-404"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-ss-red-ABA"
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
