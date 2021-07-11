import {
  IUser,
  IUserCreateInputPasswordHashed,
  IUserTypeFilterQuery,
  IUserUpdateInputPasswordHashed
} from '../../interfaces'
import { ActiveRecord } from '../../global/utilities'
import { User as UserSchema } from '../schemas'
import mongoose from '../config/mongoose'
import { userTypes } from '../../global/constants'

// eslint-disable-next-line @typescript-eslint/naming-convention
const User = mongoose.model<IUser>('User', UserSchema)

class UserModel extends ActiveRecord<IUser>  {
  constructor() {
    super(User)
  }

  private userTypeFilter: IUserTypeFilterQuery = {
    $or: [
      { type: userTypes.admin },
      { type: userTypes.user },
    ]
  }

  public createIfNotExist = async (userInput: IUserCreateInputPasswordHashed): Promise<IUser> => {
    const user: IUser = await this.findByEmail(userInput.email)
    if (user === null) {
      return this.createNewUser(userInput)
    }
    return user
  }

  public findAll = async (): Promise<IUser[]> => {
    return this.find(this.userTypeFilter, {
      sort: { createdAt: -1 }
    })
  }

  public findUserById = async (userId: string): Promise<IUser> => {
    const userOption = Object.assign({ _id: userId }, this.userTypeFilter)
    return this.findOne(userOption)
  }

  public findByEmail = async (email: string): Promise<IUser> => {
    return this.findOne({ email })
  }

  public updateUserById = async (userInput: IUserUpdateInputPasswordHashed): Promise<IUser> => {
    const { _id, email, hashedPassword, type } = userInput
    const userOption = Object.assign({ _id }, this.userTypeFilter)
    const dataToUpdate = !!hashedPassword ? {
      _id,
      email,
      hashedPassword,
      type,
    } : {
      _id,
      email,
      type,
    }
    const document: any = await User.findOneAndUpdate(userOption, {
      $set: dataToUpdate
    })
    return document
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
