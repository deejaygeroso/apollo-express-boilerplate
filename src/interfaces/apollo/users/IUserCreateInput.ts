import { IUserTypes } from '../..'

interface IUserCreateInput {
  email: string
  password: string
  type: IUserTypes
}

export default IUserCreateInput
