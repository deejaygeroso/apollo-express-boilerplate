import { IUserTypes } from '../../interfaces'

interface IUserTypesObject {
  admin: IUserTypes
  user: IUserTypes
}

const userTypes: IUserTypesObject = {
  admin: 'admin',
  user: 'user',
}

export default userTypes
