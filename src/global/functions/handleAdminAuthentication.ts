import { AuthenticationError } from 'apollo-server-express'
import { IUser } from '../../interfaces'
import errorCodes from './errorCodes'
import { userTypes } from '../constants'

const handleAdminAuthentication = (root: undefined, args: undefined, context: { user: IUser }): void => {
  if (context.user.type !== userTypes.admin) {
    const notAuthenticated = 6002
    throw new AuthenticationError(errorCodes[notAuthenticated])
  }
}

export default handleAdminAuthentication
