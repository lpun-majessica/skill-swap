import mongoose from "mongoose";
import { MONGODB_URI } from "@/utils/config";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(MONGODB_URI);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
