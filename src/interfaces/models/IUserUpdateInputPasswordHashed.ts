interface IUserUpdateInput {
  _id: string
  email: string
  hashedPassword: string
  type: string
  websiteIds: string[]
}

export default IUserUpdateInput
