import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: [true, "name cannot be empty"] },
  username: {
    type: String,
    required: [true, "username cannot be empty"],
    unique: true,
  },
  passwordHash: String,
  skillsToTeach: [{ type: mongoose.Types.ObjectId, ref: "Skill" }],
  skillsToLearn: [{ type: mongoose.Types.ObjectId, ref: "Skill" }],
  bio: String,
  dob: Date,
  job: String,
  pfp: {
    publicId: {
      type: String,
      required: [true, "profile picture must have a public id"],
    },
    url: String,
  },
});

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.dob = formatDate(returnedObject.dob);
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
