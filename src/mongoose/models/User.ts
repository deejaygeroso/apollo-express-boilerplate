import {
  IMongooseError,
  IReject,
  IResolve,
  IUser,
  IUserCreateInputPasswordHashed,
  IUserTypeOption,
  IUserUpdateInputPasswordHashed
} from '../../interfaces'
import { ActiveRecord } from '../../global/utilities'
import { User as UserSchema } from '../schemas'
import mongoose from '../config/mongoose'
import { userTypes } from '../../global/constants'

const User = mongoose.model('User', UserSchema)

class UserModel extends ActiveRecord {
  constructor() {
    super(User)
  }

  private userTypeFilter: IUserTypeOption = {
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

  public findAllUserByWebsiteIds = (websiteIds: string[]): Promise<IUser[]> => {
    const filter = {
      websiteIds: {
        $in: websiteIds
      }
    }
    return this.find(filter, {
      select: [
        '_id',
        'email',
        'websiteIds'
      ]
    })
  }

  public findAllAdminsAndBusinessAccounts = async (): Promise<IUser[]> => {
    const filterOption = {
      $or: [
        { type: userTypes.admin },
      ],
    }
    return this.find(filterOption, {
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
    const { _id, email, hashedPassword, type, websiteIds } = userInput
    const userOption = Object.assign({ _id }, this.userTypeFilter)
    const dataToUpdate = !!hashedPassword ? {
      _id,
      email,
      hashedPassword,
      type,
      websiteIds: [
        ...websiteIds
      ]
    } : {
        _id,
        email,
        type,
        websiteIds: [
          ...websiteIds
        ]
      }
    const document: any = await User.findOneAndUpdate(userOption, {
      $set: dataToUpdate
    })
    return document
  }

  public addToUsersWebsites = (userId: string, websiteId: string): Promise<IUser> => {
    return new Promise((resolve: IResolve<IUser>, reject: IReject): void => {
      User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { websiteIds: websiteId }
        },
        {
          new: true
        },
        (error: IMongooseError, result: any): void => {
          const errorMessageHeader = `addToUsersWebsites with id: ${userId}`
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(result)
        }
      )
    })
  }

  public setAuditedByCurrentUser = async (
    userId: string,
    websiteId: string
  ): Promise<void> => {
    const isWebsiteAlreadyAudited = await this.isWebsiteAlreadyAuditedByOtherUser(websiteId)
    if (isWebsiteAlreadyAudited) {
      this.setUserAsWebsiteAuditor(userId, websiteId)
    }
  }

  private isWebsiteAlreadyAuditedByOtherUser = async (websiteId: string): Promise<boolean> => {
    const user = await this.getTheUserWhoAuditedTheWebsite(websiteId)
    return user === null
  }

  private getTheUserWhoAuditedTheWebsite = async (websiteId: string): Promise<IUser> => {
    return this.findOne({ auditedWebsiteIds: websiteId })
  }

  private setUserAsWebsiteAuditor = async (userId: string, websiteId: string): Promise<IUser> => {
    return new Promise((resolve: IResolve<IUser>, reject: IReject): void => {
      User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { auditedWebsiteIds: websiteId }
        },
        {
          new: true
        },
        (error: IMongooseError, result: any): void => {
          const errorMessageHeader = `setUserAsWebsiteAuditor with id: ${userId}`
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(result)
        }
      )
    })
  }

  private createNewUser = async (userInput: IUserCreateInputPasswordHashed): Promise<IUser> => {
    const user = {
      email: userInput.email,
      hashedPassword: userInput.hashedPassword,
      type: userInput.type,
      websiteIds: userInput.websiteIds
    }
    return this.create(user)
  }
}

export default UserModel
