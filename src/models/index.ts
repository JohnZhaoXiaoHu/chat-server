import mongoose from "mongoose";
import config from "../config";

mongoose.connect(config.db);

const db = mongoose.connection;

db.on("error", err => {
  console.error(`connect to ${config.db} error: ${err.message}`);
  process.exit(1);
});

db.once("open", function() {
  console.log(`connect to ${config.db} success`);
});

export { default as User } from "./user";
export { default as Chat } from "./chat";
export { default as Friend } from "./friend";
