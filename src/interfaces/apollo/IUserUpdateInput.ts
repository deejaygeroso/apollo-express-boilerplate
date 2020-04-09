interface IUserUpdateInput {
  _id: string
  email: string
  password: string
  type: string
  websiteIds: string[]
}

export default IUserUpdateInput
