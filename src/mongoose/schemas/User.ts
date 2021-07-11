/* eslint-disable @typescript-eslint/naming-convention */
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
