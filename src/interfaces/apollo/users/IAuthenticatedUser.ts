interface IAuthenticatedUser {
  _id: string
  email: string
  expiration: Date
  token?: string
  type: string
}

export default IAuthenticatedUser
