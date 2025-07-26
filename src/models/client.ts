import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 Add this
  name: String,
  email: String,
  phone: String,
  company: String,
  address: String,
});

export const ClientModel =
  mongoose.models.Client || mongoose.model("Client", clientSchema);
