/* eslint-disable id-blacklist */
import mongoose from '../config/mongoose'

const Schema = mongoose.Schema
const User = new Schema({
  auditedWebsiteIds: [String],
  email: String,
  hashedPassword: String,
  type: String,
  websiteIds: [String],
}, {
  collection: 'users',
  timestamps: true
})

export default User
