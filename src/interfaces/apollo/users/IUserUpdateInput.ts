import { IUserTypes } from '../..'

interface IUserUpdateInput {
  _id: string
  email: string
  password: string
  type: IUserTypes
}

export default IUserUpdateInput
