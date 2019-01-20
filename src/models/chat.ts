import { Schema, Model, model, Document } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export interface ChatDocument extends Document {
  chat_id: string;
  from: string;
  to: string;
  content: string;
  create_at?: Date;
}

const ChatSchema = new Schema({
  chat_id: {
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
    type: String
  },

  create_at: {
    type: Date,
    default: Date.now
  }
});

// ChatSchema.virtual('chat_id').get(function() {
//   return [this.from, this.to].sort().join('_')
// })

const ChatModel: Model<ChatDocument> = model("Chat", ChatSchema);

export default ChatModel;
