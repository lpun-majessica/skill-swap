import mongoose from "mongoose";
import User from "./user";

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: User },
  receiver: mongoose.Schema.Types.ObjectId,
  type: String,
  isRead: Boolean,
  createdAt: {
    type: Date,
    expires: 7 * 24 * 60 * 60 * 1000,
    default: Date.now,
  },
});

notificationSchema.index(
  { sender_id: 1, receiver_id: 1, type: 1 },
  { unique: true },
);

notificationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
