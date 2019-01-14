const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ChatSchema = new Schema({
  chat_id: { type: String },

  from: { type: ObjectId },

  to: { type: ObjectId },

  content: { type: String },

  create_at: { type: Date, default: Date.now }
})

// ChatSchema.virtual('chat_id').get(function() {
//   return [this.from, this.to].sort().join('_')
// })

module.exports = mongoose.model('Chat', ChatSchema)
