import { IAuthenticatedUser, IUser, IUserCreateInput, IUserUpdateInput } from '../../interfaces'
import { AuthService } from '../../services'
import User from '../../mongoose/models/User'

const resolvers = {
  Mutation: {
    userCreate: async (root: object, { input }: { input: IUserCreateInput }): Promise<IUser> => {
      const {
        email,
        password,
        type,
        websiteIds
      } = input
      const userModel = new User()
      const auth = new AuthService()
      const hashedPassword = await auth.hashPassword(password)
      return userModel.createIfNotExist({ email, hashedPassword, type, websiteIds })
    },
    userLogin: async (parent: object, { input }: { input: IUserCreateInput }): Promise<IAuthenticatedUser> => {
      const {
        email,
        password,
      } = input
      const userModel = new User()
      const auth = new AuthService()

      const user = await userModel.findByEmail(email)

      if (user === null) {
        return auth.generateEmptyAuth()
      }
      return auth.authenticate(user, password)
    },
    userUpdate: async (root: object, { input }: { input: IUserUpdateInput }): Promise<IUser> => {
      const {
        _id,
        email,
        password,
        type,
        websiteIds
      } = input
      const userModel = new User()
      const auth = new AuthService()
      const hashedPassword = password ? await auth.hashPassword(password) : null
      return userModel.updateUserById({ _id, email, hashedPassword, type, websiteIds })
    },
  },
  Query: {
    user: async (parent: object, { _id }: { _id: string }): Promise<IUser> => {
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
