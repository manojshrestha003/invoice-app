// models/client.ts

import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  address: String,
});

export const ClientModel =
  mongoose.models.Client || mongoose.model("Client", clientSchema);
