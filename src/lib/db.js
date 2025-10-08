import mongoose from "mongoose";
import { MONGODB_URI } from "@/utils/config";

if (!MONGODB_URI) {
  throw new Error("Missing environment variable: MONGODB_URI");
}

const uri = MONGODB_URI;
const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(uri);

  connection.isConnected = db.connections[0].readyState;
}

async function dbDisconnect() {
  if (connection.isConnected) {
    await mongoose.disconnect();
  }
}

export { dbConnect, dbDisconnect };
