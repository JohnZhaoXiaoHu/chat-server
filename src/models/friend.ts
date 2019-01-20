// origin
import { Schema, Model, model, Document } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export interface FriendDocument extends Document {
  id: string;
  from: string;
  to: string;
  origin?: string;
  create_at: Date;
  update_at: Date;
  is_approved: boolean;
}

const FriendSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },

  from: {
    type: ObjectId,
    required: true
  },

  to: {
    type: ObjectId,
    required: true
  },

  origin: {
    type: String
  },

  is_approved: {
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
  }
});

FriendSchema.pre("save", function(this: FriendDocument, next) {
  this.update_at = new Date();
  next();
});

const FriendModel: Model<FriendDocument> = model("Friend", FriendSchema);

export default FriendModel;
