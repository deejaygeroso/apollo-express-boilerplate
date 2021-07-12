import { IAuthenticatedUser, IUser } from '../interfaces'
import { Logger } from '../global/utilities'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { processENV } from '../global/constants'

class AuthService {
  private readonly saltRounds: number = 10
  private readonly authSecret: jsonwebtoken.Secret = processENV.authSecret
  private readonly tokenExpiration: string = '24h'

  public authenticate = async (user: IUser, passwordToCompare: string): Promise<IAuthenticatedUser> => {
    const isPasswordValid = await this.comparePassword(passwordToCompare, user.hashedPassword)
    if (isPasswordValid) {
      return this.generateValidAuth(user)
    }
    return this.generateEmptyAuth()
  }

  public getAuthDecodedToken = (token: string): string | jsonwebtoken.JwtPayload => {
    try {
      if (token === null) {
        return null
      }

      const decodedAuthToken: string | jsonwebtoken.JwtPayload = jsonwebtoken.verify(
        token,
        this.authSecret,
      )

      if (!decodedAuthToken) {
        return null
      }

      return decodedAuthToken
    } catch (error) {
      const errorMessageHeader = `Error ${AuthService.name} class on method getAuthDecodedToken with token value: ${token}`
      Logger.logError(error, errorMessageHeader)
    }
  }

  public hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password + this.authSecret, this.saltRounds)
  }

  public generateEmptyAuth = (): IAuthenticatedUser => {
    return {
      _id: null,
      email: null,
      expiration: null,
      token: null,
      type: null,
    }
  }

  private comparePassword = async (inputPassword: string, userPassword: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(inputPassword + this.authSecret, userPassword)
    return isValid
  }

  private generateValidAuth = (user: IUser): IAuthenticatedUser => {
    const authObject: IAuthenticatedUser = {
      _id: user._id,
      email: user.email,
      expiration: this.getExpiration(),
      type: user.type
    }
    authObject.token = this.generateAuthToken(authObject)
    return authObject
  }

  private getExpiration = (): Date => {
    const expiration: Date = new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
    return expiration
  }

  private generateAuthToken = (authObject: IAuthenticatedUser): string => {
    return jsonwebtoken.sign(
      authObject,
      this.authSecret,
      { expiresIn: this.tokenExpiration }
    )
  }
}

export default AuthService
