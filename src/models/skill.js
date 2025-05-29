import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: String,
});

skillSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

export default Skill;
