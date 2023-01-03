import * as mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  username: String,
  privacy: String,
});

export const profileModel = mongoose.model("settings", profileSchema);
