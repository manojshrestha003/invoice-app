
import mongoose from "mongoose";

export async function connectDB() {

  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI "
    );
  }

  
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  
  return mongoose.connect(MONGO_URI);
}
