interface IUserCreateInputPasswordHashed {
  email: string
  hashedPassword: string
  type: string
  websiteIds: string[]
}

export default IUserCreateInputPasswordHashed
