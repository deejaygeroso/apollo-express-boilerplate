/* eslint-disable @typescript-eslint/naming-convention */
import { IAuthenticatedUser, IUser, IUserCreateInput, IUserUpdateInput } from '../../interfaces'
import { AuthService } from '../../services'
import User from '../../mongoose/models/User'

const resolvers = {
  Mutation: {
    userCreate: async (parent: undefined, { input }: { input: IUserCreateInput }): Promise<IUser> => {
      const {
        email,
        password,
        type,
      } = input
      const userModel = new User()
      const auth = new AuthService()
      const hashedPassword = await auth.hashPassword(password)
      return userModel.createIfNotExist({ email, hashedPassword, type })
    },
    userLogin: async (parent: undefined, { input }: { input: IUserCreateInput }): Promise<IAuthenticatedUser> => {
      const {
        email,
        password,
      } = input
      const userModel = new User()
      const auth = new AuthService()

      const user = await userModel.findByEmail(email)

      if (!user) {
        return auth.generateEmptyAuth()
      }
      return auth.authenticate(user, password)
    },
    userUpdate: async (parent: undefined, { input }: { input: IUserUpdateInput }): Promise<IUser> => {
      const {
        _id,
        email,
        password,
        type,
      } = input
      const userModel = new User()
      const auth = new AuthService()
      const hashedPassword = password ? await auth.hashPassword(password) : null
      return userModel.updateUserById({ _id, email, hashedPassword, type })
    },
  },
  Query: {
    user: async (parent: undefined, { _id }: { _id: string }): Promise<IUser> => {
      const userModel = new User()
      return userModel.findUserById(_id)
    },
    users: async (): Promise<IUser[]> => {
      const userModel = new User()
      return userModel.findAll()
    },
  },
}

export default resolvers
