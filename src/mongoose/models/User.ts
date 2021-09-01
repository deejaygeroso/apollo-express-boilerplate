import {
  IUser,
  IUserCreateInputPasswordHashed,
  IUserTypeFilterQuery,
  IUserUpdateInputPasswordHashed,
} from '../../interfaces'
import { ActiveRecord } from '../../global/lib'
import { User as UserSchema } from '../schemas'
import mongoose from 'mongoose'
import { userTypes } from '../../global/constants'

// eslint-disable-next-line @typescript-eslint/naming-convention
const User = mongoose.model<IUser>('User', UserSchema)

class UserModel extends ActiveRecord<IUser> {
  constructor() {
    super(User)
  }

  private userTypeFilter: IUserTypeFilterQuery = {
    $or: [{ type: userTypes.admin }, { type: userTypes.user }],
  }

  public createIfNotExist = async (userInput: IUserCreateInputPasswordHashed): Promise<IUser> => {
    const user: IUser = await this.findByEmail(userInput.email)
    if (user === null) {
      return this.createNewUser(userInput)
    }
    return user
  }

  // This will only find user with 'admin' or 'user' type but excludes all other user with different type.
  // This was purposely created for me to create a superadmin type which cannot be queried back to the client.
  // This is for personal preference only.
  public findAll = async (): Promise<IUser[]> => {
    return this.find(this.userTypeFilter, {
      sort: { createdAt: -1 },
    })
  }

  public findUserById = async (userId: string): Promise<IUser> => {
    const userOption = Object.assign({ _id: userId }, this.userTypeFilter)
    return this.findOne(userOption)
  }

  public findByEmail = async (email: string): Promise<IUser> => {
    return this.findOne({ email })
  }

  // Update user information, but hashedPassword is optional.
  public updateUserById = async (userInput: IUserUpdateInputPasswordHashed): Promise<IUser> => {
    const { _id, email, hashedPassword, type } = userInput
    const userOption = Object.assign({ _id }, this.userTypeFilter)

    // We used any as the type for dataToUpdate instead of IUser since we are making hashedPassword to be updated optionally.
    const dataToUpdate: any = !!hashedPassword
      ? {
          _id,
          email,
          hashedPassword,
          type,
        }
      : {
          _id,
          email,
          type,
        }
    return this.update(userOption, dataToUpdate)
  }

  private createNewUser = async (userInput: IUserCreateInputPasswordHashed): Promise<IUser> => {
    const user = {
      email: userInput.email,
      hashedPassword: userInput.hashedPassword,
      type: userInput.type,
    }
    return this.create(user)
  }
}

export default UserModel
