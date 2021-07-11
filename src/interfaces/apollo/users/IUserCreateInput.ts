interface IUserCreateInput {
  email: string
  password: string
  type: 'admin' | 'user'
}

export default IUserCreateInput
