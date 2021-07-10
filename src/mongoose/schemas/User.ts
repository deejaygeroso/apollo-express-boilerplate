/* eslint-disable id-blacklist */
import mongoose from '../config/mongoose'

const Schema = mongoose.Schema
const User = new Schema({
  email: String,
  hashedPassword: String,
  type: String,
}, {
  collection: 'users',
  timestamps: true
})

export default User
