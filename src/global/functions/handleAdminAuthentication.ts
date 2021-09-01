import { statusCodes, userTypes } from '../constants'
import { AuthenticationError } from 'apollo-server-express'
import { IUser } from '../../interfaces'
import getStatusMessage from './getStatusMessage'

const handleAdminAuthentication = (root: undefined, args: undefined, context: { user: IUser }): void => {
  if (context.user.type !== userTypes.admin) {
    throw new AuthenticationError(getStatusMessage(400))
  }
}

export default handleAdminAuthentication
