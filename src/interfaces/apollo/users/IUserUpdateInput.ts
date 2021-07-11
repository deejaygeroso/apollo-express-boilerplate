interface IUserUpdateInput {
  _id: string
  email: string
  password: string
  type: 'admin' | 'user'
}

export default IUserUpdateInput
