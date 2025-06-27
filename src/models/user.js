import mongoose from "mongoose";
import Skill from "./skill";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullname: String,
  username: {
    type: String,
    unique: true,
  },
  passwordHash: String,
  skillsToTeach: [{ type: mongoose.Types.ObjectId, ref: Skill }],
  skillsToLearn: [{ type: mongoose.Types.ObjectId, ref: Skill }],
  bio: String,
  job: String,
  pfp: {
    publicId: String,
    url: String,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    delete returnedObject.email;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
