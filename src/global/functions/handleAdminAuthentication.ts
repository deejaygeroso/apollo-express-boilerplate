import { statusCodes, statusCodesMessage, userTypes } from '../constants'
import { AuthenticationError } from 'apollo-server-express'
import { IUser } from '../../interfaces'

const handleAdminAuthentication = (root: undefined, args: undefined, context: { user: IUser }): void => {
  if (context.user.type !== userTypes.admin) {
    throw new AuthenticationError(statusCodesMessage[statusCodes.unAuthorized])
  }
}

export default handleAdminAuthentication
