/* eslint-disable @typescript-eslint/naming-convention */
import { IUser } from '../../interfaces'
import mongoose from '../config/mongoose'
import { mongooseCollections } from '../../global/constants'

const Schema = mongoose.Schema

const User = new Schema<IUser>({
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  type: { type: String, required: true },
}, {
  collection: mongooseCollections.users,
  timestamps: true
})

export default User
