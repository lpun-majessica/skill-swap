import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Types.ObjectId, ref: "User" },
  receiver_id: { type: mongoose.Types.ObjectId, ref: "User" },
  isAccepted: Boolean,
});

connectionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Connection =
  mongoose.models.Connection || mongoose.model("Connection", connectionSchema);

export default Connection;
