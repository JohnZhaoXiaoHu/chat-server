import { Schema, Model, model, Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  nickname?: string;
  password: string;
  location?: string;
  signature?: string;
  avatar?: string;
  gender?: number;
  birthday?: Date;
  is_admin: boolean;
  is_block: boolean;
  create_at: Date;
  update_at: Date;
  is_star: boolean;
  is_verify: boolean;
  retrieve_time?: number;
  retrieve_key?: string;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  nickname: { type: String },

  password: {
    type: String,
    required: true
  },

  // phone: {
  //   type: Number,
  //   unique: true
  // },

  // email: {
  //   type: String,
  //   unique: true
  // },

  location: { type: String },

  signature: { type: String },

  avatar: { type: String },

  // 0:female 1:male
  gender: { type: Number },

  birthday: { type: Date },

  is_admin: {
    type: Boolean,
    default: false
  },
  is_block: {
    type: Boolean,
    default: false
  },

  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  },

  is_star: {
    type: Boolean,
    default: false
  },
  is_verify: {
    type: Boolean,
    default: false
  },

  // verify pwd modify info
  retrieve_time: { type: Number },
  retrieve_key: { type: String }
});

UserSchema.index({ username: 1 });
// UserSchema.index({ email: 1 })

UserSchema.pre("save", function(this: UserDocument, next) {
  this.update_at = new Date();
  next();
});

const UserModel: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export default UserModel;
