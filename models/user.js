const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },

  nickname: {
    type: String
  },

  password: {
    type: String
  },

  email: {
    type: String,
    unique: true
  },

  location: {
    type: String
  },

  signature: {
    type: String
  },

  avatar: {
    type: String
  },

  // 0:female 1:male
  gender: {
    type: Number
  },

  birthday: {
    type: Date
  },

  is_admin: { type: Boolean, default: false },
  is_block: { type: Boolean, default: false },

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  is_star: { type: Boolean, default: false },
  is_verify: { type: Boolean, default: false },

  // verify pwd modify info
  retrieve_time: { type: Number },
  retrieve_key: { type: String }
})

UserSchema.index({ username: 1 })
UserSchema.index({ email: 1 })

UserSchema.pre('save', next => {
  this.update_at = new Date()
  next()
})

module.exports = mongoose.model('User', UserSchema)
