import { Document } from 'mongoose'

interface IUser extends Document {
  _id: string
  email: string
  hashedPassword: string
  type: string
}

export default IUser
