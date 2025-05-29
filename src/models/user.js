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
  pfp: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
