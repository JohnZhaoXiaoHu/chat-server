import { Schema, Model, model, Document } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export interface ChatDocument extends Document {
  id: string;
  from: string;
  to: string;
  content: string;
  create_at: Date;
  has_read: boolean;
}

const ChatSchema = new Schema({
  id: {
    type: String,
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

  content: {
    type: String,
    required: true
  },

  has_read: {
    type: Boolean,
    default: false
  },

  create_at: {
    type: Date,
    default: Date.now
  }
});

const ChatModel: Model<ChatDocument> = model("Chat", ChatSchema);

export default ChatModel;
