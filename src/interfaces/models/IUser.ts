interface IUser {
  _id: string
  auditedWebsiteIds: string[]
  email: string
  hashedPassword: string
  type: string
  websiteIds: string[]
}

export default IUser
