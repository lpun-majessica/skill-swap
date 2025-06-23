import mongoose from "mongoose";
import { MONGODB_URI } from "@/utils/config";

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
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

export default dbConnect;
